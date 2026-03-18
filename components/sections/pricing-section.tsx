"use client"

import { Pricing } from "@/components/ui/pricing"

const demoPlans = [

  {
    name: "BASIC",
    price: "999",
    yearlyPrice: "799",
    period: "per month",
    features: [
      "Access to gym equipment",
      "Cardio & strength training area",
      "Locker facility",
      "Open gym (6AM – 10PM)",
      "Basic support from trainers",
    ],
    description: "Perfect for beginners starting their fitness journey",
    buttonText: "Join Now",
    href: "#",
    isPopular: false,
  },

  {
    name: "PRO",
    price: "1999",
    yearlyPrice: "1599",
    period: "per month",
    features: [
      "Everything in Basic",
      "Personal trainer guidance",
      "Custom workout plan",
      "Diet & nutrition consultation",
      "Access to group classes (Zumba, HIIT)",
      "Progress tracking",
    ],
    description: "Best for serious transformation and faster results",
    buttonText: "Get Membership",
    href: "#",
    isPopular: true,
  },

  {
    name: "ELITE",
    price: "3999",
    yearlyPrice: "3299",
    period: "per month",
    features: [
      "Everything in Pro",
      "Dedicated personal trainer",
      "Personalized diet plan (weekly updates)",
      "Body composition analysis",
      "Priority support",
      "Flexible training schedule",
      "Premium locker & shower access",
    ],
    description: "For those who want a complete premium fitness experience",
    buttonText: "Go Elite",
    href: "#",
    isPopular: false,
  },

]

export default function PricingSection() {

  return (

    <section className="bg-black pt-8 pb-16">

      <div className="max-w-6xl mx-auto px-6">

        <Pricing plans={demoPlans} />

      </div>

    </section>

  )

}