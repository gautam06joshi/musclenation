import Image from "next/image"

export default function Equipment() {

  return (
    <section id="equipment" className="py-28 bg-black text-white">

      <h2 className="text-4xl text-center font-bold mb-16">
        Premium Equipment
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        <Image
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
          alt="dumbbells"
          width={400}
          height={400}
          className="rounded-xl"
        />

        <Image
          src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e"
          alt="gym"
          width={400}
          height={400}
          className="rounded-xl"
        />

        <Image
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
          alt="treadmill"
          width={400}
          height={400}
          className="rounded-xl"
        />

      </div>

    </section>
  )
}