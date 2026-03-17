import Image from "next/image"

export default function Trainers(){

return(

<section id="trainers" className="py-28 bg-zinc-950 text-white">

<h2 className="text-4xl text-center font-bold mb-16">
Expert Trainers
</h2>

<div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

<Image src="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c" alt="" width={400} height={400} className="rounded-xl"/>

<Image src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff" alt="" width={400} height={400} className="rounded-xl"/>

<Image src="https://images.unsplash.com/photo-1605296867424-35fc25c9212a" alt="" width={400} height={400} className="rounded-xl"/>

</div>

</section>

)
}