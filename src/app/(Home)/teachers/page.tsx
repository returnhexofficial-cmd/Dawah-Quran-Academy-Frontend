"use client";

import female from "@/assets/Avatar/women-teacher.png";
import male from "@/assets/Avatar/male_avatar.png";
import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useTeachers from "@/hooks/useTeachers";
import { TTeacher } from "@/types/teacher.type";
import Image from "next/image";
import TeacherCard from "@/components/home/TeacherCard";

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
              আমাদের <span className="text-secondary">শিক্ষকবৃন্দ</span>
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              আমাদের অভিজ্ঞ ও দক্ষ শিক্ষকবৃন্দের মাধ্যমে সহীহভাবে কুরআন শিক্ষা
              গ্রহণ করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 w-full max-w-[1200px] mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachersData?.data?.map((teacher: TTeacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default TeachersSection;
