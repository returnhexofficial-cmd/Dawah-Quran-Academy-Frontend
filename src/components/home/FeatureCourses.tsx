"use client";

// import courses_bg from "@/assets/courses_bg.png";
import courses_bg from "@/assets/course/bg-image1.png";
import useCourses from "@/hooks/useCourses";
import { TCourse } from "@/types/course.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuBook, LuClock } from "react-icons/lu";
import CourseImg from "@/assets/course/image-cours1.jpeg";

const FeatureCourses = () => {
  const { coursesData } = useCourses();
  useEffect(() => {
    // console.log("Course Data in Production", coursesData);
  }, [coursesData]);

  return (
    <section className="relative section-y">
      <Image
        className="hidden md:block absolute w-full h-min -z-10 -mt-32"
        src={courses_bg}
        alt="Logo"
      />
      <section className="site-container">

        <div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl duration-200 text-darker font-bold mb-10 lg:mb-12">
            <span className="text-primary">ফিচার</span> কোর্সসমূহ
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 lg:gap-10">
          {coursesData.data &&
            coursesData.data.length > 0 &&
            coursesData.data.slice(0, 3).map((course: TCourse) => (
              <Link
                href="/courses"
                className="text-darker cursor-pointer flex flex-col justify-between gap-5 hover:bg-light/40 duration-300 rounded-lg group w-fit px-5 md:px-8 py-3 lg:py-6"
                key={course._id}
              >
                <div className="flex flex-col justify-center items-center gap-5">
                  <img
                    src={course?.img}
                    alt={course?.name}
                    width={250}
                    height={250} />
                  <h3 className="md:text-lg font-semibold mb-4 bg-primary text-white text-center rounded-lg px-5 py-2">
                    {course.name}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </section>
  );
};

export default FeatureCourses;
