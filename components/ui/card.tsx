"use client"

import React from "react"
import { cn } from "@/lib/utils"

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-yellow-500/20 bg-black shadow-md",
        className
      )}
      {...props}
    />
  )
}