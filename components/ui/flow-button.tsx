"use client"

import { ArrowRight } from "lucide-react"

export function FlowButton({ text = "Button" }: { text?: string }) {
  return (
    <div className="w-full flex justify-center">
      <button className="group relative flex items-center justify-center overflow-hidden rounded-full border border-white/20 px-10 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-500 hover:text-black hover:border-transparent">

        {/* LEFT ARROW */}
        <ArrowRight className="absolute left-5 w-4 h-4 -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

        {/* TEXT */}
        <span className="relative z-10 transition-all duration-500 group-hover:translate-x-2">
          {text}
        </span>

        {/* EXPAND BACKGROUND */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-2 h-2 bg-yellow-400 rounded-full scale-0 group-hover:scale-[20] transition-all duration-500 ease-out"></span>
        </span>

        {/* RIGHT ARROW */}
        <ArrowRight className="absolute right-5 w-4 h-4 transition-all duration-500 group-hover:translate-x-10 group-hover:opacity-0" />

      </button>
    </div>
  )
}