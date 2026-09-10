"use client";

import Breadcrumbs from "@/utils/Breadcrumb";
import EmptyState from "@/utils/EmptyState";
import GetInTouch from "@/utils/GetInTouch";
import LoadingSpinner from "@/utils/LoadingSpinner";
import SectionHeading from "@/utils/SectionHeading";
import useTeachers from "@/hooks/useTeachers";
import { TTeacher } from "@/types/teacher.type";
import TeacherCard from "@/components/home/TeacherCard";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CSSProperties } from "react";

const TeachersSection = () => {
  const { teachersData, teachersLoading } = useTeachers();

  const hasTeachers = teachersData?.data && teachersData.data.length > 0;

  return (
    <section>
      <Breadcrumbs
        title="শিক্ষকবৃন্দ"
        heading="আমাদের অভিজ্ঞ শিক্ষকবৃন্দ"
        description="যোগ্য ও অভিজ্ঞ শিক্ষকদের সাথে সহীহভাবে কুরআন শিখুন।"
      />

      <section className="section-y bg-gray-50">
        <div className="site-container">
          <SectionHeading
            eyebrow="আমাদের টিম"
            title="আমাদের"
            accent="শিক্ষকবৃন্দ"
            description="আমাদের অভিজ্ঞ ও দক্ষ শিক্ষকবৃন্দের মাধ্যমে সহীহভাবে কুরআন শিক্ষা গ্রহণ করুন।"
          />

          {teachersLoading ? (
            <LoadingSpinner panel label="শিক্ষকবৃন্দের তালিকা লোড হচ্ছে..." />
          ) : hasTeachers ? (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachersData.data.map((teacher: TTeacher, index: number) => (
                <div
                  key={teacher._id}
                  className="fade-up"
                  style={{ "--delay": `${index * 60}ms` } as CSSProperties}
                >
                  <TeacherCard teacher={teacher} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={HiOutlineUserGroup}
              title="কোনো শিক্ষক পাওয়া যায়নি"
              description="এই মুহূর্তে আমাদের শিক্ষকবৃন্দের তালিকা খালি। শীঘ্রই নতুন শিক্ষক যুক্ত করা হবে।"
            />
          )}
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default TeachersSection;