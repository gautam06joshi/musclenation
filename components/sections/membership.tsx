export default function Membership(){

return(

<section id="membership" className="py-28 bg-black text-white">

<h2 className="text-4xl text-center font-bold mb-16">
Membership Plans
</h2>

<div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

<div className="p-10 bg-zinc-900 rounded-xl">
<h3 className="text-2xl font-bold">Basic</h3>
<p className="text-4xl mt-4">$29</p>
</div>

<div className="p-10 bg-red-600 rounded-xl">
<h3 className="text-2xl font-bold">Pro</h3>
<p className="text-4xl mt-4">$59</p>
</div>

<div className="p-10 bg-zinc-900 rounded-xl">
<h3 className="text-2xl font-bold">Elite</h3>
<p className="text-4xl mt-4">$99</p>
</div>

</div>

</section>

)
}