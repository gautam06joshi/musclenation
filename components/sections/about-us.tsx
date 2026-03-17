"use client";

import { CheckCircle, Play, X } from "lucide-react";
import { useState } from "react";

export default function AboutUs() {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/abouthero1.webp",
    "/aboutHero2.webp",
    "/aboutHero3.webp",
    "/aboutHero1.webp",
  ];

  return (
    <>
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-yellow-500 tracking-widest text-sm font-semibold mb-4">
              OUR STORY
            </p>

            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              BUILD YOUR <br /> ULTIMATE PHYSIQUE
            </h2>

            <p className="text-yellow-400 text-lg mb-6">
              Train harder. Push further. Become stronger every day.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              At our fitness community we believe transformation is more than
              physical change. It is about discipline, confidence and
              determination. Our trainers guide you through proven training
              systems designed to unlock your strongest self.
            </p>

            {/* FEATURES */}
            <div className="space-y-4 mb-10">

              <div className="flex items-center gap-3">
                <CheckCircle className="text-yellow-500 w-5 h-5" />
                <p className="text-gray-300">Elite Certified Trainers</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-yellow-500 w-5 h-5" />
                <p className="text-gray-300">
                  Recovery Zone, Nutrition Bar & Lounge
                </p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-yellow-500 w-5 h-5" />
                <p className="text-gray-300">
                  Professional Bodybuilding Coaching
                </p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-yellow-500 w-5 h-5" />
                <p className="text-gray-300">
                  Premium International Equipment
                </p>
              </div>

            </div>

            <button className="bg-yellow-500 hover:bg-yellow-600 transition px-8 py-3 font-semibold tracking-wide">
              START YOUR JOURNEY
            </button>

          </div>

          {/* RIGHT SIDE VIDEO */}
          <div>

            <div className="relative">

              <img
                src="/gym1.webp"
                alt="gym tour"
                className="w-full h-[480px] object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-yellow-500 p-6 rounded-full cursor-pointer hover:scale-110 transition">
                  <Play className="text-white w-8 h-8 fill-white" />
                </div>
              </div>

            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4">

              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className="w-24 h-16 object-cover cursor-pointer border border-transparent hover:border-yellow-500"
                />
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >

          <img
            src={selectedImage}
            className="max-h-[80vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X className="text-white w-6 h-6" />
          </button>

        </div>
      )}

    </>
  );
}
