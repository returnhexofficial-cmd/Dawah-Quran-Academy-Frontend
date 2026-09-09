"use client";

import useMyClasses from "@/hooks/useMyClasses";
import { TClass } from "@/types/class.type";
import {
  PLATFORM_LABELS,
  formatClassTime,
  getClassStatus,
  sortClassesForStudent,
} from "@/utils/classUtils";
import Link from "next/link";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { LuClock } from "react-icons/lu";

/**
 * Compact "next class" strip for the student dashboard. Stays out of the way
 * while loading and when there is nothing scheduled - the full list lives on
 * /student/classes.
 */
export default function UpcomingClassBanner() {
  const { myClassesData, myClassesLoading } = useMyClasses();

  if (myClassesLoading) {
    return (
      <div className="mt-10 h-28 w-full animate-pulse rounded-lg bg-gray-100" />
    );
  }

  const classes: TClass[] = myClassesData?.data || [];
  const { upcoming } = sortClassesForStudent(classes);
  const nextClass = upcoming[0];

  if (!nextClass) return null;

  const isLive = getClassStatus(nextClass) === "live";

  return (
    <section className="mt-10 rounded-lg border border-primary bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isLive ? (
              <>
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                <span className="text-red-600">Class is live now</span>
              </>
            ) : (
              "Your next class"
            )}
          </p>

          <h3 className="mt-2 text-lg text-primary sm:text-2xl">
            {nextClass.title}
          </h3>

          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <LuClock className="shrink-0" />
            {formatClassTime(nextClass.scheduledAt)} ·{" "}
            {PLATFORM_LABELS[nextClass.platform]}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
          <a
            href={nextClass.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-light"
          >
            <FiExternalLink />
            Join class
          </a>

          <Link
            href="/student/classes"
            className="inline-flex items-center justify-center gap-1 text-sm text-primary hover:underline"
          >
            All classes <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
