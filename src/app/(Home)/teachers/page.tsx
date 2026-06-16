"use client";

import female from "@/assets/Avatar/female_avatar.png";
import male from "@/assets/Avatar/male_avatar.png";
import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useTeachers from "@/hooks/useTeachers";
import { TTeacher } from "@/types/teacher.type";
import Image from "next/image";

const TeachersSection = () => {
  const { teachersData } = useTeachers();
  return (
    <section>
      <Breadcrumbs title="শিক্ষকবৃন্দ" />

      {/* আমাদের শিক্ষকবৃন্দ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-darker mb-12">
            আমাদের <span className="text-emerald-600">শিক্ষকবৃন্দ</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teachersData.data &&
              teachersData.data.map((teacher: TTeacher, index: number) => (
                <div
                  key={index}
                  className="relative bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl p-6"
                >
                  {/* Image Container */}
                  <div className="relative mx-auto rounded-lg overflow-hidden">
                    <Image
                      src={teacher?.gender == "male" ? male : female}
                      alt={teacher.name}
                      // className={teacher?.gender== "male"? "w-full": "w-5/6 mx-auto"}
                    />
                  </div>

                  {/* Info Section */}
                  <div className="text-center mt-6">
                    <h3 className="text-2xl font-bold text-darker">
                      {teacher.name || "N/A"}
                    </h3>
                    <div className="flex justify-center items-center mt-3">
                      <span className="text-zinc-500 text-sm ml-2">
                        শিক্ষক: {teacher.subject || "N/A"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600">
                      {teacher.education || "N/A"} ফারেগ
                    </p>
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
