import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { siteData, defaultTexts } from "@/lib/siteData";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [lastSubmit, setLastSubmit] = useState(0);
  const [texts, setTexts] = useState(defaultTexts);
  const { toast } = useToast();
  const { ref, isVisible } = useAnimateOnScroll();

  useEffect(() => {
    setTexts(siteData.getTexts());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Spam protection: honeypot field
    if (honeypot) return;
    // Rate limiting: max 1 submission per 30 seconds
    const now = Date.now();
    if (now - lastSubmit < 30000) {
      toast({ title: "Túl gyors!", description: "Kérjük várj egy kicsit a következő feliratkozás előtt.", variant: "destructive" });
      return;
    }
    if (email) {
      const added = siteData.addSubscriber(email);
      if (added) {
        toast({ title: "Sikeres feliratkozás!", description: "Köszönjük, hogy feliratkoztál hírlevelünkre." });
        setLastSubmit(now);
      } else {
        toast({ title: "Már feliratkoztál!", description: "Ezzel az email címmel már korábban feliratkoztál." });
      }
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-earth-gradient">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <Mail className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{texts.newsletterTitle}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{texts.newsletterDescription}</p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              {/* Honeypot - hidden from real users */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute opacity-0 h-0 w-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Input type="email" placeholder="Add meg az email címed" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm" required />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-nature-glow">
                  <Send className="mr-2 h-4 w-4" /> Feliratkozás
                </Button>
              </div>
            </form>
            <p className="text-white/70 text-sm mt-4">Bármikor leiratkozhatsz. Adataidat biztonságban kezeljük.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
