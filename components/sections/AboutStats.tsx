"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "500+", label: "Active Members" },
  { value: "10+", label: "Professional Trainers" },
  { value: "4.8", label: "Average Rating" },
  { value: "8+", label: "Years Experience" },
]

export default function AboutStats() {
  return (
    <section className="relative w-full py-40 overflow-hidden">

      {/* ✅ TRUE FIXED BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/abouthero3.webp')",
        }}
      />

      {/* SOFT OVERLAY ONLY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-20 text-center">

          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="group"
            >

              {/* NUMBER */}
              <h3 className="text-5xl md:text-6xl font-bold text-white">
                {stat.value}
              </h3>

              {/* LINE */}
              <div className="w-10 h-[1px] bg-white/30 mx-auto my-4 group-hover:w-16 transition-all duration-500" />

              {/* LABEL */}
              <p className="text-gray-300 uppercase tracking-[3px] text-xs">
                {stat.label}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}