"use client";

import React from "react";
import { motion } from "motion/react";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
  key={props.duration}
  animate={{ translateY: "-50%" }}
  transition={{
    duration: props.duration || 12,
    repeat: Infinity,
    ease: "linear",
    repeatType: "loop",
  }}
  className="flex flex-col gap-6 pb-6"
>
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-gray-800 bg-neutral-900 shadow-lg max-w-xs w-full text-white"
              >
                <div className="text-gray-300">{text}</div>

                <div className="flex items-center gap-3 mt-6">
                  <img
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-400">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};