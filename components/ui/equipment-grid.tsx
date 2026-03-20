"use client"

import { Badge } from "./badge"
import { Button } from "./button"
import { Card } from "./card"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Dumbbell, X, ZoomIn } from "lucide-react"
import { KeyboardEvent, useState } from "react"

const equipmentData = [
  {
    id: 1,
    url: "/strength1.jpg",
    title: "Bench Press Station",
    category: "Strength",
  },
  {
    id: 2,
    url: "/cardio1.jpg",
    title: "Treadmill Pro",
    category: "Cardio",
  },
  {
    id: 3,
    url: "/freeweights1.jpg",
    title: "Dumbbells Set",
    category: "Free Weights",
  },
  {
    id: 4,
    url: "/strength2.jpg",
    title: "Cable Machine",
    category: "Strength",
  },
  {
    id: 5,
    url: "/cardio2.jpg",
    title: "Spin Bike",
    category: "Cardio",
  },
  {
    id: 6,
    url: "/strength3.jpg",
    title: "Squat Rack",
    category: "Strength",
  },
  {
    id: 7,
    url: "/cardio3.jpg",
    title: "Treadmill Elite",
    category: "Cardio",
  },
  {
    id: 8,
    url: "/freeweights2.jpg",
    title: "Dumbbells Set",
    category: "Free Weights",
  },
  {
    id: 9,
    url: "/strength4.jpg",
    title: "Heavy dumbbell set",
    category: "Strength",
  },
  {
    id: 10,
    url: "/cardio4.jpg",
    title: "Spin Bike",
    category: "Cardio",
  },
  {
    id: 11,
    url: "/freeweights3.jpg",
    title: "medium size dumbbell set",
    category: "Free Weights",
  },
  {
    id: 12,
    url: "/freeweights4.jpg",
    title: "dumbells",
    category: "Free Weights",
  },
]

export function EquipmentGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("All")

  const categories = ["All", ...new Set(equipmentData.map((e) => e.category))]

  const filtered =
    filter === "All"
      ? equipmentData
      : equipmentData.filter((e) => e.category === filter)

  const handleNext = () => {
    if (selectedImage !== null) {
      const index = equipmentData.findIndex((e) => e.id === selectedImage)
      const next = (index + 1) % equipmentData.length
      setSelectedImage(equipmentData[next].id)
    }
  }

  const handlePrev = () => {
    if (selectedImage !== null) {
      const index = equipmentData.findIndex((e) => e.id === selectedImage)
      const prev = (index - 1 + equipmentData.length) % equipmentData.length
      setSelectedImage(equipmentData[prev].id)
    }
  }

  const selected = equipmentData.find((e) => e.id === selectedImage)

  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    id: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSelectedImage(id)
    }
  }

  return (
    <section className="w-full bg-black text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-white text-black">
            <Dumbbell className="mr-2 h-4 w-4" />
            Equipment
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Premium Equipment
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Train with world-class machines designed to maximize strength,
            endurance, and performance.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              onClick={() => setFilter(cat)}
              className={
                filter === cat
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "border border-white text-white hover:bg-yellow-500  hover:border-yellow-500 hover:text-black"
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="bg-black border border-white overflow-hidden cursor-pointer group hover:border-yellow-500 transition"
                  onClick={() => setSelectedImage(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  tabIndex={0}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition">
                      <ZoomIn className="text-white mb-2" />
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <Badge className="bg-white text-black mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  size="icon"
                  className="absolute -top-12 right-0 bg-white text-black"
                  onClick={() => setSelectedImage(null)}
                >
                  <X />
                </Button>

                <Button
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black"
                  onClick={handlePrev}
                >
                  <ChevronLeft />
                </Button>

                <Button
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black"
                  onClick={handleNext}
                >
                  <ChevronRight />
                </Button>

                <img
                  src={selected.url}
                  className="rounded-lg max-h-[80vh]"
                />

                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-white">
                    {selected.title}
                  </h3>
                  <Badge className="bg-white text-black mt-2">
                    {selected.category}
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}