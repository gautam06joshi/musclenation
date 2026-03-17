import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import Features from "@/components/sections/features"
import Gallery from "@/components/sections/gallery"
import PricingSection from "@/components/sections/pricing-section"
import Footer from "@/components/footer"
import Testimonials from "@/components/sections/testimonials"
import Services from "@/components/sections/services"
import WhyChooseUs from "@/components/sections/why-choose-us"
import ScrollVelocity from "@/components/ui/ScrollVelocity"
import GymForm from "@/components/sections/GymForm"
import TopStrip from "@/components/sections/TopStrip"

export default function Home(){

return(

<main>
    <TopStrip/>

<Navbar/>

<Hero/>

<Gallery/>

<Services/>

<WhyChooseUs/>

<PricingSection/>

<Testimonials/> 

<ScrollVelocity
  texts={['Build your dream body', 'Join Muscle Nation today']} 
  velocity={40}
  className="custom-scroll-text"
/>
<GymForm/>
<Footer/>

</main>

)

}