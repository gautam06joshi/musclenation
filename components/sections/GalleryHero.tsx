"use client"

import Masonry from "../ui/Masonry"

const items = [
  {
    id: "1",
    img: "/abouthero1.webp",
    url: "#",
    height: 500,
  },
  {
    id: "2",
    img: "/abouthero2.webp",
    url: "#",
    height: 350,
  },
  {
    id: "3",
    img: "/abouthero2.webp",
    url: "#",
    height: 600,
  },
  {
    id: "4",
    img: "/abouthero2.webp",
    url: "#",
    height: 400,
  },
  {
    id: "5",
    img: "/abouthero1.webp",
    url: "#",
    height: 450,
  },
  {
    id: "6",
    img: "/abouthero3.webp",
    url: "#",
    height: 550,
  },
   {
    id: "7",
    img: "/abouthero2.webp",
    url: "#",
    height: 550,
  },
   {
    id: "8",
    img: "/abouthero3.webp",
    url: "#",
    height: 550,
  },
   {
    id: "9",
    img: "/abouthero1.webp",
    url: "#",
    height: 550,
  },
   {
    id: "10",
    img: "/abouthero2.webp",
    url: "#",
    height: 850,
  },
   {
    id: "11",
    img: "/abouthero3.webp",
    url: "#",
    height: 520,
  },
  {
    id: "12",
    img: "/abouthero1.webp",
    url: "#",
    height: 470,
  },
  {
    id: "13",
    img: "/abouthero3.webp",
    url: "#",
    height: 420,
  },
  {
    id: "14",
    img: "/abouthero2.webp",
    url: "#",
    height: 370,
  },
  {
    id: "video-1",
    type: "video" as const,
    video: "/gym-video.mp4",
    url: "#",
    height: 900,
    fullWidth: true,
  },
  {
    id: "15",
    img: "/abouthero3.webp",
    url: "#",
    height: 700,
  },
  {
    id: "16",
    img: "/abouthero3.webp",
    url: "#",
    height: 450,
  },
  {
    id: "17",
    img: "/abouthero1.webp",
    url: "#",
    height: 550,
  },
  {
    id: "18",
    img: "/abouthero3.webp",
    url: "#",
    height: 1000,
  },
  {
    id: "19",
    img: "/abouthero2.webp",
    url: "#",
    height: 350,
  },
  {
    id: "20",
    img: "/abouthero3.webp",
    url: "#",
    height: 620,
  },
  {
    id: "21",
    img: "/abouthero1.webp",
    url: "#",
    height: 520,
  },
  {
    id: "22",
    img: "/abouthero3.webp",
    url: "#",
    height: 420,
  },
  {
    id: "23",
    img: "/abouthero3.webp",
    url: "#",
    height: 270,
  },
]

export default function GalleryHero() {
  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Gym <span className="text-yellow-500">Gallery</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Experience the energy, dedication, and transformation inside MuscleNation.
            Every image reflects strength, discipline, and passion.
          </p>
        </div>

        {/* MASONRY GRID */}
        <div className="w-full">
          <Masonry
            items={items}
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 transition px-8 py-3 rounded-lg font-semibold text-black">
            View More →
          </button>
        </div>

      </div>
    </section>
  )
}