"use client";

import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useBooks from "@/hooks/useBooks";
import { TBook } from "@/types/books.type";

import Image from "next/image";
import Link from "next/link";

import BookPlaceholder from "@/assets/book-cover-placeholder.png";
import CourseImg from "@/assets/course/image-cours1.jpeg";

import { FaBookOpen, FaArrowRight, FaUserEdit } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const Books = () => {
  const { booksData } = useBooks();

  return (
    <section>
      <Breadcrumbs title="বইসমূহ" />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#374868]">
              আমাদের <span className="text-[#ffd54f]">বইসমূহ</span>
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-8">
              কুরআন, তাজবীদ ও ইসলামী জ্ঞান অর্জনের জন্য আমাদের নির্বাচিত বইসমূহ
              সংগ্রহ করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl duration-300">
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={CourseImg}
                  alt="Book"
                  fill
                  className="object-cover group-hover:scale-105 duration-500"
                />

                <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#374868] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                  <HiOutlineBadgeCheck className="text-base" />

                  <span>বিনামূল্যে</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="flex items-start gap-2 text-xl font-bold text-darker leading-8">
                  <FaBookOpen className="text-[#374868] mt-1 shrink-0" />
                  সহজে কুরআন শিক্ষা
                </h3>

                <p className="mt-3 flex items-center gap-2 text-[#374868] font-medium">
                  <FaUserEdit />

                  <span>লেখক: মাওলানা আব্দুল করিম</span>
                </p>

                <p className="mt-4 text-gray-600 leading-7 text-sm">
                  কুরআন তিলাওয়াত, তাজবীদ ও সহীহ উচ্চারণ শেখার জন্য সহজ ভাষায়
                  রচিত একটি পূর্ণাঙ্গ বই। নতুন ও পুরাতন সকল শিক্ষার্থীর জন্য এটি
                  অত্যন্ত উপযোগী।
                </p>

                <Link
                  href="#"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#374868] py-3 font-semibold text-white transition hover:bg-[#ffd54f] duration-300 ease-in-out "
                >
                  <FaBookOpen />

                  <span>পিডিএফ পড়ুন</span>

                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* ================= DYNAMIC CARD ================= */}

            {/*
            {booksData.data?.map((book: TBook) => (
              <div
                key={book._id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl duration-300"
              >
                <div className="relative h-96 overflow-hidden">

                  <Image
                    src={book.cover || BookPlaceholder}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 duration-500"
                  />

                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">

                    <HiOutlineBadgeCheck className="text-base" />

                    <span>বিনামূল্যে</span>

                  </div>

                </div>

                <div className="p-6">

                  <h3 className="flex items-start gap-2 text-xl font-bold text-darker leading-8 line-clamp-2">

                    <FaBookOpen className="text-primary mt-1 shrink-0" />

                    {book.title}

                  </h3>

                  <p className="mt-3 flex items-center gap-2 text-primary font-medium">

                    <FaUserEdit />

                    <span>
                      লেখক: {book.author || "অজানা"}
                    </span>

                  </p>

                  <p className="mt-4 text-gray-600 leading-7 text-sm line-clamp-3">

                    {book.description ||
                      "এই বইটির কোনো বিবরণ পাওয়া যায়নি।"}

                  </p>

                  <Link
                    href={book.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-dark"
                  >

                    <FaBookOpen />

                    <span>পিডিএফ পড়ুন</span>

                    <FaArrowRight />

                  </Link>

                </div>
              </div>
            ))}
            */}
          </div>
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default Books;
