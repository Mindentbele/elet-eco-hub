import { Card } from "@/components/ui/card";
import { Sprout, Home, BookOpen, Users2 } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Sprout,
      title: "Önellátás",
      description: "Saját élelmiszer termesztése, természetes alapanyagok használata és környezetbarát technológiák alkalmazása."
    },
    {
      icon: Home,
      title: "Természetközeli Életmód",
      description: "Harmóniában élni a természettel, fenntartható építkezés és energiahasználat."
    },
    {
      icon: BookOpen,
      title: "Hagyományőrzés",
      description: "Ősi mesterségek, népi tudás és kulturális értékek megőrzése és továbbadása."
    },
    {
      icon: Users2,
      title: "Közösségépítés",
      description: "Együttműködés, tapasztalatcsere és kölcsönös támogatás a tagok között."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Rólunk
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Az ÉLET-Közösség Egyesület egy olyan közösség, amely az önellátó életmód, 
            a hagyományőrzés és az ökológiai tudatosság jegyében működik. Célunk egy 
            fenntartható jövő építése, ahol az ember és a természet harmóniában él.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-organic transition-all duration-300 border-border/50">
              <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              Küldetésünk
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Egyesületünk 2020-ban alakult azzal a céllal, hogy összefogja azokat, 
                akik hasonlóan gondolkodnak a fenntartható életmódról és a természettel 
                való harmonikus együttélésről.
              </p>
              <p>
                Tapasztalatcserén, közös projekteken és rendezvényeken keresztül 
                segítjük egymást abban, hogy minél függetlenebbé váljunk a modern 
                fogyasztói társadalom káros hatásaitól.
              </p>
              <p>
                Hiszünk abban, hogy a hagyományos tudás és a modern technológia 
                ötvözésével létrehozható egy olyan életmód, amely fenntartható és 
                egészséges mind az egyén, mind a környezet számára.
              </p>
            </div>
          </div>
          
          <div className="bg-nature-gradient p-8 rounded-2xl text-white">
            <h4 className="text-xl font-bold mb-4">Értékeink</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-warm-gold rounded-full mr-3"></div>
                Környezettudatosság és fenntarthatóság
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-warm-gold rounded-full mr-3"></div>
                Közösségi összetartás és szolidaritás
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-warm-gold rounded-full mr-3"></div>
                Hagyományok tisztelete és megőrzése
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-warm-gold rounded-full mr-3"></div>
                Önállóság és függetlenség
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-warm-gold rounded-full mr-3"></div>
                Tanulás és tudásmegosztás
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;