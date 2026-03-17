"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const testimonials = [
  {
    text: "Muscle Nation completely changed my fitness journey. The trainers are amazing.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Emily Carter",
    role: "Fitness Enthusiast",
  },
  {
    text: "Best gym environment I have ever trained in. Highly motivating.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Ryan Mitchell",
    role: "Athlete",
  },
  {
    text: "The trainers are supportive and the equipment is top class.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Sophia Turner",
    role: "Yoga Trainer",
  },
  {
    text: "I achieved my best physique training here.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Daniel Brooks",
    role: "Bodybuilder",
  },
  {
    text: "The community here keeps me motivated every day.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Olivia Adams",
    role: "Fitness Coach",
  },
  {
    text: "Premium experience with professional trainers.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Liam Johnson",
    role: "Gym Member",
  },
  {
    text: "Muscle Nation helped me stay disciplined.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Noah Wilson",
    role: "Entrepreneur",
  },
  {
    text: "Highly recommend this gym for serious training.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Ava Martinez",
    role: "Model",
  },
  {
    text: "Great equipment, great trainers, great results.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "James Walker",
    role: "Personal Trainer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {

  const [fast, setFast] = useState(false);

  return (
    <section className="bg-white my-24 relative">

      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center max-w-[600px] mx-auto"
        >

          <div className="border border-gray-700 py-1 px-4 rounded-lg text-black">
            Testimonials
          </div>

          <h2 className="text-4xl font-bold text-[#d4af37] mt-6">
            What our members say
          </h2>

          <p className="text-gray-400 text-center mt-4">
            See what our fitness community says about Muscle Nation.
          </p>

        </motion.div>

        {/* Mobile Speed Toggle */}

        <div className="flex items-center justify-center gap-3 mt-6 md:hidden">

  <Label className="text-gray-400">
    Normal
  </Label>

  <Switch
    checked={fast}
    onCheckedChange={(checked) => setFast(checked)}
  />

  <Label className="text-gray-400">
    Fast
  </Label>

</div>

        {/* Testimonials Columns */}

        <div
          className="flex justify-center gap-6 mt-12 max-h-[740px] overflow-hidden 
          [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
          
          onMouseEnter={() => setFast(true)}
          onMouseLeave={() => setFast(false)}
        >

          <TestimonialsColumn
            testimonials={firstColumn}
            duration={fast ? 5 : 15}
          />

          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={fast ? 6 : 19}
          />

          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={fast ? 6 : 17}
          />

        </div>

      </div>

    </section>
  );
}