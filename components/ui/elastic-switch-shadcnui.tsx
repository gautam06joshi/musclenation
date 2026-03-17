"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ElasticSwitchProps {
  value: "form" | "bmi"
  onChange: (value: "form" | "bmi") => void
  className?: string
}

export function ElasticSwitch({ value, onChange, className }: ElasticSwitchProps) {
  const isBmi = value === "bmi"

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        onClick={() => onChange("form")}
        className={cn(
          "relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
          value === "form" 
            ? "bg-white text-black shadow-lg" 
            : "bg-transparent text-gray-500 hover:text-gray-300"
        )}
      >
        Join Form
      </button>

      <button
        onClick={() => onChange("bmi")}
        className={cn(
          "relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
          value === "bmi" 
            ? "bg-white text-black shadow-lg" 
            : "bg-transparent text-gray-500 hover:text-gray-300"
        )}
      >
        BMI Calc
      </button>
    </div>
  )
}

// Standalone demo version (original)
export function ElasticSwitchDemo() {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className="flex items-center justify-center p-12">
      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative h-12 w-24 rounded-full p-1 transition-colors ${
          isOn ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
          className={`h-10 w-10 rounded-full bg-white shadow-md ${
            isOn ? "ml-auto" : ""
          }`}
        />
      </button>
    </div>
  )
}