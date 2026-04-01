import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const galleryItems = [
  { id: 1, title: "Közösségi kertünk", emoji: "🌻", category: "Kert" },
  { id: 2, title: "Kenyérsütő workshop", emoji: "🍞", category: "Workshop" },
  { id: 3, title: "Gyógynövény gyűjtés", emoji: "🌿", category: "Természet" },
  { id: 4, title: "Őszi betakarítás", emoji: "🍂", category: "Kert" },
  { id: 5, title: "Közösségi főzés", emoji: "🍲", category: "Közösség" },
  { id: 6, title: "Vályogház építés", emoji: "🏡", category: "Építkezés" },
  { id: 7, title: "Méhészkedés tanfolyam", emoji: "🐝", category: "Workshop" },
  { id: 8, title: "Téli tájkép", emoji: "❄️", category: "Természet" },
];

const categories = ["Összes", "Kert", "Workshop", "Természet", "Közösség", "Építkezés"];

const Gallery = () => {
  const [filter, setFilter] = useState("Összes");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "Összes" ? galleryItems : galleryItems.filter((i) => i.category === filter);
  const active = lightbox !== null ? galleryItems.find((i) => i.id === lightbox) : null;

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Galéria</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pillantás közösségünk mindennapjaiba, eseményeinkre és alkotásainkra.
          </p>
        </div>

        {/* Filter */}
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

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="aspect-square flex flex-col items-center justify-center cursor-pointer hover:shadow-organic transition-all duration-300 group"
              onClick={() => setLightbox(item.id)}
            >
              <span className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</span>
              <span className="text-sm font-medium text-primary text-center px-2">{item.title}</span>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {active && (
          <div
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <div
              className="bg-card rounded-2xl p-8 max-w-md w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setLightbox(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              <span className="text-8xl block mb-4">{active.emoji}</span>
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
