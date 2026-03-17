"use client"

import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow"

const SERVICES = [
  {
    id: "s1",
    title: "personal training",
    imageUrl: "/abouthero1.webp",
    desc: "Get a fully personalized fitness experience designed around your body, goals, and lifestyle. Our expert trainers guide you step-by-step with proper form, technique, and motivation. Track your progress consistently and unlock your true physical potential with focused one-on-one sessions.",
  },
  {
    id: "s2",
    title: "strength training",
    imageUrl: "/abouthero2.webp",
    desc: "Build real strength with scientifically structured workouts and progressive overload techniques. Improve your performance, stability, and power through compound movements and expert guidance. Perfect for those who want to lift heavier, move better, and feel stronger every day.",
  },
  {
    id: "s3",
    title: "bodybuilding",
    imageUrl: "/abouthero3.webp",
    desc: "Sculpt your physique with targeted muscle-building programs and precision training. Focus on hypertrophy, symmetry, and aesthetics while maintaining proper recovery and nutrition. Ideal for those aiming to achieve a well-defined, muscular, and stage-ready body.",
  },
  {
    id: "s4",
    title: "crossfit training",
    imageUrl: "/abouthero1.webp",
    desc: "Push your limits with high-intensity functional training that improves endurance, agility, and strength. Experience dynamic workouts combining cardio, weights, and bodyweight exercises. Designed to keep you challenged, energized, and constantly improving.",
  },
  {
    id: "s5",
    title: "nutrition coaching",
    imageUrl: "/abouthero3.webp",
    desc: "Transform your body from the inside with personalized nutrition plans tailored to your goals. Learn what to eat, when to eat, and how to fuel your workouts for maximum results. Achieve sustainable fat loss, muscle gain, and overall health with expert guidance.",
  },
]

export default function Services() {
  return (
    <section className="bg-black text-white py-32">
      <HoverSlider className="max-w-6xl mx-auto px-6">
        <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-12">
          / our services
        </h3>

        <div className="flex flex-wrap items-start justify-between gap-12">
          {/* LEFT TEXT */}
          <div className="flex flex-col space-y-8">
            {SERVICES.map((service, index) => (
              <TextStaggerHover
                key={service.id}
                index={index}
                text={service.title}
                desc={service.desc}
                className="text-5xl font-semibold uppercase tracking-tight"
              />
            ))}
          </div>

          {/* RIGHT IMAGE */}
          <HoverSliderImageWrap className="relative w-[420px] h-[420px] rounded-xl overflow-hidden">
            {SERVICES.map((service, index) => (
              <HoverSliderImage
                key={service.id}
                index={index}
                src={service.imageUrl}
                alt={service.title}
              />
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </section>
  )
}