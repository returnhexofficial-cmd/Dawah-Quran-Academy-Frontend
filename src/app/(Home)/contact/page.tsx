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
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
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
          }
        );
    } else {
      console.error("Form reference is null");
    }
  };

  return (
    <section>
      <Breadcrumbs title="যোগাযোগ" />
      <section className="pt-24 container mx-auto">
        <section className="flex flex-col md:flex-row justify-center items-center gap-5 lg:gap-10 px-8 md:px-0">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-60 md:w-auto basis-1/3 p-5 lg:p-8 rounded-3xl bg-primary hover:bg-dark text-white z-20 group duration-100"
          >
            <section className="absolute inset-0 -z-20">
              <div className="w-full h-full bg-black/20 rounded-3xl"></div>
              <Image
                src={bg}
                alt="Mail"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-3xl"
              />
            </section>
            <div className="rounded-full p-4 border border-white w-fit mx-auto">
              <AiOutlineMail className="size-4 sm:size-6 lg:size-8" />
            </div>
            <h4 className="text-center font-semibold text-lg lg:text-2xl my-5">
              মেইল
            </h4>
            <article className="text-center text-sm md:text-base text-white">
              quranacademybd1@gmail.com
            </article>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-60 md:w-auto basis-1/3 p-5 lg:p-8 rounded-3xl bg-primary hover:bg-dark text-white z-20 group duration-100"
          >
            <section className="absolute inset-0 -z-20">
              <div className="w-full h-full bg-black/20 rounded-3xl"></div>
              <Image
                src={bg}
                alt="Phone"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-3xl"
              />
            </section>
            <div className="rounded-full p-4 border border-white w-fit mx-auto">
              <BsTelephone className="size-4 sm:size-6 lg:size-8" />
            </div>
            <h4 className="text-center font-semibold text-lg lg:text-2xl my-5">
              নাম্বার
            </h4>
            <article className="text-center text-sm md:text-base text-white">
              +880 1775-060181
            </article>
          </motion.div>
        </section>
        {/* Bottom Section --- Send Mail */}
        <section className="mt-20 pb-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                আমাদের সাথে যোগাযোগ করুন
              </h2>
              <p className="text-gray-600 leading-relaxed">
                আপনার যেকোনো প্রশ্ন, মতামত বা পরামর্শ জানাতে আমাদের মেসেজ করুন।
                আমরা সর্বদা আপনার সেবায় নিয়োজিত।
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <FaRegClock className="w-5 h-5 text-emerald-600" />
                <span>প্রতিদিন যেকোন সময়</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FaMapMarkerAlt className="w-5 h-5 text-emerald-600" />
                <span>বাংলাদেশ</span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-100"></div>

            <div className="flex gap-6">
              <div className="bg-emerald-50 p-4 rounded-full">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">24/7</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  অনলাইন সাপোর্ট
                </h3>
                <p className="text-gray-600">
                  যেকোনো সময় আমাদের সাথে যোগাযোগ করুন
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-center text-4xl mb-4">যোগাযোগ করুন!</h2>
            <p className="text-center">
              আপনার গুরুত্বপূর্ন মতামত জানিয়ে সাহায্য করুন
            </p>
            <div className="bg-lightDark p-10 rounded-lg w-fit mx-auto">
              {/* Mail Form  */}
              <div className="max-w-xl mx-auto text-center">
                <form ref={form} onSubmit={sendEmail}>
                  <input
                    className="w-full px-6 py-[18px] border outline-none focus:border-primary mb-5"
                    type="text"
                    name="from_name"
                    placeholder="নাম লিখুন"
                    required
                  />

                  <input
                    className="w-full px-6 py-[18px] border outline-none focus:border-primary mb-5"
                    type="email"
                    name="from_email"
                    placeholder="আপনার ইমেইল"
                    required
                  />

                  <textarea
                    className="w-full px-6 py-[18px] border outline-none focus:border-primary mb-5"
                    name="message"
                    placeholder="আপনার মেসেজ লিখুন"
                  ></textarea>
                  <Button2 text="ম্যাসেজ পাঠান" />
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Contact;
