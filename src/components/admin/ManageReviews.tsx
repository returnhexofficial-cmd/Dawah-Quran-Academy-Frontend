"use client";

import ReviewBox from "@/app/(admin)/admin/manage-reviews/ReviewBox";
import useReviews from "@/hooks/useReviews";
import { TReview } from "@/types/review.type";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";

const ManageReviews = () => {
  const { reviewsData, reviewsRefetch, reviewsLoading } = useReviews();
  if (reviewsLoading) return <LoadingSpinner />;
  return (
    <section className="mx-auto overflow-y-hidden">
      <DashboardTitle
        blackText="Manage"
        greenText="Reviews"
        className="mt-10"
      />
      <div className="my-5 space-y-5">
        {reviewsData.data &&
          reviewsData.data.map((review: TReview) => (
            <ReviewBox
              key={review?._id}
              review={review}
              refetch={reviewsRefetch}
            />
          ))}
      </div>
    </section>
  );
};

export default ManageReviews;
