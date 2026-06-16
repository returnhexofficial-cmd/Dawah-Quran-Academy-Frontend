import aus from "@/assets/flags/aus-flag.webp";
import bd from "@/assets/flags/bd-flag.webp";
import can from "@/assets/flags/can-flag.webp";
import usa from "@/assets/flags/usa-flag.webp";
import Image from "next/image";
import { FaHandFist } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";

const StudentStatus = () => {
  return (
    <section className="container mx-auto my-20 lg:my-32">
      <section className="max-w-4xl mx-auto relative bg-primary py-10 px-5 rounded-xl shadow-lg">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side Content */}
          <div className="text-white px-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              আলহামদুলিল্লাহ!
            </h2>
            <p className="text-sm md:text-base mb-6">
              আমরা দীর্ঘদিন ধরে আমেরিকা, কানাডা, অস্ট্রেলিয়া এবং বাংলাদেশে
              বসবাসকারী বাংলাভাষীদের কুরআন শিক্ষা দিয়ে আসছি।
            </p>
            <div className="flex  items-center gap-5">
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={bd}
                alt="Bangladesh"
              />
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={usa}
                alt="America"
              />
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={can}
                alt="Canada"
              />
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={aus}
                alt="Australia"
              />
            </div>
          </div>

          {/* Right Side Content */}
          <div className="grid grid-rows-2 items-center gap-6">
            <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-md">
              <div className="bg-yellow-400 p-3 rounded-md text-2xl font-bold leading-tight">
                <FaHandFist />
              </div>
              <div>
                <h3 className="text-lg font-semibold">শিক্ষার্থীদের আস্থা</h3>
                <p className="text-sm text-gray-600">
                  আমাদের একাডেমি শিক্ষার্থীদের গ্রহণযোগ্যতা ও কুরআন শিক্ষার
                  মানের জন্য নির্ভরযোগ্য।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-md">
              <div className="bg-primary text-white p-3 rounded-md text-2xl font-bold">
                <PiStudentFill />
              </div>
              <div>
                <h3 className="text-lg font-semibold">সফল সমাপ্তি</h3>
                <p className="text-sm text-gray-600">
                  আমাদের একাডেমি থেকে সফলভাবে কুরআন শিক্ষাগ্রহণ সম্পন্ন করেছে
                  বহু প্রতিভাবান শিক্ষার্থী।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default StudentStatus;
