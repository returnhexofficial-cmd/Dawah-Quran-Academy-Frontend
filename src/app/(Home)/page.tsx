"use client";

import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StudentStatus from "@/components/home/StudentStatus";
import AdmissionProcess from "@/components/home/AdmissionProcess";
import Testimonial from "@/components/home/Testimonial";
import GetInTouch from "@/utils/GetInTouch";
import FeatureCourses from "@/components/home/FeatureCourses";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FeatureCourses />
      <StudentStatus />
      <AdmissionProcess />
      <Testimonial />
      <GetInTouch />
    </>
  );
}
