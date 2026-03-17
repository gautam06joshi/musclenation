"use client"

import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function Hero() {

  return (
    <section className="bg-black text-white relative overflow-hidden">

      {/* Moving Background Text */}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">

        <div className="marquee whitespace-nowrap text-[10vw] font-extrabold text-white/5 tracking-widest">

          Muscle Nation &nbsp; Muscle Nation &nbsp; Muscle Nation &nbsp;
          Muscle Nation &nbsp; Muscle Nation &nbsp; Muscle Nation &nbsp;

        </div>

      </div>


      <ContainerScroll
        titleComponent={
          <h1 className="text-center text-5xl md:text-7xl font-bold relative z-10">
            Build Your <span className="text-[#d4af37]">Dream Body</span>
          </h1>
        }
      >

        {/* Video */}

        <div className="relative h-full w-full">

          <video
            autoPlay
            loop
            muted
            playsInline
            className="rounded-xl object-cover h-full w-full"
          >
            <source src="/gym-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay for readability */}

          <div className="absolute inset-0 bg-black/30 rounded-xl"></div>

        </div>

      </ContainerScroll>

    </section>
  )
}