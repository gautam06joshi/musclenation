"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FlowButton } from "./flow-button"
import { Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96] as any,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const ghostVariants: Variants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
    },
  },
  floating: {
    y: [-8, 8],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse", // ✅ अब error nahi aayega
    },
  },
}

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 text-center overflow-hidden">

      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* 404 */}
          <div className="flex items-center justify-center gap-6 mb-12">

            <span className="text-[90px] md:text-[140px] font-bold text-white/20">
              4
            </span>

            <motion.div
              variants={ghostVariants}
              animate="floating"
              whileHover="hover"
            >
              <Image
                src="/ghost.png"
                alt="ghost"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </motion.div>

            <span className="text-[90px] md:text-[140px] font-bold text-white/20">
              4
            </span>

          </div>

          {/* TITLE */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Lost Your Way?
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg mb-10 max-w-md mx-auto"
          >
            Looks like this page skipped leg day… it doesn’t exist.
            Let’s get you back on track.
          </motion.p>

          {/* BUTTON */}
          <motion.div variants={itemVariants}>
            <Link href="/">
              <FlowButton text="Back to Home" />
            </Link>
          </motion.div>

          {/* EXTRA LINK */}
          <motion.div variants={itemVariants} className="mt-10">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-300 underline transition"
            >
              Return to homepage
            </Link>
          </motion.div>

        </motion.div>
      </AnimatePresence>

    </div>
  )
}