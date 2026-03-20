import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutHero from "@/components/sections/about-hero"
import AboutUs from "@/components/sections/about-us"
import TrainersSection from "@/components/sections/TrainersSection"
import AboutStats from "@/components/sections/AboutStats"
import TopStrip from "@/components/sections/TopStrip"
import { EquipmentGrid } from "@/components/ui/equipment-grid"
import MissionSection from "@/components/sections/mission-section"
import GymForm from "@/components/sections/GymForm"

export default function AboutPage(){

return(

<main className="bg-black text-white">
<TopStrip/>
<Navbar/>

<AboutHero/>
<AboutUs/>
<TrainersSection/>
<AboutStats/>
<MissionSection/>
<EquipmentGrid/>
<GymForm/>


<Footer/>

</main>

)

}