"use client";

import { useSiteConfig } from "@/app/providers/SiteConfigContext";
import useAxios from "@/hooks/useAxios";
import { TSiteConfig } from "@/types/siteConfig.type";
import DashboardTitle from "@/utils/DashboardTitle";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { BsFacebook, BsTelephone, BsWhatsapp } from "react-icons/bs";
import { MdError, MdOutlineHowToReg, MdSave } from "react-icons/md";
import { toast } from "react-toastify";

type TField = {
  name: keyof TSiteConfig;
  label: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "text" | "url";
};

const fields: TField[] = [
  {
    name: "email",
    label: "ইমেইল",
    placeholder: "academy@example.com",
    icon: AiOutlineMail,
    type: "text",
  },
  {
    name: "phone",
    label: "ফোন",
    placeholder: "+8801852-955611",
    icon: BsTelephone,
    type: "text",
  },
  {
    name: "facebookLink",
    label: "ফেসবুক লিংক",
    placeholder: "https://www.facebook.com/...",
    icon: BsFacebook,
    type: "url",
  },
  {
    name: "whatsappLink",
    label: "হোয়াটসঅ্যাপ লিংক",
    placeholder: "https://wa.me/8801852955611",
    icon: BsWhatsapp,
    type: "url",
  },
  {
    name: "admissionLink",
    label: "ভর্তি ফর্মের লিংক",
    placeholder: "https://docs.google.com/forms/...",
    icon: MdOutlineHowToReg,
    type: "url",
  },
];

export default function SiteConfigForm() {
  const axiosSecure = useAxios();
  const { siteConfig, siteConfigLoading, setSiteConfigCache } = useSiteConfig();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TSiteConfig>({ defaultValues: siteConfig });

  // The provider resolves its values asynchronously, so seed the inputs once
  // the real config arrives — but never clobber edits already in progress.
  useEffect(() => {
    if (!siteConfigLoading && !isDirty) {
      reset(siteConfig);
    }
  }, [siteConfig, siteConfigLoading, isDirty, reset]);

  const onSubmit: SubmitHandler<TSiteConfig> = (formData) => {
    setIsSaving(true);
    axiosSecure
      .put("/site-config", formData)
      .then(({ data }) => {
        // Push straight into state + localStorage so the navbar and footer
        // update without a reload.
        setSiteConfigCache(data.data);
        reset(data.data);
        toast.success(data.message || "Site config updated successfully");
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to update site config",
        );
      })
      .finally(() => setIsSaving(false));
  };

  return (
    <section className="mt-10 bg-white p-5 md:p-6 shadow-lg shadow-gray-300 rounded-lg">
      <DashboardTitle blackText="Site" greenText="Configuration" />
      <p className="mt-2 text-sm text-gray-500">
        এই তথ্যগুলো ওয়েবসাইটের নেভবার, ফুটার ও যোগাযোগ পেজে দেখানো হয়।
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {fields.map(({ name, label, placeholder, icon: Icon, type }) => (
          <div
            key={name}
            className={name === "admissionLink" ? "md:col-span-2" : ""}
          >
            <label
              htmlFor={name}
              className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <Icon className="text-primary" />
              {label}
            </label>

            <input
              id={name}
              type="text"
              placeholder={placeholder}
              disabled={siteConfigLoading}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:border-primary disabled:bg-gray-50 ${
                errors[name] ? "border-red-500" : "border-gray-300"
              }`}
              {...register(name, {
                required: `${label} আবশ্যক`,
                validate: (value) => {
                  if (type !== "url") return true;
                  return /^https?:\/\/.+/.test(value.trim())
                    ? true
                    : "লিংকটি http:// বা https:// দিয়ে শুরু হতে হবে";
                },
              })}
            />

            {errors[name] && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <MdError /> {errors[name]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSaving || siteConfigLoading}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <MdSave className="text-lg" />
            {isSaving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
          </button>
        </div>
      </form>
    </section>
  );
}
