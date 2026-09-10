"use client";

import Breadcrumbs from "@/utils/Breadcrumb";
import EmptyState from "@/utils/EmptyState";
import GetInTouch from "@/utils/GetInTouch";
import LoadingSpinner from "@/utils/LoadingSpinner";
import SectionHeading from "@/utils/SectionHeading";
import useBooks from "@/hooks/useBooks";
import { TBook } from "@/types/books.type";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

import BookPlaceholder from "@/assets/book-cover-placeholder.png";

import { FaBookOpen, FaArrowRight, FaUserEdit } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const Books = () => {
  const { booksData, booksLoading } = useBooks();

  const hasBooks = booksData.data && booksData.data.length > 0;

  return (
    <section>
      <Breadcrumbs
        title="বইসমূহ"
        heading="ইসলামী বইয়ের সংগ্রহ"
        description="কুরআন, তাজবীদ ও ইসলামী জ্ঞানের নির্বাচিত বইসমূহ বিনামূল্যে পড়ুন।"
      />

      <section className="section-y bg-gray-50">
        <div className="site-container">
          <SectionHeading
            eyebrow="আমাদের সংগ্রহ"
            title="আমাদের"
            accent="বইসমূহ"
            description="কুরআন, তাজবীদ ও ইসলামী জ্ঞান অর্জনের জন্য আমাদের নির্বাচিত বইসমূহ সংগ্রহ করুন।"
          />

          {booksLoading ? (
            <LoadingSpinner panel label="বইসমূহ লোড হচ্ছে..." />
          ) : hasBooks ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {booksData.data?.map((book: TBook, index: number) => (
                <div
                  key={book._id}
                  style={{ "--delay": `${index * 60}ms` } as CSSProperties}
                  className="fade-up card-surface card-hover group flex flex-col"
                >
                  <div className="relative flex h-96 items-center justify-center overflow-hidden">
                    <Image
                      src={book.cover || BookPlaceholder}
                      alt={book.title}
                      width={300}
                      height={450}
                      className="media-zoom w-[50%] object-cover"
                    />

                    <div className="card-badge left-4 top-4 bg-primary text-white">
                      <HiOutlineBadgeCheck className="text-base" />
                      <span>বিনামূল্যে</span>
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="flex items-start gap-2 text-xl font-bold text-primary leading-8 line-clamp-2">
                      <FaBookOpen className="mt-1 shrink-0 text-accent" />
                      {book.title}
                    </h3>

                    <p className="mt-3 flex items-center gap-2 font-medium text-primary">
                      <FaUserEdit />
                      <span>লেখক: {book.author || "অজানা"}</span>
                    </p>

                    <p className="mt-4 text-sm text-gray-600 leading-7 line-clamp-3">
                      {book.description ||
                        "এই বইটির কোনো বিবরণ পাওয়া যায়নি।"}
                    </p>

                    <div className="flex-grow" />

                    <Link
                      href={book.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary mt-6 w-full"
                    >
                      <FaBookOpen />
                      <span>পিডিএফ পড়ুন</span>
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FaBookOpen}
              title="কোনো বই পাওয়া যায়নি"
              description="এই মুহূর্তে আমাদের সংগ্রহে কোনো বই যুক্ত নেই। অনুগ্রহ করে পরে আবার চেক করুন, নতুন বই শীঘ্রই যুক্ত করা হবে।"
            />
          )}
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default Books;