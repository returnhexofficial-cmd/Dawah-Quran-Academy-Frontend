import { TUser } from "./user.type";

export type TClassPlatform = "google-meet" | "zoom" | "other";

export type TClassAudience = "all" | "selected";

export type TClass = {
  _id: string;
  title: string;
  description?: string;
  platform: TClassPlatform;
  link: string;
  scheduledAt: string;
  durationMinutes?: number;
  audience: TClassAudience;
  /** Populated on the admin endpoints, ids only elsewhere. */
  students: (TUser | string)[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
