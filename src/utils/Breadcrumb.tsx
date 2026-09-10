import { FaGlobe, FaHome } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import breadcrumb from "@/assets/Home-Hero/bg-new.jpg";

type TBreadcrumbs = {
  /** Page name shown in the trail pill. */
  title: string;
  /** Page-specific <h1>. Falls back to the site-wide line. */
  heading?: string;
  /** Supporting line under the heading. */
  description?: string;
};

const Breadcrumbs = ({
  title,
  heading = "আপনার কুরআন শিক্ষার যাত্রা শুরু করুন",
  description = "আমাদের অভিজ্ঞ শিক্ষকদের সাথে অনলাইনে সহজ ও সুন্দরভাবে কুরআন শিখুন।",
}: TBreadcrumbs) => {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28 pb-14 md:pb-16">
      {/* Background */}
      <Image
        src={breadcrumb}
        alt=""
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Scrim — keeps the white text readable over any part of the photo. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/45" />

      <div className="site-container relative z-10">
        <div className="fade-up mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            {heading}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg leading-8 text-white/80">
            {description}
          </p>
        </div>

        <div
          className="fade-up mt-12 flex justify-center md:justify-start"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <nav
            aria-label="breadcrumb"
            className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-primary/90 px-6 py-4 shadow-2xl backdrop-blur-md"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-white transition-colors duration-200 hover:text-accent"
            >
              <FaHome className="text-sm" />
              <span>হোম</span>
            </Link>

            <span aria-hidden="true" className="text-white/40">
              /
            </span>

            <FaGlobe aria-hidden="true" className="text-accent" />

            <span aria-current="page" className="font-semibold text-accent">
              {title}
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;
