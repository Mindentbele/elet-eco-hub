import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Sikeres feliratkozás!",
        description: "Köszönjük, hogy feliratkoztál hírlevelünkre.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-earth-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <Mail className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Maradj kapcsolatban velünk!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Iratkozz fel hírlevelünkre, hogy elsőként értesülj eseményeinkről, 
              hasznos tippjeinkről és közösségünk életéről.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Add meg az email címed"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-nature-glow"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Feliratkozás
                </Button>
              </div>
            </form>
            
            <p className="text-white/70 text-sm mt-4">
              Bármikor leiratkozhatsz. Adataidat biztonságban kezeljük.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;