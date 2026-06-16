"use client";
import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useCourses from "@/hooks/useCourses";
import { TCourse } from "@/types/course.type";
import Link from "next/link";
import { useState } from "react";
import { FaQuoteRight, FaUser, FaUserFriends } from "react-icons/fa";
import { LuBook, LuClock } from "react-icons/lu";

const Courses = () => {
  const [showAll, setShowAll] = useState<{ [key: string]: boolean }>({});
  const toggleDetails = (courseId: string) => {
    setShowAll((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };
  const { coursesData } = useCourses();

  return (
    <section>
      <Breadcrumbs title="কোর্সসমূহ" />

      {/* Hadith Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <FaQuoteRight className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-priabg-primary mb-2">
                  শিক্ষা নিয়ে হাদিস
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto"></div>
              </div>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-xl md:text-2xl text-gray-800 font-arabic leading-relaxed mb-4">
                    طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 mb-6">
                    &quot;জ্ঞান অর্জন করা প্রত্যেক মুসলিমের জন্য ফরজ&quot;
                  </p>
                  <p className="text-sm text-gray-500">
                    - সুনান ইবনে মাজাহ, হাদিস নং: ২২৪
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-600 text-center italic">
                    &quot;এই হাদিসটি শিক্ষার গুরুত্ব এবং মর্যাদা তুলে ধরে।
                    ইসলামে জ্ঞান অর্জনের মাধ্যমে আত্মিক ও বৈষয়িক উন্নতি সাধন
                    করা একটি গুরুত্বপূর্ণ ইবাদত হিসেবে বিবেচিত হয়।&quot;
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 -right-4 -bottom-4 -top-4 bg-emerald-50 rounded-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          আমাদের <span className="text-primary">কোর্সসমূহ</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.data &&
            coursesData.data.map((course: TCourse) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full"
              >
                <div className="bg-primary p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {course.name}
                  </h3>
                  <div className="flex justify-between items-center text-white/90">
                    <div className="flex items-center gap-2">
                      <LuClock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {course.method === "One to One" ? (
                        <>
                          <FaUser className="w-4 h-4" />
                          <span>{course.method}</span>
                        </>
                      ) : (
                        <>
                          <FaUserFriends className="w-4 h-4" />
                          <span>{course.method}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <LuBook className="w-5 h-5 text-primary" />
                      <span className="font-semibold">কোর্সের বিষয়বস্তু</span>
                    </div>
                    <span className="text-lg font-semibold text-primary font-sans">
                      ${course.fee}/month
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {(showAll[course._id]
                      ? course.details
                      : course.details.slice(0, 4)
                    ).map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-zinc-500">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {!showAll[course._id] && course.details.length > 4 && (
                    <button
                      onClick={() => toggleDetails(course._id)}
                      className="text-sm text-zinc-500 mt-2 mb-4 underline cursor-pointer text-left"
                    >
                      + আরও {course.details.length - 4}টি বিষয়
                    </button>
                  )}
                  {showAll[course._id] && (
                    <button
                      onClick={() => toggleDetails(course._id)}
                      className="text-sm text-zinc-500 mt-2 mb-4 underline cursor-pointer text-left"
                    >
                      কম দেখান
                    </button>
                  )}

                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
                    target="_blank"
                    className="w-full mt-auto bg-emerald-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    ভর্তি হন
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Get in touch */}
      <GetInTouch />
    </section>
  );
};

export default Courses;
