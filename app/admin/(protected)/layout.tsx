"use client";

import { Sidebar } from "@/components/ui/modern-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="
      flex min-h-screen 
      bg-white dark:bg-slate-950 
      text-slate-900 dark:text-white
      transition-colors duration-300
    ">
      <Sidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}