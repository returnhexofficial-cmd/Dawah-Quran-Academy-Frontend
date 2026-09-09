"use client";

import useMyClasses from "@/hooks/useMyClasses";
import { TClass } from "@/types/class.type";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { sortClassesForStudent } from "@/utils/classUtils";
import { SiGoogleclassroom } from "react-icons/si";
import ClassCard from "./ClassCard";

export default function MyClasses() {
  const { myClassesData, myClassesLoading } = useMyClasses();

  if (myClassesLoading) return <LoadingSpinner />;

  const classes: TClass[] = myClassesData?.data || [];
  const { upcoming, past } = sortClassesForStudent(classes);

  return (
    <section>
      <DashboardTitle blackText="My" greenText="Classes" className="mt-10" />

      {classes.length === 0 ? (
        <div className="my-5 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <div className="mb-6 rounded-full bg-primary/10 p-6">
            <SiGoogleclassroom className="text-5xl text-primary" />
          </div>

          <h3 className="mb-2 text-2xl font-bold text-primary">
            কোনো ক্লাস পাওয়া যায়নি
          </h3>

          <p className="max-w-md leading-7 text-gray-500">
            এই মুহূর্তে আপনার জন্য কোনো ক্লাস নির্ধারিত নেই। নতুন ক্লাসের লিংক
            যুক্ত হলে এখানেই দেখতে পাবেন।
          </p>
        </div>
      ) : (
        <>
          <div className="my-5 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Upcoming classes
            </h3>

            {upcoming.length > 0 ? (
              upcoming.map((item) => <ClassCard key={item._id} item={item} />)
            ) : (
              <p className="rounded-lg border border-dashed border-gray-300 px-5 py-6 text-gray-500">
                কোনো আসন্ন ক্লাস নেই।
              </p>
            )}
          </div>

          {past.length > 0 && (
            <div className="my-8 space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Past classes
              </h3>

              {past.map((item) => (
                <ClassCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
