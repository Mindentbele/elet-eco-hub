import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-warm-gold rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">É</span>
              </div>
              <span className="text-xl font-bold">ÉLET-Közösség</span>
            </div>
            <p className="text-primary-foreground/80">
              Önellátó életmód, hagyományőrzés és ökológiai tudatosság. 
              Csatlakozz közösségünkhöz a fenntartható jövőért!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Gyors linkek</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-primary-foreground/80 hover:text-warm-gold transition-colors">Kezdőlap</a></li>
              <li><a href="#about" className="text-primary-foreground/80 hover:text-warm-gold transition-colors">Rólunk</a></li>
              <li><a href="#blog" className="text-primary-foreground/80 hover:text-warm-gold transition-colors">Blog</a></li>
              <li><a href="#events" className="text-primary-foreground/80 hover:text-warm-gold transition-colors">Események</a></li>
              <li><a href="#gallery" className="text-primary-foreground/80 hover:text-warm-gold transition-colors">Galéria</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kapcsolat</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-primary-foreground/80">info@elet-kozosseg.hu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-primary-foreground/80">+36 30 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-primary-foreground/80">Budapest, Magyarország</span>
              </div>
            </div>
          </div>

          {/* Social Media and Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kövess minket</h4>
            <div className="flex space-x-3 mb-6">
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-warm-gold hover:bg-primary-foreground/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-warm-gold hover:bg-primary-foreground/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-warm-gold hover:bg-primary-foreground/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              <a href="#" className="text-primary-foreground/80 hover:text-warm-gold transition-colors block text-sm">Adatvédelmi szabályzat</a>
              <a href="#" className="text-primary-foreground/80 hover:text-warm-gold transition-colors block text-sm">Felhasználási feltételek</a>
              <a href="#" className="text-primary-foreground/80 hover:text-warm-gold transition-colors block text-sm">Kötelező jelentések</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 ÉLET-Közösség Egyesület. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;