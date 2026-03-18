"use client"

import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import confetti from "canvas-confetti"
import NumberFlow from "@number-flow/react"

interface PricingPlan {
  name: string
  price: string
  yearlyPrice: string
  period: string
  features: string[]
  description: string
  buttonText: string
  href: string
  isPopular: boolean
}

interface PricingProps {
  plans: PricingPlan[]
  title?: string
  description?: string
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you",
}: PricingProps) {

  const [isMonthly, setIsMonthly] = useState(true)
  const isDesktop = useMediaQuery("(min-width:768px)")
  const switchRef = useRef<HTMLButtonElement>(null)

  const handleToggle = (checked: boolean) => {

    setIsMonthly(!checked)

    if (checked && switchRef.current) {

      const rect = switchRef.current.getBoundingClientRect()

      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      })

    }

  }

  return (

    <div className="py-20">

      <div className="text-center space-y-4 mb-12">

        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
          {title}
        </h2>

        <p className="text-gray-400 text-lg">
          {description}
        </p>

      </div>

      <div className="flex justify-center mb-10">

        <Label>

          <Switch
            ref={switchRef as any}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
          />

        </Label>

        <span className="ml-3 font-semibold text-gray-300">
Annual billing <span className="text-gray-500">(Save 20%)</span>
</span>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">

        {plans.map((plan, index) => (

          <motion.div

          

          

            key={index}
            initial={{ y: 40, opacity: 0 }}

            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    scale: plan.isPopular ? 1.05 : 1,
                  }
                : { opacity: 1 }
            }

            whileHover={
  plan.isPopular
    ? {
        scale: 1.08,
        boxShadow: "0 0 15px rgba(212,175,55,0.55)",
      }
    : { scale: 1.02 }
}

            transition={{
              duration: 0.6,
            }}

            className={cn(
              "rounded-2xl border border-gray-800 p-8 bg-black text-center flex flex-col relative",
              plan.isPopular
  ? "border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.35)]"
  : "border-gray-800"
            )}

          >

            {plan.isPopular && (

              <div className="absolute top-0 right-0 bg-[#d4af37] text-black py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center">

                <Star className="w-4 h-4 mr-1 fill-black" />

                Popular

              </div>

            )}

            <p className="text-gray-200 font-semibold">
              {plan.name}
            </p>

            <div className="flex justify-center items-center mt-6 gap-2">

              <span className="text-6xl font-bold text-white flex items-center gap-1">

  ₹

  <NumberFlow
    value={
      isMonthly
        ? Number(plan.price)
        : Number(plan.yearlyPrice)
    }
    format={{
      useGrouping: true, // 🔥 adds commas (1,999)
    }}
  />

</span>
              <span className="text-gray-400 text-sm">
                / {plan.period}
              </span>

            </div>

            <p className="text-xs text-gray-500">
              {isMonthly ? "billed monthly" : "billed annually"}
            </p>

            <ul className="mt-6 space-y-2">

              {plan.features.map((feature, idx) => (

                <li key={idx} className="flex gap-2 text-left text-gray-300">

                  <Check className="w-4 h-4 text-gray-400 mt-1" />

                  {feature}

                </li>

              ))}

            </ul>

            <hr className="my-6 border-gray-800" />

            <Link
              href={plan.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full border-white hover:bg-white hover:text-black"
              )}
            >

              {plan.buttonText}

            </Link>

            <p className="mt-4 text-xs text-white">
              {plan.description}
            </p>

          </motion.div>

        ))}

      </div>

    </div>

  )

}