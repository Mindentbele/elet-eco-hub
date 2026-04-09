import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Map } from "lucide-react";
import logoDefault from "@/assets/logo-default.svg";
import { siteData, defaultTexts, defaultFooterLinks, defaultSocialLinks, type FooterLink, type SocialLink } from "@/lib/siteData";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const socialIconMap: Record<string, React.ElementType> = { Facebook, Instagram, Youtube };

const Footer = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [texts, setTexts] = useState(defaultTexts);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>(defaultFooterLinks);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [showMap, setShowMap] = useState(false);
  const { ref, isVisible } = useAnimateOnScroll();

  useEffect(() => {
    const stored = siteData.getLogo();
    if (stored) setLogoUrl(stored);
    setTexts(siteData.getTexts());
    setFooterLinks(siteData.getFooterLinks());
    setSocialLinks(siteData.getSocialLinks());
  }, []);

  const mapQuery = encodeURIComponent(texts.contactAddress);

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
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-warm-gold hover:bg-primary-foreground/10 p-0 h-auto mt-1"
                onClick={() => setShowMap(true)}
              >
                <Map className="h-4 w-4 mr-1" /> Térkép megnyitása
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kövess minket</h4>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((s) => {
                const Icon = socialIconMap[s.platform] || Facebook;
                return (
                  <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-warm-gold hover:bg-primary-foreground/10">
                      <Icon className="h-5 w-5" />
                    </Button>
                  </a>
                );
              })}
            </div>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <a key={link.name} href={link.url} target={link.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-warm-gold transition-colors block text-sm">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">© 2024 ÉLET-Közösség Egyesület. Minden jog fenntartva.</p>
        </div>
      </div>

      {/* Map modal */}
      {showMap && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" onClick={() => setShowMap(false)}>
          <div className="bg-card rounded-2xl overflow-hidden max-w-3xl w-full relative animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold text-primary">📍 {texts.contactAddress}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMap(false)}>✕</Button>
            </div>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Térkép"
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
