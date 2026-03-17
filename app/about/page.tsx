import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHero from "@/components/sections/about-hero"
import AboutUs from "@/components/sections/about-us"

export default function AboutPage(){

return(

<main className="bg-black text-white">

<Navbar/>

<AboutHero/>
<AboutUs/>

<Footer/>

</main>

)

}