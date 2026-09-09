import LoadingSpinner from "@/utils/LoadingSpinner";

export default function Loading() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner className="py-0" />
    </section>
  );
}
