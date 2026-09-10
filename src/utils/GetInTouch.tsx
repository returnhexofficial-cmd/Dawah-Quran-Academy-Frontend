"use client";

import { MdMosque } from "react-icons/md";
import Link from "next/link";
import { useSiteConfig } from "@/app/providers/SiteConfigContext";

const GetInTouch = () => {
  const { siteConfig } = useSiteConfig();

  return (
    <section className="site-container section-y relative z-50">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-2xl bg-primary px-6 py-10 shadow-lg md:flex-row md:px-10">
        <div className="flex items-center gap-5 text-white">
          <div className="shrink-0 rounded-full bg-accent p-4 shadow-lg">
            <MdMosque className="text-primary" size={28} />
          </div>

          <h2 className="text-lg font-bold md:text-2xl">
            শয়তান যেন আপনার দ্বীন শিখার পথে বিলম্ব না করায়। আজই শুরু করুন!
          </h2>
        </div>

        <Link
          href={siteConfig.admissionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-on-dark w-full shrink-0 md:w-auto md:px-8"
        >
          ভর্তি হোন
        </Link>
      </div>
    </section>
  );
};

export default GetInTouch;
