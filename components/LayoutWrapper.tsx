"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar";
import TopStrip from "@/components/sections/TopStrip";
import Footer from "@/components/footer";
import GymChatbot from "@/components/sections/GymChatbot";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🔥 detect admin route
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* ❌ Hide on admin pages */}
      {!isAdmin && <TopStrip />}
      {!isAdmin && <Navbar />}

      {children}

      {/* ❌ Hide on admin pages */}
      {!isAdmin && <Footer />}
      {!isAdmin && <GymChatbot />}
    </>
  );
}