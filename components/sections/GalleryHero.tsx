"use client"

import Masonry from "../ui/Masonry"
import { useState, useEffect, useCallback } from "react"

const items = [
  { id: "1", img: "/abouthero1.webp", url: "#", height: 500 },
  { id: "2", img: "/abouthero2.webp", url: "#", height: 350 },
  { id: "3", img: "/abouthero2.webp", url: "#", height: 600 },
  { id: "4", img: "/abouthero2.webp", url: "#", height: 400 },
  { id: "5", img: "/abouthero1.webp", url: "#", height: 450 },
  { id: "6", img: "/abouthero3.webp", url: "#", height: 550 },
  { id: "7", img: "/abouthero2.webp", url: "#", height: 550 },
  { id: "8", img: "/abouthero3.webp", url: "#", height: 550 },
  { id: "9", img: "/abouthero1.webp", url: "#", height: 550 },
  { id: "10", img: "/abouthero2.webp", url: "#", height: 850 },
  { id: "11", img: "/abouthero3.webp", url: "#", height: 520 },
  { id: "12", img: "/abouthero1.webp", url: "#", height: 470 },
  { id: "13", img: "/abouthero3.webp", url: "#", height: 420 },
  { id: "14", img: "/abouthero2.webp", url: "#", height: 370 },

  {
    id: "video-1",
    type: "video" as const,
    video: "/gym-video.mp4",
    url: "#",
    height: 900,
    fullWidth: true,
  },

  { id: "15", img: "/abouthero3.webp", url: "#", height: 700 },
  { id: "16", img: "/abouthero3.webp", url: "#", height: 450 },
  { id: "17", img: "/abouthero1.webp", url: "#", height: 550 },
  { id: "18", img: "/abouthero3.webp", url: "#", height: 1000 },
  { id: "19", img: "/abouthero2.webp", url: "#", height: 350 },
  { id: "20", img: "/abouthero3.webp", url: "#", height: 620 },
  { id: "21", img: "/abouthero1.webp", url: "#", height: 520 },
  { id: "22", img: "/abouthero3.webp", url: "#", height: 420 },
  { id: "23", img: "/abouthero3.webp", url: "#", height: 270 },
]

// Duplicate all items (23 + 23 = 46)
const allItems = [
  ...items,
  ...items.map((item) => ({
    ...item,
    id: `${item.id}-copy`,
  })),
]

export default function GalleryHero() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Initially show only 23 items
  const [visibleCount, setVisibleCount] = useState(23)

  const selectedItem =
    selectedIndex !== null ? allItems[selectedIndex] : null

  const goNext = useCallback(() => {
    if (selectedIndex === null) return

    setSelectedIndex((prev) => (prev! + 1) % allItems.length)
  }, [selectedIndex])

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return

    setSelectedIndex(
      (prev) => (prev! - 1 + allItems.length) % allItems.length
    )
  }, [selectedIndex])

  const closeModal = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "Escape") closeModal()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex, goNext, goPrev, closeModal])

  // Prevent body scroll
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedIndex])

  return (
        <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Gym <span className="text-yellow-500">Gallery</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Experience the energy, dedication, and transformation inside
            MuscleNation.
          </p>
        </div>

        {/* MASONRY GRID */}
        <div className="w-full">
          <Masonry
            items={allItems.slice(0, visibleCount)}
            onItemClick={(item) => {
              const index = allItems.findIndex((i) => i.id === item.id)
              setSelectedIndex(index)
            }}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.96}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>

        {/* VIEW MORE */}
        {visibleCount < allItems.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + 23, allItems.length)
                )
              }
              className="bg-yellow-500 hover:bg-yellow-600 transition px-8 py-3 rounded-lg font-semibold text-black"
            >
              View More →
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* LEFT */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50
              w-12 h-12 md:w-14 md:h-14 rounded-full
              bg-white/10 hover:bg-yellow-500
              backdrop-blur-md border border-white/20
              flex items-center justify-center
              transition-all duration-300 hover:scale-110 group"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* RIGHT */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50
              w-12 h-12 md:w-14 md:h-14 rounded-full
              bg-white/10 hover:bg-yellow-500
              backdrop-blur-md border border-white/20
              flex items-center justify-center
              transition-all duration-300 hover:scale-110 group"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* CLOSE */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50
              w-10 h-10 md:w-12 md:h-12 rounded-full
              bg-white/10 hover:bg-red-500
              backdrop-blur-md border border-white/20
              flex items-center justify-center
              transition-all duration-300 hover:scale-110 group"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* COUNTER */}
          <div
            className="absolute top-4 left-4 md:top-8 md:left-8 z-50
              px-4 py-2 rounded-full
              bg-white/10 backdrop-blur-md
              border border-white/20
              text-sm font-medium text-white"
          >
            {selectedIndex! + 1} / {allItems.length}
          </div>

          {/* IMAGE / VIDEO */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] mx-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "video" ? (
              <video
                src={selectedItem.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
              />
            ) : (
              <img
                src={selectedItem.img}
                alt=""
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}