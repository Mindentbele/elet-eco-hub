import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Plus, Trash2, LogIn, Upload, Image, Users } from "lucide-react";
import { Link } from "react-router-dom";
import {
  siteData,
  defaultTexts,
  defaultValues,
  defaultValuesList,
  defaultFooterLinks,
  defaultSocialLinks,
  type SiteTexts,
  type BlogPost,
  type GalleryItem,
  type EventItem,
  type NavItem,
  type ValueItem,
  type FooterLink,
  type SocialLink,
  type NewsletterSubscriber,
} from "@/lib/siteData";

// SHA-256 hash of the password "elet2024"
const ADMIN_PASS_HASH = "a1c0e55e3e4d22029b5318df71ba09a0855f41f4cf69362e4b4b9e4e99a7c8d0";

async function hashPassword(pass: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pass);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashed = await hashPassword(password);
    if (hashed === ADMIN_PASS_HASH) {
      setLoggedIn(true);
    } else {
      toast({ title: "Hibás jelszó!", variant: "destructive" });
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">Admin belépés</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full bg-primary"><LogIn className="mr-2 h-4 w-4" /> Belépés</Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Vissza az oldalra</Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-xl font-bold">ÉLET-Közösség Admin</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="texts">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="texts">Szövegek</TabsTrigger>
            <TabsTrigger value="values">Értékeink</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="gallery">Galéria</TabsTrigger>
            <TabsTrigger value="events">Események</TabsTrigger>
            <TabsTrigger value="nav">Menü</TabsTrigger>
            <TabsTrigger value="footer">Lábléc linkek</TabsTrigger>
            <TabsTrigger value="subscribers">Feliratkozók</TabsTrigger>
            <TabsTrigger value="logo">Logó</TabsTrigger>
          </TabsList>

          <TabsContent value="texts"><TextsEditor /></TabsContent>
          <TabsContent value="values"><ValuesEditor /></TabsContent>
          <TabsContent value="blog"><BlogEditor /></TabsContent>
          <TabsContent value="gallery"><GalleryEditor /></TabsContent>
          <TabsContent value="events"><EventsEditor /></TabsContent>
          <TabsContent value="nav"><NavEditor /></TabsContent>
          <TabsContent value="footer"><FooterLinksEditor /></TabsContent>
          <TabsContent value="subscribers"><SubscribersViewer /></TabsContent>
          <TabsContent value="logo"><LogoEditor /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// ---- Floating Add Button ----
function FloatingAddButton({ onClick, label = "Új" }: { onClick: () => void; label?: string }) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground h-14 w-14 md:h-auto md:w-auto md:px-6 md:rounded-xl transition-all"
      size="icon"
    >
      <Plus className="h-5 w-5 md:mr-2" />
      <span className="hidden md:inline">{label}</span>
    </Button>
  );
}

// ---- Text Editor ----
function TextsEditor() {
  const [texts, setTexts] = useState<SiteTexts>(defaultTexts);
  const { toast } = useToast();

  useEffect(() => { setTexts(siteData.getTexts()); }, []);

  const save = () => { siteData.setTexts(texts); toast({ title: "Szövegek mentve!" }); };

  const field = (label: string, key: keyof SiteTexts, multiline = false) => (
    <div key={key}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {multiline ? (
        <Textarea rows={3} value={texts[key]} onChange={(e) => setTexts({ ...texts, [key]: e.target.value })} />
      ) : (
        <Input value={texts[key]} onChange={(e) => setTexts({ ...texts, [key]: e.target.value })} />
      )}
    </div>
  );

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-primary">Szövegek szerkesztése</h2>
      {field("Főcím (Hero)", "heroTitle")}
      {field("Alcím (Hero)", "heroSubtitle", true)}
      {field("Rólunk leírás", "aboutDescription", true)}
      {field("Küldetés 1. bekezdés", "missionText", true)}
      {field("Küldetés 2. bekezdés", "missionParagraph2", true)}
      {field("Küldetés 3. bekezdés", "missionParagraph3", true)}
      {field("Hírlevél cím", "newsletterTitle")}
      {field("Hírlevél leírás", "newsletterDescription", true)}
      {field("Lábléc leírás", "footerDescription", true)}
      <h3 className="text-lg font-semibold text-primary pt-2">Kapcsolat</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {field("Email", "contactEmail")}
        {field("Telefon", "contactPhone")}
        {field("Cím", "contactAddress")}
      </div>
      <Button onClick={save} className="bg-primary"><Save className="mr-2 h-4 w-4" /> Mentés</Button>
    </Card>
  );
}

// ---- Values Editor ----
function ValuesEditor() {
  const [values, setValues] = useState<ValueItem[]>(defaultValues);
  const [valuesList, setValuesList] = useState<string[]>(defaultValuesList);
  const { toast } = useToast();

  useEffect(() => {
    setValues(siteData.getValues());
    setValuesList(siteData.getValuesList());
  }, []);

  const save = () => {
    siteData.setValues(values);
    siteData.setValuesList(valuesList);
    toast({ title: "Értékek mentve!" });
  };

  const updateValue = (id: number, field: keyof ValueItem, val: string) =>
    setValues(values.map((v) => (v.id === id ? { ...v, [field]: val } : v)));

  const addValue = () => setValues([...values, { id: Date.now(), icon: "Sprout", title: "Új érték", description: "" }]);
  const removeValue = (id: number) => setValues(values.filter((v) => v.id !== id));

  const updateListItem = (i: number, val: string) => {
    const n = [...valuesList]; n[i] = val; setValuesList(n);
  };
  const addListItem = () => setValuesList([...valuesList, "Új érték"]);
  const removeListItem = (i: number) => setValuesList(valuesList.filter((_, idx) => idx !== i));

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-primary">Értékkártyák (4 kártya)</h2>
      <p className="text-sm text-muted-foreground">Ikon opciók: Sprout, Home, BookOpen, Users2</p>
      {values.map((v) => (
        <div key={v.id} className="flex gap-2 items-start border rounded-lg p-3">
          <div className="space-y-2 flex-1">
            <div className="grid grid-cols-2 gap-2">
              <Input value={v.icon} onChange={(e) => updateValue(v.id, "icon", e.target.value)} placeholder="Ikon" />
              <Input value={v.title} onChange={(e) => updateValue(v.id, "title", e.target.value)} placeholder="Cím" />
            </div>
            <Textarea value={v.description} onChange={(e) => updateValue(v.id, "description", e.target.value)} placeholder="Leírás" rows={2} />
          </div>
          <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => removeValue(v.id)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button onClick={addValue} variant="outline" size="sm"><Plus className="mr-1 h-4 w-4" /> Új kártya</Button>

      <h2 className="text-xl font-bold text-primary pt-4">Értékeink lista (zöld doboz)</h2>
      {valuesList.map((v, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input value={v} onChange={(e) => updateListItem(i, e.target.value)} />
          <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => removeListItem(i)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button onClick={addListItem} variant="outline" size="sm"><Plus className="mr-1 h-4 w-4" /> Új elem</Button>

      <Button onClick={save} className="bg-primary"><Save className="mr-2 h-4 w-4" /> Értékek mentése</Button>
    </Card>
  );
}

// ---- Blog Editor ----
function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { toast } = useToast();

  useEffect(() => { setPosts(siteData.getBlogPosts()); }, []);

  const save = () => { siteData.setBlogPosts(posts); toast({ title: "Blog mentve!" }); };
  const add = () => setPosts([{ id: Date.now(), title: "Új bejegyzés", excerpt: "", content: "", date: new Date().toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" }) + ".", author: "", category: "", emoji: "📝" }, ...posts]);
  const update = (id: number, field: keyof BlogPost, value: string) => setPosts(posts.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  const remove = (id: number) => setPosts(posts.filter((p) => p.id !== id));

  const handleImage = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => update(id, "imageUrl" as keyof BlogPost, reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Blog bejegyzések ({posts.length})</h2>
      </div>
      {posts.map((post) => (
        <Card key={post.id} className="p-4 space-y-3 border-border">
          <div className="flex items-center justify-between">
            <Input value={post.emoji} onChange={(e) => update(post.id, "emoji", e.target.value)} className="w-16" placeholder="Emoji" />
            <div className="flex gap-1">
              <label className="cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(post.id, e.target.files[0])} />
                <Button variant="ghost" size="icon" asChild><span><Image className="h-4 w-4" /></span></Button>
              </label>
              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => remove(post.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
          {post.imageUrl && <img src={post.imageUrl} alt="" className="h-24 rounded object-cover" />}
          <Input value={post.title} onChange={(e) => update(post.id, "title", e.target.value)} placeholder="Cím" />
          <Textarea value={post.excerpt} onChange={(e) => update(post.id, "excerpt", e.target.value)} placeholder="Kivonat (rövid leírás)" rows={2} />
          <Textarea value={post.content || ""} onChange={(e) => update(post.id, "content" as keyof BlogPost, e.target.value)} placeholder="Teljes tartalom (ha üres, a kivonat jelenik meg)" rows={5} />
          <div className="grid grid-cols-3 gap-2">
            <Input value={post.author} onChange={(e) => update(post.id, "author", e.target.value)} placeholder="Szerző" />
            <Input value={post.category} onChange={(e) => update(post.id, "category", e.target.value)} placeholder="Kategória" />
            <Input value={post.date} onChange={(e) => update(post.id, "date", e.target.value)} placeholder="Dátum" />
          </div>
        </Card>
      ))}
      {posts.length > 0 && <Button onClick={save} className="bg-primary"><Save className="mr-2 h-4 w-4" /> Blog mentése</Button>}
      <FloatingAddButton onClick={add} label="Új blog" />
    </Card>
  );
}

// ---- Gallery Editor ----
function GalleryEditor() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => { setItems(siteData.getGalleryItems()); }, []);

  const save = () => { siteData.setGalleryItems(items); toast({ title: "Galéria mentve!" }); };
  const add = () => setItems([{ id: Date.now(), title: "Új kép", emoji: "📷", category: "Egyéb" }, ...items]);
  const update = (id: number, field: keyof GalleryItem, value: string) => setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  const remove = (id: number) => setItems(items.filter((i) => i.id !== id));

  const handleImage = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => update(id, "imageUrl" as keyof GalleryItem, reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Galéria ({items.length} kép)</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-4 space-y-2 border-border">
            <div className="flex items-center justify-between">
              <Input value={item.emoji} onChange={(e) => update(item.id, "emoji", e.target.value)} className="w-16" />
              <div className="flex gap-1">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(item.id, e.target.files[0])} />
                  <Button variant="ghost" size="icon" asChild><span><Image className="h-4 w-4" /></span></Button>
                </label>
                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            {item.imageUrl && <img src={item.imageUrl} alt="" className="h-20 rounded object-cover w-full" />}
            <Input value={item.title} onChange={(e) => update(item.id, "title", e.target.value)} placeholder="Cím" />
            <Input value={item.category} onChange={(e) => update(item.id, "category", e.target.value)} placeholder="Kategória" />
          </Card>
        ))}
      </div>
      {items.length > 0 && <Button onClick={save} className="bg-primary"><Save className="mr-2 h-4 w-4" /> Galéria mentése</Button>}
      <FloatingAddButton onClick={add} label="Új kép" />
    </Card>
  );
}

// ---- Events Editor ----
function EventsEditor() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const { toast } = useToast();

  useEffect(() => { setEvents(siteData.getEvents()); }, []);

  const save = () => { siteData.setEvents(events); toast({ title: "Események mentve!" }); };
  const add = () => setEvents([{ id: Date.now(), title: "Új esemény", date: "", time: "", location: "", description: "", participants: 0, image: "📅" }, ...events]);
  const update = (id: number, field: keyof EventItem, value: string | number) => setEvents(events.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  const remove = (id: number) => setEvents(events.filter((e) => e.id !== id));

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Események ({events.length})</h2>
      </div>
      {events.map((ev) => (
        <Card key={ev.id} className="p-4 space-y-3 border-border">
          <div className="flex items-center justify-between">
            <Input value={ev.image} onChange={(e) => update(ev.id, "image", e.target.value)} className="w-16" placeholder="Emoji" />
            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => remove(ev.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
          <Input value={ev.title} onChange={(e) => update(ev.id, "title", e.target.value)} placeholder="Cím" />
          <Textarea value={ev.description} onChange={(e) => update(ev.id, "description", e.target.value)} placeholder="Leírás" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Input value={ev.date} onChange={(e) => update(ev.id, "date", e.target.value)} placeholder="Dátum" />
            <Input value={ev.time} onChange={(e) => update(ev.id, "time", e.target.value)} placeholder="Időpont" />
            <Input value={ev.location} onChange={(e) => update(ev.id, "location", e.target.value)} placeholder="Helyszín" />
            <Input type="number" value={ev.participants} onChange={(e) => update(ev.id, "participants", parseInt(e.target.value) || 0)} placeholder="Résztvevők" />
          </div>
        </Card>
      ))}
      {events.length > 0 && <Button onClick={save} className="bg-primary"><Save className="mr-2 h-4 w-4" /> Események mentése</Button>}
      <FloatingAddButton onClick={add} label="Új esemény" />
    </Card>
  );
}

// ---- Nav Editor ----
function NavEditor() {
  const [items, setItems] = useState<NavItem[]>([]);
  const { toast } = useToast();

  useEffect(() => { setItems(siteData.getNavItems()); }, []);

  const save = () => { siteData.setNavItems(items); toast({ title: "Menü mentve!" }); };
  const add = () => setItems([...items, { name: "Új menüpont", href: "#" }]);
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Menüpontok</h2>
        <Button onClick={add} size="sm" className="bg-primary"><Plus className="mr-1 h-4 w-4" /> Új</Button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input value={item.name} onChange={(e) => { const n = [...items]; n[i] = { ...n[i], name: e.target.value }; setItems(n); }} placeholder="Név" />
          <Input value={item.href} onChange={(e) => { const n = [...items]; n[i] = { ...n[i], href: e.target.value }; setItems(n); }} placeholder="Link (#about)" />
          <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => remove(i)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button onClick={save} className="bg-primary"><Save className="mr-2 h-4 w-4" /> Menü mentése</Button>
    </Card>
  );
}

// ---- Footer Links Editor ----
function FooterLinksEditor() {
  const [links, setLinks] = useState<FooterLink[]>(defaultFooterLinks);
  const [social, setSocial] = useState<SocialLink[]>(defaultSocialLinks);
  const { toast } = useToast();

  useEffect(() => {
    setLinks(siteData.getFooterLinks());
    setSocial(siteData.getSocialLinks());
  }, []);

  const save = () => {
    siteData.setFooterLinks(links);
    siteData.setSocialLinks(social);
    toast({ title: "Lábléc linkek mentve!" });
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-primary">Lábléc linkek</h2>
      {links.map((link, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input value={link.name} onChange={(e) => { const n = [...links]; n[i] = { ...n[i], name: e.target.value }; setLinks(n); }} placeholder="Link neve" />
          <Input value={link.url} onChange={(e) => { const n = [...links]; n[i] = { ...n[i], url: e.target.value }; setLinks(n); }} placeholder="URL (https://...)" />
          <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => setLinks(links.filter((_, idx) => idx !== i))}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button onClick={() => setLinks([...links, { name: "Új link", url: "#" }])} variant="outline" size="sm"><Plus className="mr-1 h-4 w-4" /> Új link</Button>

      <h2 className="text-xl font-bold text-primary pt-4">Közösségi média linkek</h2>
      {social.map((s, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input value={s.platform} onChange={(e) => { const n = [...social]; n[i] = { ...n[i], platform: e.target.value }; setSocial(n); }} placeholder="Platform (Facebook)" className="w-32" />
          <Input value={s.url} onChange={(e) => { const n = [...social]; n[i] = { ...n[i], url: e.target.value }; setSocial(n); }} placeholder="URL" />
          <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => setSocial(social.filter((_, idx) => idx !== i))}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button onClick={() => setSocial([...social, { platform: "Facebook", url: "#" }])} variant="outline" size="sm"><Plus className="mr-1 h-4 w-4" /> Új közösségi link</Button>

      <Button onClick={save} className="bg-primary"><Save className="mr-2 h-4 w-4" /> Linkek mentése</Button>
    </Card>
  );
}

// ---- Logo Editor ----
function LogoEditor() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => { setLogoUrl(siteData.getLogo()); }, []);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setLogoUrl(url);
      siteData.setLogo(url);
      toast({ title: "Logó feltöltve!" });
    };
    reader.readAsDataURL(file);
  };

  const clear = () => {
    setLogoUrl(null);
    siteData.clearLogo();
    toast({ title: "Logó eltávolítva!" });
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-primary">Logó kezelés</h2>
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-card">
          {logoUrl ? <img src={logoUrl} alt="Logó" className="w-full h-full object-contain p-2" /> : <Upload className="h-8 w-8 text-muted-foreground" />}
        </div>
        <div className="space-y-2">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
          <Button onClick={() => fileRef.current?.click()} className="bg-primary"><Upload className="mr-2 h-4 w-4" /> Logó feltöltése</Button>
          {logoUrl && <Button variant="outline" className="ml-2 text-destructive" onClick={clear}><Trash2 className="mr-2 h-4 w-4" /> Eltávolítás</Button>}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">PNG vagy SVG formátum ajánlott, átlátszó háttérrel.</p>
    </Card>
  );
}

// ---- Subscribers Viewer ----
function SubscribersViewer() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const { toast } = useToast();

  useEffect(() => { setSubscribers(siteData.getSubscribers()); }, []);

  const remove = (id: number) => {
    const updated = subscribers.filter((s) => s.id !== id);
    setSubscribers(updated);
    siteData.setSubscribers(updated);
    toast({ title: "Feliratkozó törölve!" });
  };

  const exportCSV = () => {
    const csv = "Email,Dátum\n" + subscribers.map((s) => `${s.email},${s.date}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feliratkozok.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Hírlevél feliratkozók ({subscribers.length})</h2>
        {subscribers.length > 0 && (
          <Button onClick={exportCSV} variant="outline" size="sm">
            <Save className="mr-1 h-4 w-4" /> CSV export
          </Button>
        )}
      </div>
      {subscribers.length === 0 ? (
        <p className="text-muted-foreground">Még nincs feliratkozó.</p>
      ) : (
        <div className="space-y-2">
          {subscribers.map((s) => (
            <div key={s.id} className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <span className="font-medium">{s.email}</span>
                <span className="text-sm text-muted-foreground ml-3">{s.date}</span>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => remove(s.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default Admin;
