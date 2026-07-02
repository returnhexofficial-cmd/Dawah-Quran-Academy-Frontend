"use client";
import bg from "@/assets/topography.svg";
import Breadcrumbs from "@/utils/Breadcrumb";
import { Button2 } from "@/utils/Button";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useRef } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import Swal from "sweetalert2";

import bgImg from "@/assets/course/bg-image1.png";
import locationPinAnimation from "@/assets/contact/RedPinOnMap.json";
import ContactImg from "@/assets/contact/contact-img.png";
import Lottie from "lottie-react";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        )
        .then(
          (result) => {
            if (form.current) form.current.reset();
            if (result.status == 200) {
              Swal.fire({
                title: "Thank You for Reaching Out!",
                showClass: { popup: "animate__animated animate__fadeInDown" },
                hideClass: { popup: "animate__animated animate__fadeOutUp" },
              });
            }
          },
          (error) => {
            console.log(error.text);
          },
        );
    } else {
      console.error("Form reference is null");
    }
  };

  return (
    <section>
      <Breadcrumbs title="যোগাযোগ" />
      <section className="pt-24 relative ">
        <div className=" absolute z-0 w-full h-full top-0 left-0 right-0">
          <Image src={bgImg} alt="bg-image" className="w-full h-full" />
        </div>
        <section className="container1 ">
          <section className="flex w-full flex-col md:flex-row justify-between 2xl:justify-center items-center gap-5 lg:gap-10  md:px-0">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-full md:w-[48%] lg:w-full flex justify-between gap-5 2xl:gap-10 items-center  2xl:basis-1/3 p-5 lg:p-8 rounded-lg 2xl:rounded-3xl bg-[#F0F0F0] group"
            >
              <div className="rounded-full p-4 2xl:p-6 border group-hover:bg-[#374868] duration-300 bg-[#ffd54f] w-fit">
                <AiOutlineMail className=" group-hover:text-white duration-300 size-6 lg:size-8" />
              </div>
              <div className=" w-full flex flex-col lg:gap-5">
                <h4 className="text-left text-[#374868] text-2xl font-semibold md:text-lg lg:text-4xl">
                  মেইল
                </h4>
                <article className="text-left  text-[16px] md:text-[14px] lg:text-lg text-[#374868]">
                  quranacademybd1@gmail.com
                </article>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-full md:w-[48%] lg:w-full flex justify-between gap-5 2xl:gap-10 items-center   2xl:basis-1/3 p-5 lg:p-8 rounded-lg 2xl:rounded-3xl bg-[#F0F0F0] group"
            >
              <div className="rounded-full p-4 2xl:p-6 border group-hover:bg-[#374868] duration-300 bg-[#ffd54f] w-fit">
                <BsTelephone className="size-6 group-hover:text-white duration-300 sm:size-6 lg:size-8" />
              </div>
              <div className=" w-full flex flex-col lg:gap-5">
                <h4 className="text-left text-[#374868] text-2xl font-semibold md:text-lg lg:text-4xl ">
                  ফোন
                </h4>
                <article className="text-left  text-[16px] md:text-[14px] lg:text-lg text-[#374868]">
                  +880 1775-060181
                </article>
              </div>
            </motion.div>
          </section>
        </section>

        <section className="container1 pt-16 md:pt-20 pb-20 ">
          <section className="relative z-10 ">
            <div className="rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row bg-white">
              {/* Left: Heading + Form */}
              <div className="w-full md:w-1/2 p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#374868] mb-3">
                  আপনার কি কোনো প্রশ্ন আছে?
                </h2>
                <p className="text-gray-600 mb-8">
                  আপনার যেকোনো প্রশ্ন, মতামত বা পরামর্শ জানাতে আমাদের মেসেজ
                  করুন। আমরা সর্বদা আপনার সেবায় নিয়োজিত।
                </p>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <input
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-md outline-none focus:border-[#374868] text-sm"
                    type="text"
                    name="from_name"
                    placeholder="নাম লিখুন"
                    required
                  />

                  <input
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-md outline-none focus:border-[#374868] text-sm"
                    type="email"
                    name="from_email"
                    placeholder="আপনার ইমেইল"
                    required
                  />

                  <textarea
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-md outline-none focus:border-[#374868] text-sm min-h-[140px]"
                    name="message"
                    placeholder="আপনার মেসেজ লিখুন"
                  ></textarea>

                  <button
                    type="submit"
                    className="bg-[#374868] text-white py-3.5 px-5 rounded-md hover:bg-[#2c3a5a] transition-colors duration-300"
                  >
                    ম্যাসেজ পাঠান
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <FaRegClock className="w-4 h-4 text-[#374868] shrink-0" />
                    <span>প্রতিদিন যেকোন সময়</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <FaMapMarkerAlt className="w-4 h-4 text-[#374868] shrink-0" />
                    <span>বাংলাদেশ</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 relative min-h-[320px] md:min-h-full">
                <Image
                  src={ContactImg}
                  alt="Contact"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
            </div>
          </section>
        </section>
      </section>
      <section className=" w-full 2xl:pb-52">
        <div className=" relative group h-[400px]  lg:h-[600px]">
          <iframe
            className=" w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17818.581020431502!2d90.4036352!3d23.77615155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c73f6374f5fb%3A0xed9e75e268249a6b!2sWorkshop%20Bus%20Stop!5e1!3m2!1sen!2sbd!4v1782914299274!5m2!1sen!2sbd"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-24 h-24 md:w-32 md:h-32">
            <Lottie
              animationData={locationPinAnimation}
              loop={true}
              autoplay={true}
              className=" group-hover:opacity-0 transition-opacity duration-300"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
