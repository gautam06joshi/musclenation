"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText,
  Search,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

interface SidebarProps {
  className?: string;
}

// ✅ Gym Navigation
const navigationItems: NavigationItem[] = [
  { id: "dashboard", name: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { id: "members", name: "Members", icon: User, href: "/admin/members" },
  { id: "add", name: "Add Member", icon: FileText, href: "/admin/add-member" },
  { id: "payments", name: "Payments", icon: BarChart3, href: "/admin/payments" },
];

export function Sidebar({ className = "" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Auto open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(true);
      else setIsOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full mt-20 
          bg-white dark:bg-slate-950 
          border-r border-slate-200 dark:border-slate-800
          z-40 transition-all duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-24" : "w-72"}
          md:translate-x-0 md:static
          ${className}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900">

          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">
                  Gym Admin
                </p>
                <p className="text-xs text-slate-500">
                  Management Panel
                </p>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold">G</span>
            </div>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={toggleCollapse}
              className="hidden md:flex p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>
        </div>

        {/* SEARCH */}
        {!isCollapsed && (
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-black dark:text-white"
              />
            </div>
          </div>
        )}

        {/* NAV */}
        <nav className="flex-1 px-3 py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition
                  ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* BOTTOM */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-3">

          {/* PROFILE */}
          {!isCollapsed && (
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                JD
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  Admin
                </p>
                <p className="text-xs text-slate-500">Online</p>
              </div>
            </div>
          )}

          {/* LOGOUT */}
          <button
            onClick={async () => {
              await signOut(auth);
              document.cookie =
                "firebaseAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 w-full p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-md"
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}