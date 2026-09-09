"use client";

import useAxios from "@/hooks/useAxios";
import { TClass } from "@/types/class.type";
import { TUser } from "@/types/user.type";
import {
  PLATFORM_BADGE_STYLES,
  PLATFORM_LABELS,
  formatClassTime,
  getClassStatus,
} from "@/utils/classUtils";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuClock } from "react-icons/lu";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import Swal from "sweetalert2";

interface IClassBox {
  item: TClass;
  refetch: () => void;
  onEdit: (item: TClass) => void;
}

const ClassBox = ({ item, refetch, onEdit }: IClassBox) => {
  const axiosSecure = useAxios();
  const status = getClassStatus(item);

  // Students come back populated from the admin endpoint, so show their names
  // where possible and fall back to a plain count.
  const namedStudents = item.students?.filter(
    (student): student is TUser =>
      typeof student === "object" && student !== null
  );

  const audienceText =
    item.audience === "all"
      ? "All students"
      : namedStudents && namedStudents.length > 0
      ? namedStudents.map((student) => student.name).join(", ")
      : `${item.students?.length || 0} selected student(s)`;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Students will no longer see this class.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed && typeof window !== "undefined") {
        axiosSecure.delete(`/classes/${item._id}`).then((res) => {
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
      className={`relative w-full rounded-lg border p-5 transition hover:shadow-xl ${
        status === "past" ? "border-gray-200 bg-gray-50" : "border-primary"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 pr-16">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            PLATFORM_BADGE_STYLES[item.platform]
          }`}
        >
          {PLATFORM_LABELS[item.platform]}
        </span>

        {status === "live" && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Live now
          </span>
        )}

        {status === "past" && (
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
            Finished
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg text-primary sm:text-2xl">{item.title}</h3>

      <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
        <LuClock className="shrink-0" />
        {formatClassTime(item.scheduledAt)}
        {item.durationMinutes ? ` · ${item.durationMinutes} min` : ""}
      </p>

      <p className="mt-1 flex items-start gap-2 text-sm text-gray-500">
        <HiOutlineUserGroup className="mt-0.5 shrink-0" />
        <span>{audienceText}</span>
      </p>

      {item.description && (
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {item.description}
        </p>
      )}

      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex max-w-full items-center gap-2 text-sm text-primary hover:underline"
      >
        <FiExternalLink className="shrink-0" />
        <span className="truncate">{item.link}</span>
      </a>

      <div className="absolute right-4 top-4 flex gap-3">
        <MdOutlineEdit
          onClick={() => onEdit(item)}
          title="Edit"
          className="cursor-pointer text-xl text-primary"
        />
        <MdOutlineDelete
          onClick={handleDelete}
          title="Delete"
          className="cursor-pointer text-xl text-red-500"
        />
      </div>
    </section>
  );
};

export default ClassBox;
