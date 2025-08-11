import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Users, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="ÉLET-Közösség - Önellátó közösség a természetben"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">ÉLET-Közösség</span>
            <span className="block text-warm-gold">Egyesület</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Önellátó életmód, hagyományőrzés és ökológiai tudatosság. 
            Csatlakozz közösségünkhöz a fenntartható jövőért!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-nature-glow"
            >
              Tudj meg többet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
            >
              Csatlakozz hozzánk
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Leaf className="h-8 w-8 text-warm-gold mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Ökológiai Tudatosság</h3>
              <p className="text-white/80 text-sm">Fenntartható életmód és környezetvédelem</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-warm-gold mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Közösség</h3>
              <p className="text-white/80 text-sm">Együttműködés és kölcsönös segítségnyújtás</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Heart className="h-8 w-8 text-warm-gold mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Hagyományőrzés</h3>
              <p className="text-white/80 text-sm">Ősi tudás megőrzése és továbbadása</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;