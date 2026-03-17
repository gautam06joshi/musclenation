"use client";

import { MagneticText } from "@/components/ui/morphing-cursor";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function AboutHero() {

  const images = [
    { src: "/abouthero1.webp", alt: "gym training" },
    { src: "/abouthero2.webp", alt: "bodybuilding" },
    { src: "/abouthero3.webp", alt: "strength training" },
    { src: "/abouthero1.webp", alt: "gym workout" },
    { src: "/abouthero2.webp", alt: "fitness athlete" },
    { src: "/abouthero3.webp", alt: "crossfit" },
    { src: "/abouthero1.webp", alt: "gym training" },
  ];

  return (
    <section className="bg-black text-white">

      {/* HERO HEADING */}
      <div className="flex items-center justify-center min-h-[50vh] md:min-h-[55vh] px-6">

        <div className="flex flex-col items-center gap-6 text-center">

          {/* Magnetic Heading */}
          <MagneticText
  text={
    <>
      WELCOME TO <span className="text-yellow-600">MUSCLE NATION</span>
    </>
  }
  hoverText="FORGE YOUR STRONGEST SELF"
/>


          {/* Paragraph */}
          <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-[90%] md:max-w-2xl">
            Build strength, discipline and confidence with a community dedicated to transforming bodies and mindsets.
          </p>

        </div>

      </div>

      {/* PARALLAX SECTION */}
      <ZoomParallax images={images} />

    </section>
  );
}
