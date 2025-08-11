import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "ÉLET-Közösség Egyesület | Önellátó életmód és ökológiai tudatosság";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ÉLET-Közösség Egyesület: önellátó életmód, hagyományőrzés és ökológiai tudatosság. Csatlakozz közösségünkhöz eseményeinkre, workshopokra és fenntartható jövő építéséhez.');
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Events />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Index;
