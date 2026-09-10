"use client";
import Breadcrumbs from "@/utils/Breadcrumb";
import SectionHeading from "@/utils/SectionHeading";
import Image from "next/image";
import { CSSProperties, FormEvent } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Swal from "sweetalert2";

import bgImg from "@/assets/course/bg-image1.png";
import locationPinAnimation from "@/assets/contact/RedPinOnMap.json";
import ContactImg from "@/assets/contact/contact-img.png";
import Lottie from "lottie-react";
import useSendMailContact from "@/hooks/useContact";
import { useSiteConfig } from "@/app/providers/SiteConfigContext";
import { toMailtoHref, toTelHref } from "@/types/siteConfig.type";

const buildContactChannels = (email: string, phone: string) => [
  {
    icon: AiOutlineMail,
    label: "মেইল",
    value: email,
    href: toMailtoHref(email),
  },
  {
    icon: BsTelephone,
    label: "ফোন",
    value: phone,
    href: toTelHref(phone),
  },
];

const Contact = () => {
  const { sendMail, mailSending } = useSendMailContact();
  const { siteConfig } = useSiteConfig();
  const contactChannels = buildContactChannels(
    siteConfig.email,
    siteConfig.phone,
  );

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const mailData = {
      from_name: formData.get("from_name") as string,
      from_email: formData.get("from_email") as string,
      message: formData.get("message") as string,
    };

    sendMail(mailData, {
      onSuccess: (data) => {
        form.reset();

        Swal.fire({
          icon: "success",
          title: "Thank You",
          text: "আপনার মেসেজ সফলভাবে পাঠানো হয়েছে।",
        });
      },

      onError: (err: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: err?.response?.data?.message || "Server Error",
        });
      },
    });
  };

  return (
    <section>
      <Breadcrumbs
        title="যোগাযোগ"
        heading="আমাদের সাথে যোগাযোগ করুন"
        description="যেকোনো প্রশ্ন, মতামত বা পরামর্শ জানাতে আমাদের সাথে যোগাযোগ করুন।"
      />
      <section className="section-y relative">
        <div className=" absolute z-0 w-full h-full top-0 left-0 right-0">
          <Image src={bgImg} alt="bg-image" className="w-full h-full" />
        </div>
        <section className="site-container relative z-10">
          <SectionHeading
            eyebrow="যোগাযোগ"
            title="আমাদের সাথে"
            accent="কথা বলুন"
            description="মেইল বা ফোনে সরাসরি যোগাযোগ করুন, অথবা নিচের ফর্মে আপনার প্রশ্ন পাঠান।"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {contactChannels.map((channel, index) => (
              <a
                key={channel.label}
                href={channel.href}
                style={{ "--delay": `${index * 60}ms` } as CSSProperties}
                className="fade-up card-surface card-hover group flex items-center gap-5 p-6 lg:p-8"
              >
                <div className="w-fit shrink-0 rounded-full bg-accent p-4 transition-colors duration-300 group-hover:bg-primary lg:p-5">
                  <channel.icon className="size-6 text-primary transition-colors duration-300 group-hover:text-white lg:size-8" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-lg font-semibold text-primary lg:text-2xl">
                    {channel.label}
                  </h4>
                  <p className="truncate text-sm text-gray-600 lg:text-lg">
                    {channel.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="site-container pt-14 md:pt-16 lg:pt-20">
          <section className="relative z-10">
            <div className="card-surface fade-up flex flex-col md:flex-row">
              {/* Left: Heading + Form */}
              <div className="w-full md:w-1/2 p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
                  আপনার কি কোনো প্রশ্ন আছে?
                </h2>
                <p className="text-gray-600 mb-8">
                  আপনার যেকোনো প্রশ্ন, মতামত বা পরামর্শ জানাতে আমাদের মেসেজ
                  করুন। আমরা সর্বদা আপনার সেবায় নিয়োজিত।
                </p>

                <form onSubmit={sendEmail} className="space-y-4">
                  <input
                    className="field"
                    type="text"
                    name="from_name"
                    placeholder="নাম লিখুন"
                    required
                  />

                  <input
                    className="field"
                    type="email"
                    name="from_email"
                    placeholder="আপনার ইমেইল"
                    required
                  />

                  <textarea
                    className="field min-h-[140px]"
                    name="message"
                    placeholder="আপনার মেসেজ লিখুন"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={mailSending}
                    className="btn-primary"
                  >
                    {mailSending ? (
                      <>
                        <ImSpinner2 className="w-4 h-4 animate-spin" />
                        <span>পাঠানো হচ্ছে...</span>
                      </>
                    ) : (
                      "ম্যাসেজ পাঠান"
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <FaRegClock className="w-4 h-4 text-primary shrink-0" />
                    <span>প্রতিদিন যেকোন সময়</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <FaMapMarkerAlt className="w-4 h-4 text-primary shrink-0" />
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
      <section className="w-full">
        <div className="group relative h-[400px] lg:h-[600px]">
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
