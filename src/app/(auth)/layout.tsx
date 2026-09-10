import "@/app/globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../providers/AuthContext";
import QueryProvider from "../providers/QueryProvider";
import { SiteConfigProvider } from "../providers/SiteConfigContext";
export const metadata: Metadata = {
  title: "Dawah Quran Academy",
  description:
    "Learn Quran online with expert tutors, interactive lessons, and personalized guidance.",
  icons: {
    icon: "/logo1-removebg-preview.png",
    shortcut: "/logo1-removebg-preview.png",
    apple: "/logo1-removebg-preview.png",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SiteConfigProvider>
            <AuthProvider>
              {children}
              <ToastContainer />
            </AuthProvider>
          </SiteConfigProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
