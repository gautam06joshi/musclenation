"use client"

import { usePathname } from "next/navigation"
import { Dumbbell, Home, Info, Image, CreditCard, Users } from "lucide-react"
import { ExpandableTabs, TabItem } from "@/components/ui/expandable-tabs"
import MobileMenu from "@/components/mobile-menu"
import { useEffect, useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const tabs: TabItem[] = [
    { title: "Home", icon: Home, href: "/" },
    { title: "About", icon: Info, href: "/about" },
    { title: "Programs", icon: Dumbbell, href: "/programs" },

    { type: "separator" },

    { title: "Gallery", icon: Image, href: "/gallery" },
    { title: "Membership", icon: CreditCard, href: "/membership" },
    { title: "Trainers", icon: Users, href: "/trainers" },
  ]

  const activeIndex = tabs.findIndex((tab: any) => tab.href === pathname)

  return (
    <header
      className={`fixed left-0 w-full h-16 text-white z-50 transition-all duration-500
      ${scrolled ? "top-0 bg-black/95 backdrop-blur-md shadow-lg" : "top-[40px] bg-black"}`}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-yellow-500">
          MuscleNation
        </h1>

        {/* CENTER */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <ExpandableTabs tabs={tabs} activeIndex={activeIndex} />
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm text-gray-300">
            +91 70145 10894
          </span>

          <button className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-lg text-sm font-semibold">
            Join Now
          </button>
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

      </div>
    </header>
  )
}