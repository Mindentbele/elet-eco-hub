import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sprout, Home, BookOpen, Users2 } from "lucide-react";
import { siteData, defaultTexts } from "@/lib/siteData";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const About = () => {
  const [texts, setTexts] = useState(defaultTexts);
  const { ref, isVisible } = useAnimateOnScroll();

  useEffect(() => {
    setTexts(siteData.getTexts());
  }, []);

  const values = [
    { icon: Sprout, title: "Önellátás", description: "Saját élelmiszer termesztése, természetes alapanyagok használata és környezetbarát technológiák alkalmazása." },
    { icon: Home, title: "Természetközeli Életmód", description: "Harmóniában élni a természettel, fenntartható építkezés és energiahasználat." },
    { icon: BookOpen, title: "Hagyományőrzés", description: "Ősi mesterségek, népi tudás és kulturális értékek megőrzése és továbbadása." },
    { icon: Users2, title: "Közösségépítés", description: "Együttműködés, tapasztalatcsere és kölcsönös támogatás a tagok között." },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Rólunk</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {texts.aboutDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-organic transition-all duration-300 border-border/50 hover:-translate-y-1">
              <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">Küldetésünk</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{texts.missionText}</p>
              <p>{texts.missionParagraph2}</p>
              <p>{texts.missionParagraph3}</p>
            </div>
          </div>
          <div className="bg-nature-gradient p-8 rounded-2xl text-white">
            <h4 className="text-xl font-bold mb-4">Értékeink</h4>
            <ul className="space-y-3">
              {["Környezettudatosság és fenntarthatóság", "Közösségi összetartás és szolidaritás", "Hagyományok tisztelete és megőrzése", "Önállóság és függetlenség", "Tanulás és tudásmegosztás"].map((v) => (
                <li key={v} className="flex items-center">
                  <div className="w-2 h-2 bg-warm-gold rounded-full mr-3"></div>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
