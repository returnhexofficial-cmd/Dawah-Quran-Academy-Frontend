"use client";

import ClassBox from "@/app/(admin)/admin/manage-classes/ClassBox";
import useAxios from "@/hooks/useAxios";
import useClasses from "@/hooks/useClasses";
import useUsers from "@/hooks/useUsers";
import { TClass, TClassAudience, TClassPlatform } from "@/types/class.type";
import { TUser } from "@/types/user.type";
import CustomModal from "@/utils/CustomModal";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface IClassForm {
  title: string;
  link: string;
  platform: TClassPlatform | "";
  scheduledAt: string;
  durationMinutes: string;
  description: string;
  audience: TClassAudience;
}

const emptyForm: IClassForm = {
  title: "",
  link: "",
  platform: "",
  scheduledAt: "",
  durationMinutes: "",
  description: "",
  audience: "all",
};

/** `datetime-local` needs a local "YYYY-MM-DDTHH:mm" string, not an ISO one. */
const toDateTimeLocal = (iso: string) => {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export default function ManageClasses() {
  const axiosSecure = useAxios();
  const { classesData, classesLoading, classesRefetch } = useClasses();
  const { usersData, usersLoading } = useUsers();

  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<TClass | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IClassForm>({ defaultValues: emptyForm });

  const audience = watch("audience");

  const students: TUser[] = (usersData?.data || []).filter(
    (user: TUser) => user.role === "student" && !user.isDeleted
  );

  // Load the class being edited into the form; clear it when adding a new one.
  useEffect(() => {
    if (!isClassModalOpen) return;

    if (editingClass) {
      reset({
        title: editingClass.title,
        link: editingClass.link,
        platform: editingClass.platform,
        scheduledAt: toDateTimeLocal(editingClass.scheduledAt),
        durationMinutes: editingClass.durationMinutes
          ? String(editingClass.durationMinutes)
          : "",
        description: editingClass.description || "",
        audience: editingClass.audience,
      });
      setSelectedStudents(
        (editingClass.students || []).map((student) =>
          typeof student === "string" ? student : student._id
        )
      );
    } else {
      reset(emptyForm);
      setSelectedStudents([]);
    }
  }, [isClassModalOpen, editingClass, reset]);

  const closeModal = () => {
    setIsClassModalOpen(false);
    setEditingClass(null);
  };

  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const onClassSubmit: SubmitHandler<IClassForm> = async (data) => {
    if (data.audience === "selected" && selectedStudents.length === 0) {
      toast.error("Select at least one student");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: data.title,
        link: data.link.trim(),
        // Empty means "work it out from the link".
        platform: data.platform || undefined,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
        durationMinutes: data.durationMinutes
          ? Number(data.durationMinutes)
          : undefined,
        description: data.description || undefined,
        audience: data.audience,
        students: data.audience === "selected" ? selectedStudents : [],
      };

      const res = editingClass
        ? await axiosSecure.put(`/classes/${editingClass._id}`, payload)
        : await axiosSecure.post("/classes", payload);

      if (res.data?.success) {
        Swal.fire({
          title: editingClass
            ? "Class updated successfully"
            : "Class link shared successfully",
          icon: "success",
          timer: 1800,
        });
        closeModal();
        reset(emptyForm);
        setSelectedStudents([]);
        classesRefetch();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Could not save the class");
      console.error("Error saving class:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (classesLoading) return <LoadingSpinner />;

  const classes: TClass[] = classesData?.data || [];

  return (
    <section>
      <div className="mt-10 sm:flex sm:items-center sm:justify-between">
        <DashboardTitle blackText="Manage" greenText="Classes" />
        <button
          className="my-3 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white duration-300 hover:bg-light sm:my-0"
          onClick={() => {
            setEditingClass(null);
            setIsClassModalOpen(true);
          }}
        >
          <AiOutlinePlus /> Add Class
        </button>
      </div>

      <div className="my-5 space-y-5">
        {classes.length > 0 ? (
          classes.map((item) => (
            <ClassBox
              key={item._id}
              item={item}
              refetch={classesRefetch}
              onEdit={(selected) => {
                setEditingClass(selected);
                setIsClassModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <div className="mb-6 rounded-full bg-primary/10 p-6">
              <SiGoogleclassroom className="text-5xl text-primary" />
            </div>

            <h3 className="mb-2 text-2xl font-bold text-primary">
              কোনো ক্লাস পাওয়া যায়নি
            </h3>

            <p className="max-w-md leading-7 text-gray-500">
              এখনো কোনো ক্লাস যোগ করা হয়নি। উপরের &quot;Add Class&quot; বাটনে
              ক্লিক করে Google Meet বা Zoom এর লিংক শেয়ার করুন।
            </p>
          </div>
        )}
      </div>

      {isClassModalOpen && (
        <CustomModal
          isModalOpen={isClassModalOpen}
          setIsModalOpen={closeModal}
          larger
        >
          <form
            onSubmit={handleSubmit(onClassSubmit)}
            className="max-h-[75vh] overflow-y-auto pr-1"
          >
            <h3 className="mb-2 text-xl font-bold">
              {editingClass ? "Edit Class" : "Add Class"}
            </h3>
            <p className="mb-5 border-t border-dark"></p>

            {/* Title */}
            <div className="w-full">
              <label className="text-sm text-dark">
                Class Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Tajweed - Lesson 4"
                {...register("title", { required: true })}
                className={`mb-3 w-full rounded-md border border-dark/40 bg-white p-2 text-black focus:border-primary focus:outline-none ${
                  errors.title && "border border-red-500"
                }`}
              />
            </div>

            {/* Link */}
            <div className="w-full">
              <label className="text-sm text-dark">
                Class Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                placeholder="https://meet.google.com/abc-defg-hij"
                {...register("link", { required: true })}
                className={`mb-3 w-full rounded-md border border-dark/40 bg-white p-2 text-black focus:border-primary focus:outline-none ${
                  errors.link && "border border-red-500"
                }`}
              />
            </div>

            <div className="gap-3 sm:flex">
              {/* Platform */}
              <div className="w-full">
                <label className="text-sm text-dark">Platform</label>
                <select
                  {...register("platform")}
                  className="mb-3 w-full rounded-md border border-dark/40 bg-white p-2 text-black focus:border-primary focus:outline-none"
                >
                  <option value="">Detect from link</option>
                  <option value="google-meet">Google Meet</option>
                  <option value="zoom">Zoom</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Duration */}
              <div className="w-full">
                <label className="text-sm text-dark">Duration (minutes)</label>
                <input
                  type="number"
                  min={1}
                  placeholder="60"
                  {...register("durationMinutes")}
                  className="mb-3 w-full rounded-md border border-dark/40 bg-white p-2 text-black focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Schedule */}
            <div className="w-full">
              <label className="text-sm text-dark">
                Date &amp; Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                {...register("scheduledAt", { required: true })}
                className={`mb-3 w-full rounded-md border border-dark/40 bg-white p-2 text-black focus:border-primary focus:outline-none ${
                  errors.scheduledAt && "border border-red-500"
                }`}
              />
            </div>

            {/* Description */}
            <div className="w-full">
              <label className="text-sm text-dark">Description</label>
              <textarea
                placeholder="Optional note for the students..."
                rows={3}
                {...register("description")}
                className="mb-3 w-full rounded-md border border-dark/40 bg-white p-2 text-black focus:border-primary focus:outline-none"
              />
            </div>

            {/* Audience */}
            <div className="w-full">
              <label className="text-sm text-dark">Who can see it?</label>
              <div className="mb-3 mt-1 flex flex-wrap gap-5">
                <label className="flex items-center gap-2 text-sm text-black">
                  <input type="radio" value="all" {...register("audience")} />
                  All students
                </label>
                <label className="flex items-center gap-2 text-sm text-black">
                  <input
                    type="radio"
                    value="selected"
                    {...register("audience")}
                  />
                  Selected students
                </label>
              </div>
            </div>

            {audience === "selected" && (
              <div className="mb-3 rounded-md border border-dark/40 p-3">
                {usersLoading ? (
                  <LoadingSpinner className="py-6" iconClassName="w-8 h-8" />
                ) : students.length > 0 ? (
                  <>
                    <p className="mb-2 text-xs text-gray-500">
                      {selectedStudents.length} student(s) selected
                    </p>
                    <div className="max-h-48 space-y-2 overflow-y-auto">
                      {students.map((student) => (
                        <label
                          key={student._id}
                          className="flex items-center gap-2 text-sm text-black"
                        >
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student._id)}
                            onChange={() => toggleStudent(student._id)}
                          />
                          <span>
                            {student.name}{" "}
                            <span className="text-gray-500">
                              ({student.email})
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">No students found yet.</p>
                )}
              </div>
            )}

            {/* Submit */}
            <input
              className={`mt-3 cursor-pointer rounded-lg px-3 py-1 text-center text-white duration-300 md:px-5 md:py-3 ${
                isSubmitting
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-primary hover:bg-light"
              }`}
              type="submit"
              value={
                isSubmitting
                  ? editingClass
                    ? "Updating Class..."
                    : "Adding Class..."
                  : editingClass
                  ? "Update Class"
                  : "Add Class"
              }
              disabled={isSubmitting}
            />
          </form>
        </CustomModal>
      )}
    </section>
  );
}
