"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, motion } from "motion/react"
import { cn } from "@/lib/utils"

/* ================= TYPES ================= */

interface TextStaggerHoverProps {
  text: string
  index: number
  desc?: string
}

interface HoverSliderImageProps {
  index: number
}

interface HoverSliderProps {}

interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
  expandedSlide: number | null
  toggleExpand: (index: number) => void
}

/* ================= HELPERS ================= */

function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)

  return { words, characters }
}

/* ================= CONTEXT ================= */

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (!context) {
    throw new Error("Must be used inside HoverSlider")
  }
  return context
}

/* ================= MAIN WRAPPER ================= */

export const HoverSlider = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & HoverSliderProps
>(({ children, className }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState(0)
  const [expandedSlide, setExpandedSlide] = React.useState<number | null>(null)

  const changeSlide = (index: number) => setActiveSlide(index)

  const toggleExpand = (index: number) => {
    setExpandedSlide((prev) => (prev === index ? null : index))
  }

  return (
    <HoverSliderContext.Provider
      value={{ activeSlide, changeSlide, expandedSlide, toggleExpand }}
    >
      <div className={className}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

/* ================= TEXT COMPONENT ================= */

export const TextStaggerHover = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index, desc, className }, ref) => {
  const { activeSlide, changeSlide, expandedSlide, toggleExpand } =
    useHoverSliderContext()

  const { characters } = splitText(text)

  const isActive = activeSlide === index
  const isExpanded = expandedSlide === index

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => changeSlide(index)}
      onClick={() => toggleExpand(index)}
    >
      {/* TEXT */}
      <span
        ref={ref}
        className={cn(
          "relative inline-block overflow-hidden",
          className
        )}
      >
        {characters.map((char, i) => (
          <span key={`${char}-${i}`} className="relative inline-block overflow-hidden">
            <MotionConfig
              transition={{
                delay: i * 0.025,
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="inline-block opacity-20"
                animate={isActive ? { y: "-110%" } : { y: "0%" }}
              >
                {char}
              </motion.span>

              <motion.span
                className="absolute left-0 top-0 inline-block opacity-100"
                animate={isActive ? { y: "0%" } : { y: "110%" }}
              >
                {char}
              </motion.span>
            </MotionConfig>
          </span>
        ))}
      </span>

      {/* EXPAND SECTION */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="mt-4 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 max-w-md text-gray-400 text-sm leading-relaxed">
          {desc}
        </div>

        <button className="mt-4 px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300">
          Explore Service →
        </button>
      </motion.div>
    </div>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"

/* ================= IMAGE ================= */

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
})

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()

  return (
    <motion.img
      ref={ref}
      className={cn("w-full h-full object-cover", className)}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      {...props}
    />
  )
})