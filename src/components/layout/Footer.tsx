"use client";
import logo from "@/assets/logo.jpg";
import mckp from "@/assets/sec-botm-mckp.png";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="relative bg-darker text-light lg:mt-40">
      <Image
        className="hidden lg:block md:absolute -top-[142px] right-0"
        src={mckp}
        alt="Bottom mockup"
      />

      {/* Top Section */}
      <section className="container mx-auto flex flex-col lg:flex-row justify-between gap-5 py-5">
        {/* Logo */}
        <section className="flex items-center gap-5">
          <Image
            className="w-12 md:w-16 h-12 md:h-16 rounded"
            src={logo}
            alt="Logo"
          />
          <div>
            <p className="font-bold lg:text-xl lg:mb-1 text-white">
              Online Quran Academy
            </p>
            <p className="text-sm lg:text-base">
              Learn Quran ONLINE At Your Home
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="flex lg:justify-center items-center gap-3 md:gap-5">
          <Link
            className="text-sm md:text-base hover:underline"
            href="/courses"
          >
            Courses
          </Link>
          <Link className="text-sm md:text-base hover:underline" href="/books">
            Books
          </Link>
          <Link
            className="text-sm md:text-base hover:underline"
            href="/teachers"
          >
            Teachers
          </Link>
          <Link
            className="text-sm md:text-base hover:underline"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-sm md:text-base hover:underline"
            href="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
            target="_blank"
          >
            Admission
          </Link>
        </section>

        {/* Social */}
        <section className="flex items-center gap-5">
          <Link
            href="https://www.facebook.com/onlinequranacademy24"
            target="_blank"
          >
            <BsFacebook className="cursor-pointer size-6 lg:size-8" />
          </Link>
          <BsWhatsapp className="cursor-pointer size-6 lg:size-8" />
        </section>
      </section>

      {/* Bottom Section */}
      <section className="border-t border-light/20 py-2 flex items-center font-serif">
        <div className="container">
          <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg">
            © {new Date().getFullYear()} . All Rights Reserved. Built by{" "}
            <Link
              href="https://www.returnhex.com/"
              target="_blank"
              className="text-blue-500 cursor-pointer"
            >
              Return Hex
            </Link>
          </p>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
