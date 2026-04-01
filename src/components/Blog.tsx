import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Hogyan kezdj el konyhakerti gazdálkodni?",
    excerpt: "Tippek és trükkök kezdőknek az otthoni kertgazdálkodáshoz. Ismerd meg a legfontosabb lépéseket a sikeres termesztéshez.",
    date: "2024. szeptember 20.",
    author: "Kovács Anna",
    category: "Kertészkedés",
    emoji: "🌱",
  },
  {
    id: 2,
    title: "Hagyományos tartósítási módszerek",
    excerpt: "Őseink is ismerték: fermentálás, szárítás, füstölés. Fedezd fel a természetes tartósítás titkait!",
    date: "2024. szeptember 15.",
    author: "Nagy Péter",
    category: "Hagyomány",
    emoji: "🫙",
  },
  {
    id: 3,
    title: "Fenntartható építkezés természetes anyagokból",
    excerpt: "Vályog, szalma, fa — hogyan építsünk környezetbarát otthont minimális ökológiai lábnyommal?",
    date: "2024. szeptember 10.",
    author: "Tóth László",
    category: "Építkezés",
    emoji: "🏡",
  },
  {
    id: 4,
    title: "Gyógynövények a házi patikában",
    excerpt: "A legfontosabb gyógynövények és felhasználásuk. Készíts otthon tinktúrákat, teákat és kenőcsöket.",
    date: "2024. augusztus 28.",
    author: "Szabó Éva",
    category: "Egészség",
    emoji: "🌿",
  },
  {
    id: 5,
    title: "Közösségi gazdálkodás: együtt könnyebb",
    excerpt: "Hogyan szervezzünk közösségi kertet? Tapasztalatok és sikertörténetek csapatmunkáról.",
    date: "2024. augusztus 20.",
    author: "Molnár Gábor",
    category: "Közösség",
    emoji: "🤝",
  },
  {
    id: 6,
    title: "Esővíz gyűjtés és felhasználás",
    excerpt: "Lépésről lépésre útmutató az esővíz gyűjtő rendszer kialakításához és hatékony felhasználásához.",
    date: "2024. augusztus 12.",
    author: "Kiss Judit",
    category: "Fenntarthatóság",
    emoji: "💧",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Blog</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Olvasd cikkeinket az önellátásról, hagyományőrzésről és fenntartható életmódról.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-organic transition-all duration-300 group"
            >
              <div className="h-40 bg-muted/50 flex items-center justify-center text-6xl">
                {post.emoji}
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-foreground bg-accent/20 px-3 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Összes bejegyzés <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
