import { useEffect, useState } from "react";
import { siteData, SiteContent } from "@/lib/siteData";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Producers from "@/components/Producers";
import Faq from "@/components/Faq";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Nav from "@/components/Nav";

export default function Index() {
  const [c, setC] = useState<SiteContent>(siteData.get());
  useEffect(() => { setC(siteData.get()); }, []);
  return (
    <>
      <Nav content={c} />
      <Hero content={c} />
      <About content={c} />
      <HowItWorks content={c} />
      <Producers content={c} />
      <Faq content={c} />
      <Newsletter content={c} />
      <Contact content={c} />
      <Footer content={c} />
      <FloatingCTA content={c} />
    </>
  );
}
