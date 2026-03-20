"use client"

import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function MissionSection() {
  return (
    <section className="w-full bg-black text-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT - OUR MISSION */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our <span className="text-yellow-500">Mission</span>
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6">
            At our core, we exist to redefine what strength truly means. It’s
            not just about lifting heavier weights or building a better physique
            — it’s about discovering the discipline, resilience, and mindset
            that transforms your entire life.
          </p>

          <p className="text-gray-400 leading-relaxed mb-6">
            Every individual who walks through our doors carries a different
            story — some come to rebuild confidence, some to push their limits,
            and others to find a version of themselves they’ve never met before.
            Our mission is to be a part of that journey.
          </p>

          <p className="text-gray-400 leading-relaxed">
            We are committed to creating an environment where progress is
            earned, consistency is celebrated, and every drop of sweat brings
            you closer to a stronger body and an unstoppable mindset.
          </p>
        </motion.div>

        {/* RIGHT - WHY CHOOSE US */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why <span className="text-yellow-500">Choose Us</span>
          </h2>

          <div className="space-y-5">
            {[
              "We don’t just train bodies — we build confidence that reflects in every part of your life.",
              "Our coaches are not just certified, but deeply invested in your personal journey.",
              "Every program is designed around YOU — your goals, your pace, your transformation.",
              "A space where discipline meets motivation, and consistency becomes your identity.",
              "Real results, real growth — no shortcuts, no compromises.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 border-b border-gray-800 pb-3"
              >
                <CheckCircle className="text-yellow-500 mt-1" size={18} />
                <p className="text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}