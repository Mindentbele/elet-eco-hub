import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logoDefault from "@/assets/logo-default.svg";
import { siteData, defaultTexts } from "@/lib/siteData";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Footer = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [texts, setTexts] = useState(defaultTexts);
  const { ref, isVisible } = useAnimateOnScroll();

  useEffect(() => {
    const stored = siteData.getLogo();
    if (stored) setLogoUrl(stored);
    setTexts(siteData.getTexts());
  }, []);

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div
        ref={ref}
        className={`container mx-auto px-4 py-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center overflow-hidden p-1 shrink-0 bg-card">
                <img src={logoUrl ?? logoDefault} alt="ÉLET-Közösség logó" className="w-full h-full object-contain rounded-lg" loading="lazy" />
              </div>
              <span className="text-xl font-bold">ÉLET-Közösség</span>
            </div>
            <p className="text-primary-foreground/80">{texts.footerDescription}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Gyors linkek</h4>
            <ul className="space-y-2">
              {["Kezdőlap:#home", "Rólunk:#about", "Blog:#blog", "Események:#events", "Galéria:#gallery"].map((l) => {
                const [name, href] = l.split(":");
                return <li key={name}><a href={href} className="text-primary-foreground/80 hover:text-warm-gold transition-colors">{name}</a></li>;
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kapcsolat</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2"><Mail className="h-4 w-4" /><span className="text-primary-foreground/80">{texts.contactEmail}</span></div>
              <div className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span className="text-primary-foreground/80">{texts.contactPhone}</span></div>
              <div className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span className="text-primary-foreground/80">{texts.contactAddress}</span></div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kövess minket</h4>
            <div className="flex space-x-3 mb-6">
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-warm-gold hover:bg-primary-foreground/10"><Facebook className="h-5 w-5" /></Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-warm-gold hover:bg-primary-foreground/10"><Instagram className="h-5 w-5" /></Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-warm-gold hover:bg-primary-foreground/10"><Youtube className="h-5 w-5" /></Button>
            </div>
            <div className="space-y-2">
              <a href="#" className="text-primary-foreground/80 hover:text-warm-gold transition-colors block text-sm">Adatvédelmi szabályzat</a>
              <a href="#" className="text-primary-foreground/80 hover:text-warm-gold transition-colors block text-sm">Felhasználási feltételek</a>
              <a href="#" className="text-primary-foreground/80 hover:text-warm-gold transition-colors block text-sm">Kötelező jelentések</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">© 2024 ÉLET-Közösség Egyesület. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
