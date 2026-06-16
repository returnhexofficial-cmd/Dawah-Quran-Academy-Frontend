import { FaGlobe, FaHome } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import breadcrumb from "@/assets/quran.jpg";

type TBreadcrumbs = {
  title: string;
};

const Breadcrumbs = ({ title }: TBreadcrumbs) => {
  return (
    <div className="relative pt-24 sm:pt-32 md:pt-36 lg:pt-48 pb-8 md:pb-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={breadcrumb}
          alt="Breadcrumb Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-from-t bg-gradient-to-b from-primary/80  to-dark/20"></div>

      {/* Additional gradient for better depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Top section */}
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            আপনার কুরআন শিক্ষার যাত্রা শুরু করুন
          </h1>
          <p className="text-base md:text-lg lg:text-2xl text-white/90 mb-8 drop-shadow-md">
            আমাদের অভিজ্ঞ শিক্ষকদের সাথে অনলাইনে কুরআন শিখুন
          </p>
        </div>

        {/* Bottom section */}
        <div className="w-fit relative top-0 left-12 md:left-24 lg:left-40 xl:left-64 duration-300 flex flex-col justify-end">
          <h1 className="font-semibold text-white text-lg md:text-xl lg:text-2xl leading-snug uppercase drop-shadow-lg mb-2">
            {title}
          </h1>
          <div className="text-white uppercase flex items-center gap-2 text-sm md:text-base drop-shadow-md">
            <Link
              className="flex items-center gap-2 mr-2 text-xs hover:text-white/80 transition-colors duration-200"
              href="/"
            >
              <FaHome className="size-3" />
              হোম
            </Link>
            <FaGlobe className="size-3 ml-3" />
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
