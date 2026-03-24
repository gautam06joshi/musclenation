"use client"

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const transformations = [
  {
    before: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    after: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
  },
  {
    before: "https://images.unsplash.com/photo-1546484959-fc38e34fd7b8",
    after: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c",
  },
  {
    before: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    after: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
  },
];

function Feature() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setInset(percentage);
  };

  // Calculate darkness: 0 at center (50%), up to 0.85 at edges (0% or 100%)
  const leftDarkness = Math.max(0, (50 - inset) / 50 * 0.9);
  const rightDarkness = Math.max(0, (inset - 50) / 50 * 0.9);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full  py-20 lg:py-40 bg-black text-white">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">

          {/* TEXT */}
          <div className="flex flex-col items-center text-center gap-4">

  {/* HEADING */}
  <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight leading-tight">
    Before vs <span className="text-yellow-500">After</span>
  </h2>

  {/* SUBTEXT */}
  <p className="text-lg md:text-xl max-w-2xl text-gray-400 leading-relaxed">
    Witness real transformations powered by consistency, discipline, and
    the right training environment at Muscle Nation.
  </p>

</div>

          {/* IMAGE COMPARISON */}
          <div className="pt-12 w-full">
            <div
              className="relative aspect-video w-full max-w-4xl mx-auto h-full overflow-hidden rounded-2xl select-none"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onMouseLeave={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >

              {/* BEFORE IMAGE (LEFT) - z-10 */}
              <div 
                className="absolute left-0 top-0 z-10 w-full h-full"
                style={{
                  clipPath: "inset(0 " + (100 - inset) + "% 0 0)",
                  filter: `brightness(${1 - leftDarkness})`,
                }}
              >
                <Image
                  src={transformations[currentIndex].before}
                  alt="before transformation"
                  width={1920}
                  height={1080}
                  priority
                  className="w-full h-full aspect-video rounded-2xl select-none"
                />
              </div>

              {/* AFTER IMAGE (RIGHT) - z-0 */}
              <div 
                className="absolute left-0 top-0 z-0 w-full h-full"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                  filter: `brightness(${1 - rightDarkness})`,
                }}
              >
                <Image
                  src={transformations[currentIndex].after}
                  alt="after transformation"
                  width={1920}
                  height={1080}
                  priority
                  className="w-full h-full aspect-video rounded-2xl select-none"
                />
              </div>

              

              {/* SLIDER LINE - z-40 highest */}
              <div
                className="bg-white h-full w-1 absolute top-0 select-none z-40"
                style={{
                  left: inset + "%",
                  transform: "translateX(-50%)",
                }}
              >
                {/* DRAG HANDLE - z-50 highest */}
                <button
                  className="bg-white rounded-full hover:scale-110 transition-transform w-8 h-8 select-none -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 z-50 cursor-ew-resize flex justify-center items-center shadow-xl ring-2 ring-white/50"
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-3 bg-gray-500 rounded-full" />
                    <div className="w-0.5 h-3 bg-gray-500 rounded-full" />
                  </div>
                </button>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">

  {/* LEFT BUTTON */}
  <button
    onClick={() =>
      setCurrentIndex((prev) =>
        prev === 0 ? transformations.length - 1 : prev - 1
      )
    }
    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
  >
    <ChevronLeft className="text-white" />
  </button>

  {/* DOTS */}
  <div className="flex gap-2">
    {transformations.map((_, index) => (
      <div
        key={index}
        className={`w-2.5 h-2.5 rounded-full ${
          currentIndex === index ? "bg-yellow-400" : "bg-gray-500"
        }`}
      />
    ))}
  </div>

  {/* RIGHT BUTTON */}
  <button
    onClick={() =>
      setCurrentIndex((prev) =>
        prev === transformations.length - 1 ? 0 : prev + 1
      )
    }
    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
  >
    <ChevronRight className="text-white" />
  </button>

</div>

        </div>
      </div>
    </div>
  );
}

export { Feature };