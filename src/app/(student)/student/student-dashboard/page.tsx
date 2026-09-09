import dynamic from "next/dynamic";

const UpcomingClassBanner = dynamic(
  () => import("@/components/student/UpcomingClassBanner")
);

const StudentProfile = dynamic(
  () => import("@/components/student/StudentProfile")
);

export default function StudentProfilePage() {
  return (
    <>
      <UpcomingClassBanner />
      <StudentProfile />
    </>
  );
}
