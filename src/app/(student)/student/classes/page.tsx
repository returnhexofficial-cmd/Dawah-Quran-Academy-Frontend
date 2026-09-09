import dynamic from "next/dynamic";

const MyClasses = dynamic(() => import("@/components/student/MyClasses"));

export default function MyClassesPage() {
  return <MyClasses />;
}
