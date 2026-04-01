import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Plus, Trash2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const ADMIN_PASS = "elet2024";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  emoji: string;
}

interface SiteTexts {
  heroTitle: string;
  heroSubtitle: string;
  aboutDescription: string;
  missionText: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const defaultTexts: SiteTexts = {
  heroTitle: "ÉLET-Közösség Egyesület",
  heroSubtitle: "Önellátó életmód, hagyományőrzés és ökológiai tudatosság. Csatlakozz közösségünkhöz a fenntartható jövőért!",
  aboutDescription: "Az ÉLET-Közösség Egyesület egy olyan közösség, amely az önellátó életmód, a hagyományőrzés és az ökológiai tudatosság jegyében működik.",
  missionText: "Egyesületünk 2020-ban alakult azzal a céllal, hogy összefogja azokat, akik hasonlóan gondolkodnak a fenntartható életmódról.",
  contactEmail: "info@elet-kozosseg.hu",
  contactPhone: "+36 30 123 4567",
  contactAddress: "Budapest, Magyarország",
};

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [texts, setTexts] = useState<SiteTexts>(defaultTexts);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("siteTexts");
    if (saved) setTexts(JSON.parse(saved));
    const savedBlog = localStorage.getItem("blogPosts");
    if (savedBlog) setBlogPosts(JSON.parse(savedBlog));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setLoggedIn(true);
    } else {
      toast({ title: "Hibás jelszó!", variant: "destructive" });
    }
  };

  const saveTexts = () => {
    localStorage.setItem("siteTexts", JSON.stringify(texts));
    toast({ title: "Szövegek mentve!", description: "A változtatások azonnal érvénybe lépnek." });
  };

  const saveBlog = () => {
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
    toast({ title: "Blog bejegyzések mentve!" });
  };

  const addPost = () => {
    setBlogPosts([
      ...blogPosts,
      {
        id: Date.now(),
        title: "Új bejegyzés",
        excerpt: "",
        date: new Date().toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" }) + ".",
        author: "",
        category: "",
        emoji: "📝",
      },
    ]);
  };

  const updatePost = (id: number, field: keyof BlogPost, value: string) => {
    setBlogPosts(blogPosts.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const deletePost = (id: number) => {
    setBlogPosts(blogPosts.filter((p) => p.id !== id));
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">Admin belépés</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full bg-primary">
              <LogIn className="mr-2 h-4 w-4" /> Belépés
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Vissza az oldalra
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">ÉLET-Közösség Admin</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="texts">
          <TabsList className="mb-6">
            <TabsTrigger value="texts">Szövegek</TabsTrigger>
            <TabsTrigger value="blog">Blog kezelés</TabsTrigger>
          </TabsList>

          <TabsContent value="texts">
            <Card className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-primary">Oldal szövegek szerkesztése</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Főcím</label>
                  <Input value={texts.heroTitle} onChange={(e) => setTexts({ ...texts, heroTitle: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Alcím / leírás</label>
                  <Textarea value={texts.heroSubtitle} onChange={(e) => setTexts({ ...texts, heroSubtitle: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Rólunk szekció</label>
                  <Textarea rows={4} value={texts.aboutDescription} onChange={(e) => setTexts({ ...texts, aboutDescription: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Küldetés szöveg</label>
                  <Textarea rows={4} value={texts.missionText} onChange={(e) => setTexts({ ...texts, missionText: e.target.value })} />
                </div>

                <h3 className="text-lg font-semibold text-primary pt-4">Kapcsolat adatok</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input value={texts.contactEmail} onChange={(e) => setTexts({ ...texts, contactEmail: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Telefon</label>
                    <Input value={texts.contactPhone} onChange={(e) => setTexts({ ...texts, contactPhone: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Cím</label>
                    <Input value={texts.contactAddress} onChange={(e) => setTexts({ ...texts, contactAddress: e.target.value })} />
                  </div>
                </div>
              </div>

              <Button onClick={saveTexts} className="bg-primary">
                <Save className="mr-2 h-4 w-4" /> Szövegek mentése
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary">Blog bejegyzések</h2>
                <Button onClick={addPost} size="sm" className="bg-primary">
                  <Plus className="mr-1 h-4 w-4" /> Új bejegyzés
                </Button>
              </div>

              {blogPosts.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Még nincsenek admin blog bejegyzések. Kattints az "Új bejegyzés" gombra!
                </p>
              )}

              <div className="space-y-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="p-4 space-y-3 border-border">
                    <div className="flex items-center justify-between">
                      <Input
                        value={post.emoji}
                        onChange={(e) => updatePost(post.id, "emoji", e.target.value)}
                        className="w-16"
                        placeholder="Emoji"
                      />
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deletePost(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input value={post.title} onChange={(e) => updatePost(post.id, "title", e.target.value)} placeholder="Cím" />
                    <Textarea value={post.excerpt} onChange={(e) => updatePost(post.id, "excerpt", e.target.value)} placeholder="Kivonat / leírás" />
                    <div className="grid grid-cols-3 gap-2">
                      <Input value={post.author} onChange={(e) => updatePost(post.id, "author", e.target.value)} placeholder="Szerző" />
                      <Input value={post.category} onChange={(e) => updatePost(post.id, "category", e.target.value)} placeholder="Kategória" />
                      <Input value={post.date} onChange={(e) => updatePost(post.id, "date", e.target.value)} placeholder="Dátum" />
                    </div>
                  </Card>
                ))}
              </div>

              {blogPosts.length > 0 && (
                <Button onClick={saveBlog} className="bg-primary">
                  <Save className="mr-2 h-4 w-4" /> Blog mentése
                </Button>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
