import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHero from "@/components/sections/about-hero"
import AboutUs from "@/components/sections/about-us"
import TrainersSection from "@/components/sections/TrainersSection"
import AboutStats from "@/components/sections/AboutStats"
import TopStrip from "@/components/sections/TopStrip"

export default function AboutPage(){

return(

<main className="bg-black text-white">
<TopStrip/>
<Navbar/>

<AboutHero/>
<AboutUs/>
<TrainersSection/>
<AboutStats/>

<Footer/>

</main>

)

}