"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Linkedin, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Trainer {
  name: string
  role: string
  description: string
  imageUrl: string
  instagramUrl?: string
  linkedinUrl?: string
}

const trainers: Trainer[] = [
  {
    name: "Chris Bumstead",
    role: "Strength Coach",
    description:
      "Specializes in progressive overload and elite strength systems. Helping athletes unlock peak performance with science-backed training.",
    imageUrl: "/trainer1.jpg",
    instagramUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Arnold Schwarzenegger",
    role: "Bodybuilding Expert",
    description:
      "Focused on hypertrophy, symmetry, and aesthetic transformations. Builds physiques that stand out.",
    imageUrl: "/trainer2.jpg",
    instagramUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "David Laid",
    role: "CrossFit Trainer",
    description:
      "High-intensity training expert focused on endurance, agility, and explosive strength development.",
    imageUrl: "/trainer3.jpg",
    instagramUrl: "#",
    linkedinUrl: "#",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % trainers.length)
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + trainers.length) % trainers.length)

  const current = trainers[currentIndex]

  return (
    <div className="w-full max-w-6xl mx-auto">

      {/* DESKTOP */}
      <div className="hidden md:flex items-center relative">

        {/* IMAGE */}
        <div className="w-[480px] h-[520px] rounded-3xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.name}
                width={480}
                height={520}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* CARD */}
        <div className="ml-[-80px] z-10 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white">
                {current.name}
              </h2>

              <p className="text-yellow-500 mt-1 text-sm font-medium">
                {current.role}
              </p>

              <p className="text-gray-400 mt-6 leading-relaxed">
                {current.description}
              </p>

              {/* SOCIAL */}
              <div className="flex gap-4 mt-8">
                {[Instagram, Linkedin].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
                  >
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden text-center">
        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6">
          <Image
            src={current.imageUrl}
            alt={current.name}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-xl font-bold">{current.name}</h2>
        <p className="text-yellow-500 text-sm">{current.role}</p>
        <p className="text-gray-400 mt-4 text-sm">{current.description}</p>
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-center items-center gap-6 mt-10">

        <button
          onClick={prev}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
        >
          <ChevronLeft />
        </button>

        <div className="flex gap-2">
          {trainers.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2.5 h-2.5 rounded-full",
                i === currentIndex ? "bg-yellow-500" : "bg-gray-600"
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
        >
          <ChevronRight />
        </button>

      </div>
    </div>
  )
}