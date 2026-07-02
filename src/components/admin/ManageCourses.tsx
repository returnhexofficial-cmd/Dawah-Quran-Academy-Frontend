"use client";

import CourseBox from "@/app/(admin)/admin/manage-courses/CourseBox";
import CustomModal from "@/utils/CustomModal";
import useAxios from "@/hooks/useAxios";
import useCourses from "@/hooks/useCourses";
import { TCourse } from "@/types/course.type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { toast } from "react-toastify";

interface IFormInput {
  name: string;
  img: string;
  fee: number;
  method: string;
  duration: string;
  details: string;
}

const ManageCourses = () => {
  const axiosSecure = useAxios();
  const { coursesData, coursesRefetch, coursesLoading } = useCourses();
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onCourseDataSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const updateData = {
        name: data?.name,
        img: data?.img,
        fee: Number(data?.fee),
        method: data?.method,
        duration: data?.duration,
        details: data?.details.split(";").map((item: string) => item.trim()),
      };

      const res = await axiosSecure.post("/courses", updateData);
      console.log(res.data);
      if (res.data.statusCode === 201) {
        Swal.fire({
          title: "Course added successfully",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
        setIsCourseModalOpen(false);
        reset();
        coursesRefetch();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Could not add course");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (coursesLoading) return <LoadingSpinner />;
  return (
    <section className="mx-auto overflow-y-hidden">
      <div className="sm:flex justify-between items-center mt-10">
        <DashboardTitle blackText="Manage" greenText="Courses" />
        <button
          className="bg-[#374868] hover:bg-[#08255c] duration-300 text-white px-4 py-2 rounded-md flex items-center gap-2 my-3 sm:my-0"
          onClick={() => setIsCourseModalOpen(true)}
        >
          <AiOutlinePlus /> Add Course
        </button>
      </div>

      <div className="flex flex-wrap gap-5 my-5">
        {coursesData.data &&
          coursesData.data.map((course: TCourse) => (
            <CourseBox
              key={course?._id}
              course={course}
              refetch={coursesRefetch}
            />
          ))}
      </div>

      {isCourseModalOpen && (
        <CustomModal
          isModalOpen={isCourseModalOpen}
          setIsModalOpen={setIsCourseModalOpen}
        >
          <form onSubmit={handleSubmit(onCourseDataSubmit)}>
            <h3 className="font-bold text-xl mb-2">Add Course Information</h3>
            <p className="border-t border-dark mb-5"></p>

            {/* Course Name */}
            <label className="text-dark text-sm">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="বাংলায়"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.name && "border-red-500"
              }`}
            />

            {/* Course Image */}
            <label className="text-dark text-sm">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("img", { required: true })}
              placeholder="কাভার ইমেজের লিংক"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.img && "border-red-500"
              }`}
            />

            {/* Course Fee */}
            <label className="text-dark text-sm">
              Fee <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("fee", { required: true })}
              placeholder="ডলার রেটে, ইংরেজিতে"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.fee && "border-red-500"
              }`}
            />

            {/* Course Method */}
            <label className="text-dark text-sm">
              Method <span className="text-red-500">*</span>
            </label>
            <select
              {...register("method", { required: true })}
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.method && "border-red-500"
              }`}
            >
              <option value="One to One">One to One</option>
              <option value="Batch">Batch</option>
            </select>

            {/* Course Duration */}
            <label className="text-dark text-sm">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("duration", { required: true })}
              placeholder="e.g. ৬ মাস"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.duration && "border-red-500"
              }`}
            />

            {/* Course Details */}
            <label className="text-dark text-sm">
              Details (separate with ; ) <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("details", { required: true })}
              placeholder="বাংলায়। প্রতিটি পয়েন্ট সেমিকোলন(;) দিয়ে আলাদা থাকবে"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.details && "border-red-500"
              }`}
            ></textarea>

            {/* Submit */}
            <input
              className={`text-center px-3 md:px-5 py-1 md:py-3 duration-300 rounded-lg text-white cursor-pointer mt-3 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#374868] hover:bg-[#08255c]"
              }`}
              type="submit"
              value={isSubmitting ? "Adding Course..." : "Add Course"}
              disabled={isSubmitting}
            />
          </form>
        </CustomModal>
      )}
    </section>
  );
};

export default ManageCourses;
