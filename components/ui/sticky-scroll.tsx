"use client"

import { ReactLenis } from "lenis/react"
import React, { forwardRef, useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const StickyScroll = forwardRef<HTMLElement>((props, ref) => {

  const images = [
    "/arnold.webp",
    "/cbum.webp",
    "/gym1.webp",
    "/gym2.webp",
    "/gym3.webp"
  ]

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const close = () => setSelectedIndex(null)

  const next = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % images.length)
  }

  const prev = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
  }

  // keyboard navigation
  useEffect(() => {

    const handleKey = (e: KeyboardEvent) => {

      if (selectedIndex === null) return

      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()

    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)

  }, [selectedIndex])

  return (

    <ReactLenis root>

      <main className="bg-black" ref={ref as any}>

        {/* MODAL */}

        <AnimatePresence>

          {selectedIndex !== null && (

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              {/* CLOSE */}

              <button
                onClick={close}
                className="absolute top-6 right-6 text-white"
              >
                <X size={32}/>
              </button>

              {/* PREVIOUS */}

              <button
                onClick={prev}
                className="absolute left-6 text-white"
              >
                <ChevronLeft size={40}/>
              </button>

              {/* NEXT */}

              <button
                onClick={next}
                className="absolute right-6 text-white"
              >
                <ChevronRight size={40}/>
              </button>

              {/* IMAGE */}

              <motion.img
                key={images[selectedIndex]}
                src={images[selectedIndex]}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.35 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {

                  if (info.offset.x > 120) prev()
                  if (info.offset.x < -120) next()

                }}
              />

            </motion.div>

          )}

        </AnimatePresence>

        {/* HERO SECTION */}

        <div className="wrapper">

         <section className="relative h-screen bg-black text-white sticky top-0 overflow-hidden flex items-center justify-center">

  {/* subtle background grid */}

  <div className="absolute inset-0 
  bg-[linear-gradient(to_right,#2a2a2a33_1px,transparent_1px),
  linear-gradient(to_bottom,#2a2a2a33_1px,transparent_1px)]
  bg-[size:60px_60px]" />

  {/* radial highlight */}

  <div className="absolute inset-0 
  bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_60%)]"/>

  {/* main content */}

  <div className="relative z-10 text-center max-w-5xl px-6">

    <motion.h1
      initial={{ opacity:0, y:40 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.8 }}
      className="text-5xl md:text-7xl font-semibold leading-[110%]"
    >
      Strength is Built
      <br />
      <span className="text-[#d4af37]">One Rep at a Time</span>
    </motion.h1>

    <motion.p
      initial={{ opacity:0, y:30 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay:0.3, duration:0.7 }}
      className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto"
    >
      Explore our elite training environment, world-class equipment,
      and the athletes who push limits every day at Muscle Nation.
    </motion.p>

  </div>

  {/* scroll hint */}

  <motion.div
    animate={{ y:[0,10,0] }}
    transition={{ repeat:Infinity, duration:1.5 }}
    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-400"
  >
    Scroll
  </motion.div>

</section>

        </div>

        {/* GALLERY */}

        <section className="text-white w-full bg-slate-950">

          <div className="grid grid-cols-12 gap-2">

            {/* LEFT */}

            <div className="grid gap-2 col-span-4">

              {images.map((img,i)=>(
                <img
                  key={i}
                  src={img}
                  onClick={()=>setSelectedIndex(i)}
                  className="h-96 w-full object-cover rounded-md cursor-pointer"
                />
              ))}

            </div>

            {/* MIDDLE STICKY */}

            <div className="sticky top-0 h-screen w-full col-span-4 grid grid-rows-3 gap-2">

              {images.slice(0,3).map((img,i)=>(
                <img
                  key={i}
                  src={img}
                  onClick={()=>setSelectedIndex(i)}
                  className="h-full w-full object-cover rounded-md cursor-pointer"
                />
              ))}

            </div>

            {/* RIGHT */}

            <div className="grid gap-2 col-span-4">

              {images.map((img,i)=>(
                <img
                  key={i}
                  src={img}
                  onClick={()=>setSelectedIndex(i)}
                  className="h-96 w-full object-cover rounded-md cursor-pointer"
                />
              ))}

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="bg-slate-950">

          <h1 className="text-[16vw] translate-y-8 md:translate-y-20  leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent">
            Muscle Nation
          </h1>

          <div className="bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"/>

        </footer>

      </main>

    </ReactLenis>

  )

})

StickyScroll.displayName = "StickyScroll"

export default StickyScroll