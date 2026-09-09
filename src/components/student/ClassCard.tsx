"use client";

import { TClass } from "@/types/class.type";
import {
  PLATFORM_BADGE_STYLES,
  PLATFORM_LABELS,
  formatClassTime,
  getClassStatus,
} from "@/utils/classUtils";
import { FiExternalLink } from "react-icons/fi";
import { LuClock } from "react-icons/lu";
import { SiGooglemeet, SiZoom } from "react-icons/si";
import { TbVideo } from "react-icons/tb";

const PlatformIcon = ({ platform }: { platform: TClass["platform"] }) => {
  if (platform === "google-meet") return <SiGooglemeet />;
  if (platform === "zoom") return <SiZoom />;
  return <TbVideo />;
};

const ClassCard = ({ item }: { item: TClass }) => {
  const status = getClassStatus(item);
  const isPast = status === "past";

  return (
    <article
      className={`relative rounded-lg border p-5 transition hover:shadow-xl ${
        isPast ? "border-gray-200 bg-gray-50" : "border-primary bg-white"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            PLATFORM_BADGE_STYLES[item.platform]
          }`}
        >
          <PlatformIcon platform={item.platform} />
          {PLATFORM_LABELS[item.platform]}
        </span>

        {status === "live" && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Live now
          </span>
        )}

        {isPast && (
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
            Finished
          </span>
        )}
      </div>

      <h3
        className={`mt-3 text-lg sm:text-2xl ${
          isPast ? "text-gray-600" : "text-primary"
        }`}
      >
        {item.title}
      </h3>

      <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
        <LuClock className="shrink-0" />
        {formatClassTime(item.scheduledAt)}
        {item.durationMinutes ? ` · ${item.durationMinutes} min` : ""}
      </p>

      {item.description && (
        <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          {item.description}
        </p>
      )}

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-5 inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition duration-300 ${
          isPast ? "bg-gray-400 hover:bg-gray-500" : "bg-primary hover:bg-light"
        }`}
      >
        <FiExternalLink />
        {isPast ? "Open link" : "Join class"}
      </a>
    </article>
  );
};

export default ClassCard;
