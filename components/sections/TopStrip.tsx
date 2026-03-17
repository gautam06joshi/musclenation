"use client"

import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export default function TopStrip() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`
        hidden md:block w-full 
        bg-gradient-to-r from-[#cfc11c] via-[#e6d94a] to-[#cfc11c]
        text-black 
        border-b border-black/10
        transition-all duration-500
        ${hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">

        {/* LEFT */}
        <div className="flex items-center gap-6">

          <span className="flex items-center gap-2 hover:opacity-70 transition">
            <Phone size={14} />
            +91 70145 10894
          </span>

          <span className="flex items-center gap-2 hover:opacity-70 transition">
            <Mail size={14} />
            support@musclenation.com
          </span>

          {/* TIMING */}
          <span className="flex items-center gap-2 hover:opacity-70 transition">
            <Clock size={14} />
            Mon–Fri: 5AM – 10PM
          </span>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          <span className="flex items-center gap-2 hover:opacity-70 transition">
            <MapPin size={14} />
            Jaipur, India
          </span>


        </div>

      </div>
    </div>
  )
}