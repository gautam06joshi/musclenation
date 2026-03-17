import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import GalleryHero from "@/components/sections/GalleryHero";
import TopStrip from "@/components/sections/TopStrip";

export default function GalleryPage(){

return(

<main className="bg-black text-white">
    <TopStrip/>
    <Navbar/>

<GalleryHero/>
<Footer/>

</main>

)

}