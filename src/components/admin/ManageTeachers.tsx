"use client";

import TeacherBox from "@/app/(admin)/admin/manage-teachers/TeacherBox";
import CustomModal from "@/utils/CustomModal";
import useAxios from "@/hooks/useAxios";
import useTeachers from "@/hooks/useTeachers";
import { TTeacher } from "@/types/teacher.type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { toast } from "react-toastify";

interface IFormInput {
  name: string;
  education: string;
  subject: number;
  gender: string;
}

const ManageTeachers = () => {
  const axiosSecure = useAxios();
  const { teachersData, teachersRefetch, teachersLoading } = useTeachers();
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onTeacherDataSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const updateData = {
        name: data?.name,
        education: data?.education,
        subject: data?.subject,
        gender: data?.gender,
      };

      const res = await axiosSecure.post("/teachers", updateData);
      if (res.data?.statusCode === 201) {
        Swal.fire({
          title: "Teacher added successfully",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
        setIsTeacherModalOpen(false);
        reset();
        teachersRefetch();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Could not add teacher");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (teachersLoading) return <LoadingSpinner />;

  return (
    <section>
      <div className="sm:flex justify-between items-center mt-10">
        <DashboardTitle blackText="Manage" greenText="Teachers" />
        <button
          className="bg-primary hover:bg-[#08255c] duration-300 text-white px-4 py-2 rounded-md flex items-center gap-2 my-3 sm:my-0"
          onClick={() => setIsTeacherModalOpen(true)}
        >
          <AiOutlinePlus /> Add Teacher
        </button>
      </div>

      <div className="flex flex-wrap gap-5 my-5">
        {teachersData.data &&
          teachersData.data.map((teacher: TTeacher) => (
            <TeacherBox
              key={teacher?._id}
              teacher={teacher}
              refetch={teachersRefetch}
            />
          ))}
      </div>

      {isTeacherModalOpen && (
        <CustomModal
          isModalOpen={isTeacherModalOpen}
          setIsModalOpen={setIsTeacherModalOpen}
        >
          <form onSubmit={handleSubmit(onTeacherDataSubmit)}>
            <h3 className="font-bold text-xl mb-2">Add Teacher Information</h3>
            <p className="border-t border-dark mb-5"></p>

            <div className="sm:flex gap-3">
              {/* Teacher name */}
              <div className="w-full">
                <label className="text-dark text-sm">
                  Teacher&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                    errors.name && "border border-red-500"
                  }`}
                />
              </div>
            </div>

            {/* Teacher education */}
            <div className="w-full">
              <label className="text-dark text-sm">
                Teacher&apos;s Education <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. জামিয়া আরাবিয়া"
                {...register("education", { required: true })}
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                  errors.name && "border border-red-500"
                }`}
              />
            </div>

            {/* Teacher's gender */}
            <div className="w-full">
              <label className="text-dark text-sm">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender", { required: true })}
                className={`w-full cursor-pointer border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                  errors.gender && "border border-red-500"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Teacher's subject */}
            <div className="w-full">
              <label className="text-dark text-sm">
                Subject Taken <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("subject", { required: true })}
                placeholder="e.g. আরবী শিক্ষা কোর্স"
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                  errors.name && "border border-red-500"
                }`}
              />
            </div>

            {/* Submit */}
            <input
              className={`text-center px-3 md:px-5 py-1 md:py-3 duration-300 rounded-lg text-white cursor-pointer mt-3 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-[#08255c]"
              }`}
              type="submit"
              value={isSubmitting ? "Adding Teacher..." : "Add Teacher"}
              disabled={isSubmitting}
            />
          </form>
        </CustomModal>
      )}
    </section>
  );
};

export default ManageTeachers;
