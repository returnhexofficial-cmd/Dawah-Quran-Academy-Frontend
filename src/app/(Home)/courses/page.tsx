"use client";
import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useCourses from "@/hooks/useCourses";
import { TCourse } from "@/types/course.type";
import Link from "next/link";
import { CSSProperties, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { LuBook, LuClock } from "react-icons/lu";
import EmptyState from "@/utils/EmptyState";
import LoadingSpinner from "@/utils/LoadingSpinner";
import SectionHeading from "@/utils/SectionHeading";

import bgImg from "@/assets/course/bg-image1.png";
import Image from "next/image";
import { useSiteConfig } from "@/app/providers/SiteConfigContext";

const Courses = () => {
  const { siteConfig } = useSiteConfig();
  const [showAll, setShowAll] = useState<{ [key: string]: boolean }>({});
  const { coursesData, coursesLoading } = useCourses();

  const toggleDetails = (courseId: string) => {
    setShowAll((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const hasCourses = coursesData?.data && coursesData.data.length > 0;

  return (
    <section className=" ">
      <Breadcrumbs
        title="কোর্সসমূহ"
        heading="অনলাইন কুরআন কোর্সসমূহ"
        description="আপনার সময় ও সামর্থ্য অনুযায়ী কোর্স বেছে নিন এবং আজই শুরু করুন।"
      />

      <section className="section-y" style={{ background: "#f0f3f8" }}>
        <div className="site-container-narrow">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[3px] text-primary">
            আল-হাদিস
          </p>

          <div className="relative rounded-3xl bg-primary overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5"
              aria-hidden="true"
            >
              <span
                className="font-arabic"
                style={{ fontSize: "clamp(6rem,20vw,16rem)", color: "#ffd54f" }}
              >
                علم
              </span>
            </div>

            <div className="absolute top-6 left-6 opacity-30">
              <FaQuoteRight
                className="w-10 h-10"
                style={{ color: "#ffd54f" }}
              />
            </div>

            <div className="relative z-10 py-16 px-6 md:px-16 text-center">
              <p
                className="font-arabic text-2xl md:text-4xl leading-loose mb-6"
                style={{ color: "#ffd54f" }}
              >
                طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
              </p>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                  className="h-px w-16 md:w-28"
                  style={{ background: "rgba(255,213,79,0.4)" }}
                />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#ffd54f" }}
                />
                <div
                  className="h-px w-16 md:w-28"
                  style={{ background: "rgba(255,213,79,0.4)" }}
                />
              </div>

              <p className="text-lg md:text-2xl text-white/90 font-medium mb-4">
                &ldquo;জ্ঞান অর্জন করা প্রত্যেক মুসলিমের জন্য ফরজ&rdquo;
              </p>

              <p className="text-sm text-white/50 mb-10">
                — সুনান ইবনে মাজাহ, হাদিস নং: ২২৪
              </p>

              <div
                className="inline-block rounded-2xl px-6 py-4 text-sm md:text-base text-white/80 italic max-w-2xl"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                এই হাদিসটি শিক্ষার গুরুত্ব ও মর্যাদা তুলে ধরে। ইসলামে জ্ঞান
                অর্জনের মাধ্যমে আত্মিক ও বৈষয়িক উন্নতি সাধন করা একটি
                গুরুত্বপূর্ণ ইবাদত হিসেবে বিবেচিত হয়।
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y relative bg-white">
        <div className=" absolute z-0 w-full h-full top-0 left-0 right-0">
          <Image src={bgImg} alt="bg-image" className="w-full h-full" />
        </div>
        <div className="site-container relative z-20">
          <SectionHeading
            eyebrow="আমাদের প্রোগ্রাম"
            title="অনলাইন ইসলামিক"
            accent="কোর্সসমূহ"
            description="আপনার সময় ও সামর্থ্য অনুযায়ী সাজানো কোর্সগুলো থেকে বেছে নিন।"
          />

          {coursesLoading ? (
            <LoadingSpinner panel label="কোর্সসমূহ লোড হচ্ছে..." />
          ) : hasCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {coursesData.data.map((course: TCourse, index: number) => (
                <div
                  key={course._id}
                  style={{ "--delay": `${index * 60}ms` } as CSSProperties}
                  className="fade-up card-surface card-hover group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-primary">
                    <img
                      src={course.img}
                      alt={course.name}
                      className="media-zoom h-64 w-full object-cover"
                    />

                    <span className="card-badge left-4 top-4 bg-accent text-primary">
                      {course.method}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 text-xs font-medium text-primary">
                    <span className="flex items-center gap-1">
                      <LuClock className="h-4 w-4" />
                      {course.duration}
                    </span>

                    {/* <span className="flex items-center gap-1">
                      <LuBook className="h-4 w-4" />
                      {course.details.length} টি বিষয়
                    </span> */}
                  </div>

                  {/* Body */}
                  <div className="flex flex-grow flex-col p-5">
                    <p className="mb-1 text-xs text-gray-400">
                      {course.method}
                    </p>

                    <h3 className="mb-4 text-base font-bold leading-snug text-primary">
                      {course.name}
                    </h3>

                    <div className="mb-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        কোর্সের বিষয়বস্তু
                      </p>

                      <ul className="space-y-2">
                        {(showAll[course._id]
                          ? course.details
                          : course.details.slice(0, 2)
                        ).map((item: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-500"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ffd54f]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {course.details.length > 2 && (
                        <button
                          onClick={() => toggleDetails(course._id)}
                          className="mt-3 text-sm font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
                        >
                          {showAll[course._id]
                            ? "কম দেখান"
                            : `+ আরও ${course.details.length - 2}টি বিষয়`}
                        </button>
                      )}
                    </div>

                    <div className="flex-grow" />

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-lg font-bold text-primary">
                        ৳{course.fee}
                      </span>

                      <Link
                        href={siteConfig.admissionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        ভর্তি হন
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={LuBook}
              title="কোনো কোর্স পাওয়া যায়নি"
              description="এই মুহূর্তে আমাদের কোনো কোর্স চালু নেই। অনুগ্রহ করে পরে আবার চেক করুন, নতুন কোর্স শীঘ্রই যুক্ত করা হবে।"
            />
          )}
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default Courses;
