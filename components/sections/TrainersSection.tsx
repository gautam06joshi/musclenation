"use client"

import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel"

export default function TrainersSection() {
  return (
    <section className="bg-black text-white py-32 relative overflow-hidden">

      {/* BACKGROUND TEXT (PREMIUM TOUCH) */}
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none">
        <h1 className="text-[120px] font-bold text-white/5 tracking-widest">
          TRAINERS
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADING */}
        <div className="mb-24">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Meet Our <span className="text-yellow-500">Professionals</span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-xl">
            Elite coaches dedicated to transforming your strength, physique,
            and performance through precision training and discipline.
          </p>
        </div>

        {/* CAROUSEL */}
        <TestimonialCarousel />

      </div>
    </section>
  )
}