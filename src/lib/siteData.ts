// Centralized site data management via localStorage

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category: string;
  emoji: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  emoji: string;
  category: string;
  imageUrl?: string;
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  participants: number;
  image: string;
}

export interface SiteTexts {
  heroTitle: string;
  heroSubtitle: string;
  aboutDescription: string;
  missionText: string;
  missionParagraph2: string;
  missionParagraph3: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  newsletterTitle: string;
  newsletterDescription: string;
  footerDescription: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export const defaultNavItems: NavItem[] = [
  { name: "Kezdőlap", href: "#home" },
  { name: "Rólunk", href: "#about" },
  { name: "Blog", href: "#blog" },
  { name: "Galéria", href: "#gallery" },
  { name: "Események", href: "#events" },
  { name: "Kapcsolat", href: "#contact" },
];

export const defaultTexts: SiteTexts = {
  heroTitle: "ÉLET-Közösség Egyesület",
  heroSubtitle: "Önellátó életmód, hagyományőrzés és ökológiai tudatosság. Csatlakozz közösségünkhöz a fenntartható jövőért!",
  aboutDescription: "Az ÉLET-Közösség Egyesület egy olyan közösség, amely az önellátó életmód, a hagyományőrzés és az ökológiai tudatosság jegyében működik. Célunk egy fenntartható jövő építése, ahol az ember és a természet harmóniában él.",
  missionText: "Egyesületünk 2020-ban alakult azzal a céllal, hogy összefogja azokat, akik hasonlóan gondolkodnak a fenntartható életmódról és a természettel való harmonikus együttélésről.",
  missionParagraph2: "Tapasztalatcserén, közös projekteken és rendezvényeken keresztül segítjük egymást abban, hogy minél függetlenebbé váljunk a modern fogyasztói társadalom káros hatásaitól.",
  missionParagraph3: "Hiszünk abban, hogy a hagyományos tudás és a modern technológia ötvözésével létrehozható egy olyan életmód, amely fenntartható és egészséges mind az egyén, mind a környezet számára.",
  contactEmail: "info@elet-kozosseg.hu",
  contactPhone: "+36 30 123 4567",
  contactAddress: "Budapest, Magyarország",
  newsletterTitle: "Maradj kapcsolatban velünk!",
  newsletterDescription: "Iratkozz fel hírlevelünkre, hogy elsőként értesülj eseményeinkről, hasznos tippjeinkről és közösségünk életéről.",
  footerDescription: "Önellátó életmód, hagyományőrzés és ökológiai tudatosság. Csatlakozz közösségünkhöz a fenntartható jövőért!",
};

export const defaultBlogPosts: BlogPost[] = [
  { id: 1, title: "Hogyan kezdj el konyhakerti gazdálkodni?", excerpt: "Tippek és trükkök kezdőknek az otthoni kertgazdálkodáshoz.", date: "2024. szeptember 20.", author: "Kovács Anna", category: "Kertészkedés", emoji: "🌱" },
  { id: 2, title: "Hagyományos tartósítási módszerek", excerpt: "Őseink is ismerték: fermentálás, szárítás, füstölés.", date: "2024. szeptember 15.", author: "Nagy Péter", category: "Hagyomány", emoji: "🫙" },
  { id: 3, title: "Fenntartható építkezés természetes anyagokból", excerpt: "Vályog, szalma, fa — hogyan építsünk környezetbarát otthont?", date: "2024. szeptember 10.", author: "Tóth László", category: "Építkezés", emoji: "🏡" },
  { id: 4, title: "Gyógynövények a házi patikában", excerpt: "A legfontosabb gyógynövények és felhasználásuk.", date: "2024. augusztus 28.", author: "Szabó Éva", category: "Egészség", emoji: "🌿" },
  { id: 5, title: "Közösségi gazdálkodás: együtt könnyebb", excerpt: "Hogyan szervezzünk közösségi kertet?", date: "2024. augusztus 20.", author: "Molnár Gábor", category: "Közösség", emoji: "🤝" },
  { id: 6, title: "Esővíz gyűjtés és felhasználás", excerpt: "Lépésről lépésre útmutató az esővíz gyűjtő rendszer kialakításához.", date: "2024. augusztus 12.", author: "Kiss Judit", category: "Fenntarthatóság", emoji: "💧" },
];

export const defaultGalleryItems: GalleryItem[] = [
  { id: 1, title: "Közösségi kertünk", emoji: "🌻", category: "Kert" },
  { id: 2, title: "Kenyérsütő workshop", emoji: "🍞", category: "Workshop" },
  { id: 3, title: "Gyógynövény gyűjtés", emoji: "🌿", category: "Természet" },
  { id: 4, title: "Őszi betakarítás", emoji: "🍂", category: "Kert" },
  { id: 5, title: "Közösségi főzés", emoji: "🍲", category: "Közösség" },
  { id: 6, title: "Vályogház építés", emoji: "🏡", category: "Építkezés" },
  { id: 7, title: "Méhészkedés tanfolyam", emoji: "🐝", category: "Workshop" },
  { id: 8, title: "Téli tájkép", emoji: "❄️", category: "Természet" },
];

export const defaultEvents: EventItem[] = [
  { id: 1, title: "Őszi betakarítási nap", date: "2024. október 15.", time: "09:00 - 17:00", location: "Közösségi kert, Budakeszi", description: "Közös betakarítás, befőzés és téli készületek.", participants: 25, image: "🍂" },
  { id: 2, title: "Hagyományos kenyérsütő workshop", date: "2024. október 22.", time: "10:00 - 16:00", location: "Falusi ház, Szentendre", description: "Tanulj meg kovászos kenyeret sütni.", participants: 15, image: "🍞" },
  { id: 3, title: "Természeti séta és gyógynövény gyűjtés", date: "2024. november 5.", time: "08:00 - 14:00", location: "Pilis hegység", description: "Ismerkedj meg a gyógynövényekkel.", participants: 20, image: "🌿" },
  { id: 4, title: "Téli felkészülés workshop", date: "2024. november 12.", time: "09:00 - 15:00", location: "Közösségi ház, Gödöllő", description: "Készülj fel a télre! Tartósítás, fűtés.", participants: 30, image: "❄️" },
];

// Helper functions
function getItem<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const siteData = {
  getTexts: () => getItem<SiteTexts>("siteTexts", defaultTexts),
  setTexts: (t: SiteTexts) => setItem("siteTexts", t),

  getBlogPosts: () => getItem<BlogPost[]>("blogPosts", defaultBlogPosts),
  setBlogPosts: (p: BlogPost[]) => setItem("blogPosts", p),

  getGalleryItems: () => getItem<GalleryItem[]>("galleryItems", defaultGalleryItems),
  setGalleryItems: (g: GalleryItem[]) => setItem("galleryItems", g),

  getEvents: () => getItem<EventItem[]>("siteEvents", defaultEvents),
  setEvents: (e: EventItem[]) => setItem("siteEvents", e),

  getNavItems: () => getItem<NavItem[]>("navItems", defaultNavItems),
  setNavItems: (n: NavItem[]) => setItem("navItems", n),

  getLogo: () => localStorage.getItem("siteLogoUrl"),
  setLogo: (url: string) => localStorage.setItem("siteLogoUrl", url),
  clearLogo: () => localStorage.removeItem("siteLogoUrl"),
};
