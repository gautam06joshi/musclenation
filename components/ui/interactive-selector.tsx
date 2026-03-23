"use client"

import React, { useState, useEffect } from "react"
import {
  FaDumbbell,
  FaFire,
  FaHeartbeat,
  FaAppleAlt,
  FaUsers,
  FaRunning,
  FaMedal,
  FaClock
} from "react-icons/fa"


const InteractiveSelector = () => {

  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([])

  const options = [

  {
    title: "Elite Equipment",
    description: "Train with world-class strength machines",
    image: "/abouthero1.webp",
    icon: <FaDumbbell size={22} />
  },

  {
    title: "Fat Burning Programs",
    description: "HIIT & metabolic workouts for rapid results",
    image: "/abouthero2.webp",
    icon: <FaFire size={22} />
  },

  {
    title: "Health Monitoring",
    description: "Track your fitness progress scientifically",
    image: "/abouthero3.webp",
    icon: <FaHeartbeat size={22} />
  },

  {
    title: "Nutrition Coaching",
    description: "Personalized diet plans for optimal results",
    image: "/abouthero2.webp",
    icon: <FaAppleAlt size={22} />
  },

  {
    title: "Strong Community",
    description: "Train with passionate athletes & coaches",
    image: "/abouthero1.webp",
    icon: <FaUsers size={22} />
  },

  {
    title: "Cardio Zone",
    description: "Advanced treadmills & endurance training",
    image: "/abouthero3.webp",
    icon: <FaRunning size={22} />
  },

  {
    title: "Competition Prep",
    description: "Professional bodybuilding coaching",
    image: "/abouthero2.webp",
    icon: <FaMedal size={22} />
  },

  {
    title: "24/7 Access",
    description: "Train anytime with unlimited gym access",
    image: "/abouthero1.webp",
    icon: <FaClock size={22} />
  },

  {
    title: "Strength Training",
    description: "Progressive overload programs for muscle growth",
    image: "/abouthero3.webp",
    icon: <FaDumbbell size={22} />
  },

  {
    title: "Group Fitness",
    description: "High-energy classes led by expert instructors",
    image: "/abouthero2.webp",
    icon: <FaUsers size={22} />
  },

  {
    title: "Recovery Therapy",
    description: "Massage, stretching and recovery sessions",
    image: "/abouthero1.webp",
    icon: <FaHeartbeat size={22} />
  },

  {
    title: "Athlete Performance",
    description: "Advanced conditioning for elite athletes",
    image: "/abouthero3.webp",
    icon: <FaFire size={22} />
  }

]


  useEffect(() => {

    const timers:any[] = []

    options.forEach((_, i) => {

      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i])
      }, 120 * i)

      timers.push(timer)

    })

    return () => timers.forEach(timer => clearTimeout(timer))

  }, [])

  return (

    <div className="relative flex flex-col items-center justify-center py-28 bg-black text-white">

      {/* Header */}

      <div className="max-w-2xl text-center mb-14 px-6">

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Why Choose <span className="text-[#d4af37]">Muscle Nation</span>
        </h2>

        <p className="text-gray-400">
          Experience premium facilities, expert coaching and a powerful
          community designed to transform your fitness journey.
        </p>

      </div>
      {/* Mobile Scroll Hint */}

<div className="md:hidden relative w-full flex justify-center mb-6">

  <div className="flex items-center gap-2 text-gray-400 text-sm animate-pulse">
    <span>Swipe</span>

    <div className="w-6 h-[1px] bg-gray-500 relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-2 bg-white animate-[slide_1s_infinite]" />
    </div>

    <span>→</span>
  </div>

</div>

      {/* OPTIONS */}

      <div className="flex w-full max-w-[1400px] h-[420px] overflow-x-auto md:overflow-hidden overflow-y-hidden">

        {options.map((option,index)=> (

          <div
            key={index}

            onMouseEnter={()=>setActiveIndex(index)}

            className="relative flex flex-col justify-end transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group will-change-transform"


            style={{

              backgroundImage:`url(${option.image})`,
              backgroundSize:"cover",
              backgroundPosition:"center",

              flex: activeIndex === index ? "15 1 0%" : "0.5 1 0%",


              border:"1px solid #222",

              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index)
                ? "translateX(0)"
                : "translateX(-60px)"

            }}

          >

            {/* overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"/>

            {/* image zoom */}

            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000 ease-out"
              style={{ backgroundImage:`url(${option.image})` }}
            />

            {/* content */}

            <div className="relative z-10 p-6 flex items-center gap-4">

              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-gray-700">
                {option.icon}
              </div>

              {(activeIndex === index || (activeIndex === 0 && index === 0)) && (

                <div>

                  <div className="font-bold text-lg">
                    {option.title}
                  </div>

                  <div className="text-gray-400 text-sm">
                    {option.description}
                  </div>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default InteractiveSelector
