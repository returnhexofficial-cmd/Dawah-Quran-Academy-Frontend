"use client";

import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useBooks from "@/hooks/useBooks";
import { TBook } from "@/types/books.type";
import Image from "next/image";
import Link from "next/link";
import BookPlaceholder from "@/assets/book-cover-placeholder.png";

const Books = () => {
  const { booksData } = useBooks();
  return (
    <section>
      <Breadcrumbs title="বইসমূহ" />
      {/* আমাদের বইসমূহ */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-darker mb-12">
            আমাদের <span className="text-emerald-600">বইসমূহ</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {booksData.data &&
              booksData.data.map((book: TBook) => (
                <section
                  key={book._id}
                  className="w-52 md:w-60 lg:w-72 mx-auto"
                >
                  <Link
                    href={book?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative  aspect-[2/3] mx-auto">
                      <Image
                        src={book?.cover || BookPlaceholder}
                        alt={book?.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </Link>

                  <div className="p-2">
                    <p className="text-md md:text-lg xl:text-xl font-semibold">
                    {book?.title}
                  </p>
                  <p className="italic text-sm md:text-base text-gray-600">
                    - {book?.author || "Unknown Author"}
                  </p>
                  <p className="text-xs md:text-sm  text-gray-500 mt-2">
                    {book?.description || "No Description"}
                  </p>
                  </div>
                </section>
              ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default Books;
