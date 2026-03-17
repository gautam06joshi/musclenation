import { Dumbbell, Flame, Timer } from "lucide-react"

export default function Features() {

  return (
    <section id="features" className="py-28 bg-zinc-950 text-white">

      <h2 className="text-center text-4xl font-bold mb-16">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        <div className="p-8 bg-zinc-900 rounded-xl">
          <Dumbbell size={40} className="text-red-500"/>
          <h3 className="text-2xl mt-4 font-bold">Modern Equipment</h3>
        </div>

        <div className="p-8 bg-zinc-900 rounded-xl">
          <Flame size={40} className="text-red-500"/>
          <h3 className="text-2xl mt-4 font-bold">Fat Burn Programs</h3>
        </div>

        <div className="p-8 bg-zinc-900 rounded-xl">
          <Timer size={40} className="text-red-500"/>
          <h3 className="text-2xl mt-4 font-bold">24/7 Access</h3>
        </div>

      </div>

    </section>
  )
}