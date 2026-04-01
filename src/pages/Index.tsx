import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  useEffect(() => {
    document.title = "ÉLET-Közösség Egyesület | Önellátó életmód és ökológiai tudatosság";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ÉLET-Közösség Egyesület: önellátó életmód, hagyományőrzés és ökológiai tudatosság. Csatlakozz közösségünkhöz eseményeinkre, workshopokra és fenntartható jövő építéséhez.');
    }
  }, []);

  return (
    <main className="min-h-screen pt-16">
      <Navigation />
      <Hero />
      <About />
      <Blog />
      <Gallery />
      <Events />
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Index;
