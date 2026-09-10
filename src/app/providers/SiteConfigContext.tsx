"use client";

import useAxios from "@/hooks/useAxios";
import {
  normalizeSiteConfig,
  SITE_CONFIG_FALLBACK,
  SITE_CONFIG_STORAGE_KEY,
  TSiteConfig,
} from "@/types/siteConfig.type";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type SiteConfigContextValue = {
  siteConfig: TSiteConfig;
  siteConfigLoading: boolean;
  /** Re-reads from the API and refreshes the cache (used after an admin save). */
  refreshSiteConfig: () => Promise<TSiteConfig | undefined>;
  /** Writes a freshly saved config straight into state + cache. */
  setSiteConfigCache: (config: TSiteConfig) => void;
};

const SiteConfigContext = createContext<SiteConfigContextValue>({
  siteConfig: SITE_CONFIG_FALLBACK,
  siteConfigLoading: false,
  refreshSiteConfig: async () => undefined,
  setSiteConfigCache: () => {},
});

export const readCachedSiteConfig = (): TSiteConfig | null => {
  if (typeof window === "undefined") return null;
  try {
    const cached = window.localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
    return cached ? normalizeSiteConfig(JSON.parse(cached)) : null;
  } catch {
    // Corrupt JSON or storage disabled (private mode): fall back to the API.
    return null;
  }
};

const writeCachedSiteConfig = (config: TSiteConfig) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      SITE_CONFIG_STORAGE_KEY,
      JSON.stringify(config),
    );
  } catch {
    // Storage full or blocked; the in-memory value still works for this visit.
  }
};

export const SiteConfigProvider = ({ children }: { children: ReactNode }) => {
  // Starts on the fallback so the server render and the first client render
  // match; the cached value is applied immediately after hydration below.
  const [siteConfig, setSiteConfig] =
    useState<TSiteConfig>(SITE_CONFIG_FALLBACK);
  const [siteConfigLoading, setSiteConfigLoading] = useState(true);
  const axiosSecure = useAxios();

  const setSiteConfigCache = useCallback((config: TSiteConfig) => {
    const normalized = normalizeSiteConfig(config);
    setSiteConfig(normalized);
    writeCachedSiteConfig(normalized);
  }, []);

  const refreshSiteConfig = useCallback(async () => {
    try {
      const { data } = await axiosSecure.get("/site-config");
      const normalized = normalizeSiteConfig(data?.data);
      setSiteConfig(normalized);
      writeCachedSiteConfig(normalized);
      return normalized;
    } catch (error) {
      console.error("Site config fetch failed:", error);
      return undefined;
    } finally {
      setSiteConfigLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    // 1. Paint the cached values straight away so there is no flash of stale
    //    defaults on repeat visits.
    const cached = readCachedSiteConfig();
    if (cached) setSiteConfig(cached);

    // 2. Then refresh from the API on entry and re-prime the cache.
    refreshSiteConfig();
  }, [refreshSiteConfig]);

  return (
    <SiteConfigContext.Provider
      value={{
        siteConfig,
        siteConfigLoading,
        refreshSiteConfig,
        setSiteConfigCache,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);
