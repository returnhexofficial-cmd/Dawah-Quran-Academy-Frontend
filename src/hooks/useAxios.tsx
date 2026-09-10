import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosSecure = axios.create({
  baseURL: API_BASE_URL,
  // Required for the httpOnly refreshToken cookie to travel cross-origin.
  withCredentials: true,
});

const useAxios = () => {
  return axiosSecure;
};

axiosSecure.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = token;
    }
  }
  return config;
});

/**
 * Exchange the refresh cookie for a new access token.
 *
 * Uses a bare axios instance rather than axiosSecure so the call can never be
 * caught by the response interceptor below and start a refresh loop.
 */
const requestNewAccessToken = async (): Promise<string> => {
  const { data } = await axios.post(
    `${API_BASE_URL}/auth/refresh-token`,
    {},
    { withCredentials: true }
  );

  const accessToken: string | undefined = data?.data?.accessToken;
  if (!accessToken) {
    throw new Error("Refresh response did not contain an access token");
  }

  localStorage.setItem("accessToken", accessToken);
  return accessToken;
};

// Single-flight guard: concurrent 401s share one refresh request instead of
// each firing their own and racing to overwrite localStorage.
let refreshRequest: Promise<string> | null = null;

const refreshAccessTokenOnce = () => {
  if (!refreshRequest) {
    refreshRequest = requestNewAccessToken().finally(() => {
      refreshRequest = null;
    });
  }
  return refreshRequest;
};

const redirectToLogin = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  if (!window.location.pathname.startsWith("/login")) {
    window.location.assign("/login");
  }
};

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

/**
 * Endpoints that carry their own single-use token (or none at all). A 401 from
 * these means that token expired, not the session's access token, so they must
 * handle the error themselves instead of triggering a refresh + redirect.
 */
const NO_REFRESH_PATHS = [
  "/auth/refresh-token",
  "/auth/logout",
  "/auth/login",
  "/auth/reset-password",
  "/auth/forget-password",
];

axiosSecure.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ errorCode?: string }>) => {
    const originalRequest = error.config as RetriableRequest | undefined;
    const isExpiredAccessToken =
      error.response?.status === 401 &&
      error.response?.data?.errorCode === "TOKEN_EXPIRED";
    const isExemptPath = NO_REFRESH_PATHS.some((path) =>
      originalRequest?.url?.includes(path)
    );

    if (
      !originalRequest ||
      originalRequest._retry ||
      !isExpiredAccessToken ||
      isExemptPath
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessTokenOnce();
      originalRequest.headers.Authorization = accessToken;
      return axiosSecure(originalRequest);
    } catch (refreshError) {
      // The refresh cookie is gone or no longer valid: the session is over.
      redirectToLogin();
      return Promise.reject(refreshError);
    }
  }
);

export default useAxios;
