"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "@/hooks/useAxios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      }
    }
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const handleLogout = async (router: any) => {
  if (typeof window === "undefined") return;

  // Clearing localStorage alone leaves the httpOnly refresh cookie alive, so
  // the session could be silently resumed. Ask the server to drop it too.
  try {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    localStorage.removeItem("accessToken");
    toast.success("Logout Successful");
    router.push("/login");
  }
};
