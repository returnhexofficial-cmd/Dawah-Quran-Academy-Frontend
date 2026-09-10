export type TSiteConfig = {
  email: string;
  phone: string;
  facebookLink: string;
  whatsappLink: string;
  admissionLink: string;
};

export const SITE_CONFIG_STORAGE_KEY = "siteConfig";

/**
 * Rendered on the server and on the very first client paint, before the cached
 * value is read. Kept in sync with the backend seed so visitors never see a
 * placeholder.
 */
export const SITE_CONFIG_FALLBACK: TSiteConfig = {
  email: "muinulislammuin16802@gmail.com",
  phone: "+8801852-955611",
  facebookLink: "https://www.facebook.com/profile.php?id=61573213246773",
  whatsappLink: "https://wa.me/8801852955611",
  admissionLink: "https://docs.google.com/forms/not-found",
};

export const SITE_CONFIG_FIELDS: (keyof TSiteConfig)[] = [
  "email",
  "phone",
  "facebookLink",
  "whatsappLink",
  "admissionLink",
];

/** Keeps only the known string fields, so a stale cache cannot inject junk. */
export const normalizeSiteConfig = (value: unknown): TSiteConfig => {
  const source = (value ?? {}) as Partial<Record<keyof TSiteConfig, unknown>>;
  const result = { ...SITE_CONFIG_FALLBACK };

  for (const field of SITE_CONFIG_FIELDS) {
    const raw = source[field];
    if (typeof raw === "string" && raw.trim()) {
      result[field] = raw.trim();
    }
  }
  return result;
};

/** "+8801852-955611" -> "tel:+8801852955611" */
export const toTelHref = (phone: string) =>
  `tel:${phone.replace(/[^+\d]/g, "")}`;

export const toMailtoHref = (email: string) => `mailto:${email.trim()}`;
