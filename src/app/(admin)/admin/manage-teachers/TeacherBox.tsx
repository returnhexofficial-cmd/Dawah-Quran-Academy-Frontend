"use client";

import Tooltip from "@/utils/Tooltip";
import useAxios from "@/hooks/useAxios";
import { TTeacher } from "@/types/teacher.type";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Image from "next/image";
import maleIcon from "@/assets/Avatar/male_avatar.png";
import femaleIcon from "@/assets/Avatar/female_avatar.png";

interface ITeacherBox {
  teacher: TTeacher;
  refetch: () => void;
}

const TeacherBox = ({ teacher, refetch }: ITeacherBox) => {
  const axiosSecure = useAxios();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed && typeof window !== "undefined") {
        axiosSecure.delete(`/teachers/${teacher?._id}`).then((res) => {
          if (res.data.statusCode === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted Successfully!",
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <section
      className="relative p-5 rounded-lg 
        w-64 sm:w-96 md:w-80 lg:w-96 flex justify-between items-center  
        hover:shadow-xl transition border border-primary h-fit"
    >
      <div className="mt-2">
        <div className="flex items-center gap-3">
          <Image
            width={80}
            height={80}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            src={teacher.gender === "female" ? femaleIcon : maleIcon}
            alt={teacher?.name}
          />
          <div>
            <p className="text-lg lg:text-xl 2xl:text-2xl text-primary ">
              {teacher?.name}
            </p>
            <p className="mb-3 text-sm md:text-md  xl:text-lg">
              {teacher?.education && `(${teacher?.education})`}
            </p>
          </div>
        </div>
        <p className="text-base xl:text-lg italic ml-5">- {teacher?.subject}</p>
      </div>
      <div className="absolute bottom-2 right-2 flex gap-3">
        <Tooltip
          text="Delete"
          styles={{
            bottom: "0",
            top: "-7",
            right: "0",
            left: "0",
          }}
        >
          <MdOutlineDelete
            onClick={handleDelete}
            className="text-xl cursor-pointer text-red-500"
          />
        </Tooltip>
      </div>
    </section>
  );
};

export default TeacherBox;
