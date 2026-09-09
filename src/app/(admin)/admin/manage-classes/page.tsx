import dynamic from "next/dynamic";

const ManageClasses = dynamic(() => import("@/components/admin/ManageClasses"));

export default function ManageClassesPage() {
  return <ManageClasses />;
}
