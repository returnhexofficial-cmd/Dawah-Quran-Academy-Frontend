import { TClass, TClassPlatform } from "@/types/class.type";

/** How long a class counts as "live" when the admin did not set a duration. */
const DEFAULT_DURATION_MINUTES = 60;

export const PLATFORM_LABELS: Record<TClassPlatform, string> = {
  "google-meet": "Google Meet",
  zoom: "Zoom",
  other: "Online",
};

export const PLATFORM_BADGE_STYLES: Record<TClassPlatform, string> = {
  "google-meet": "bg-[#e8f0fe] text-[#1a73e8]",
  zoom: "bg-[#e5f0ff] text-[#2d8cff]",
  other: "bg-primary/10 text-primary",
};

export type TClassStatus = "live" | "upcoming" | "past";

export const getClassStatus = (item: TClass, now: number = Date.now()): TClassStatus => {
  const start = new Date(item.scheduledAt).getTime();
  if (isNaN(start)) return "upcoming";

  const end =
    start + (item.durationMinutes || DEFAULT_DURATION_MINUTES) * 60 * 1000;

  if (now < start) return "upcoming";
  if (now <= end) return "live";
  return "past";
};

export const formatClassTime = (scheduledAt: string) => {
  const date = new Date(scheduledAt);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Upcoming and live classes first (soonest at the top), finished ones after
 * (most recent at the top) - the order a student actually needs.
 */
export const sortClassesForStudent = (classes: TClass[], now: number = Date.now()) => {
  const upcoming = classes
    .filter((item) => getClassStatus(item, now) !== "past")
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );

  const past = classes
    .filter((item) => getClassStatus(item, now) === "past")
    .sort(
      (a, b) =>
        new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    );

  return { upcoming, past };
};
