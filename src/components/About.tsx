import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sprout, Home, BookOpen, Users2 } from "lucide-react";
import { siteData, defaultTexts, defaultValues, defaultValuesList, type ValueItem } from "@/lib/siteData";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const iconMap: Record<string, React.ElementType> = { Sprout, Home, BookOpen, Users2 };

// Parses [label](url) markdown links and plain http(s) URLs into clickable anchors
const renderWithLinks = (text: string) => {
  if (!text) return null;
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const label = match[1] ?? match[3];
    const url = match[2] ?? match[3];
    parts.push(
      <a
        key={key++}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80"
      >
        {label}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};

const About = () => {
  const [texts, setTexts] = useState(defaultTexts);
  const [values, setValues] = useState<ValueItem[]>(defaultValues);
  const [valuesList, setValuesList] = useState<string[]>(defaultValuesList);
  const { ref, isVisible } = useAnimateOnScroll();

  useEffect(() => {
    setTexts(siteData.getTexts());
    setValues(siteData.getValues());
    setValuesList(siteData.getValuesList());
  }, []);

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Rólunk</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {renderWithLinks(texts.aboutDescription)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => {
            const isCustom = value.icon?.startsWith("data:");
            const Icon = iconMap[value.icon] || Sprout;
            return (
              <Card key={value.id || index} className="p-6 text-center hover:shadow-organic transition-all duration-300 border-border/50 hover:-translate-y-1">
                {isCustom ? (
                  <img src={value.icon} alt="" className="h-12 w-12 mx-auto mb-4 object-contain" />
                ) : (
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                )}
                <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground whitespace-pre-line">{renderWithLinks(value.description)}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">Küldetésünk</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="whitespace-pre-line">{renderWithLinks(texts.missionText)}</p>
              <p className="whitespace-pre-line">{renderWithLinks(texts.missionParagraph2)}</p>
              <p className="whitespace-pre-line">{renderWithLinks(texts.missionParagraph3)}</p>
            </div>
          </div>
          <div className="bg-nature-gradient p-8 rounded-2xl text-white">
            <h4 className="text-xl font-bold mb-4">Értékeink</h4>
            <ul className="space-y-3">
              {valuesList.map((v) => (
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
