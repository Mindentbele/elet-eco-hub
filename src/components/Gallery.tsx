import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { siteData, defaultGalleryItems, type GalleryItem } from "@/lib/siteData";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState("Összes");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref, isVisible } = useAnimateOnScroll();

  useEffect(() => {
    const saved = siteData.getGalleryItems();
    setItems(saved.length > 0 ? saved : defaultGalleryItems);
  }, []);

  const categories = ["Összes", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = filter === "Összes" ? items : items.filter((i) => i.category === filter);
  const active = lightbox !== null ? items.find((i) => i.id === lightbox) : null;

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Galéria</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pillantás közösségünk mindennapjaiba, eseményeinkre és alkotásainkra.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              className={filter === cat ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <Card
              key={item.id}
              className="aspect-square flex flex-col items-center justify-center cursor-pointer hover:shadow-organic transition-all duration-500 group overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => setLightbox(item.id)}
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <>
                  <span className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</span>
                  <span className="text-sm font-medium text-primary text-center px-2">{item.title}</span>
                </>
              )}
            </Card>
          ))}
        </div>

        {active && (
          <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <div className="bg-card rounded-2xl p-8 max-w-md w-full text-center relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setLightbox(null)}>
                <X className="h-5 w-5" />
              </Button>
              {active.imageUrl ? (
                <img src={active.imageUrl} alt={active.title} className="w-full rounded-lg mb-4" />
              ) : (
                <span className="text-8xl block mb-4">{active.emoji}</span>
              )}
              <h3 className="text-2xl font-bold text-primary mb-2">{active.title}</h3>
              <span className="text-sm text-muted-foreground">{active.category}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
