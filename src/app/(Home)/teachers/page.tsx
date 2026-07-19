"use client";

import female from "@/assets/Avatar/women-teacher.png";
import male from "@/assets/Avatar/male_avatar.png";
import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useTeachers from "@/hooks/useTeachers";
import { TTeacher } from "@/types/teacher.type";
import Image from "next/image";

const TeachersSection = () => {
  const { teachersData } = useTeachers();

  console.log("Teachers Data:", teachersData);

  return (
    <section>
      <Breadcrumbs title="শিক্ষকবৃন্দ" />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-primary">
              আমাদের <span className="text-[#ffd54f]">শিক্ষকবৃন্দ</span>
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              আমাদের অভিজ্ঞ ও দক্ষ শিক্ষকবৃন্দের মাধ্যমে সহীহভাবে কুরআন শিক্ষা
              গ্রহণ করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 w-full max-w-[1200px] mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachersData?.data?.map((teacher: TTeacher) => (
              <div
                key={teacher._id}
                className="group relative w-full overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={teacher.gender === "female" ? female : male}
                    alt={teacher.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2638] via-primary/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute right-4 top-4 translate-y-[-10px] rounded-full bg-[#ffd54f] px-4 py-1.5 text-xs font-bold text-primary opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {teacher.gender === "female" ? "শিক্ষিকা" : "শিক্ষক"}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                      {teacher.name}
                    </h2>

                    <div className="mt-2 h-[3px] w-14 rounded-full bg-[#ffd54f] transition-all duration-500 group-hover:w-24" />

                    <p className="mt-2 text-sm font-medium text-white/90">
                      {teacher.subject}
                    </p>
                  </div>
                </div>

                <div className="relative px-7 py-6 text-center">
                  <p className="text-gray-500">{teacher.education}</p>

                  <button className="group/btn relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#ffd54f]/40">
                    <span className="absolute inset-0 -translate-x-full bg-[#ffd54f] transition-transform duration-500 group-hover/btn:translate-x-0"></span>

                    <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-primary">
                      বিস্তারিত দেখুন
                    </span>

                    <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:text-primary">
                      →
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default TeachersSection;
