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

export interface ValueItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface FooterLink {
  name: string;
  url: string;
}

export interface LegalPage {
  content: string;
  pdfUrl: string;
}

export interface LegalPages {
  [key: string]: LegalPage;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  date: string;
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

export const defaultValues: ValueItem[] = [
  { id: 1, icon: "Sprout", title: "Önellátás", description: "Saját élelmiszer termesztése, természetes alapanyagok használata és környezetbarát technológiák alkalmazása." },
  { id: 2, icon: "Home", title: "Természetközeli Életmód", description: "Harmóniában élni a természettel, fenntartható építkezés és energiahasználat." },
  { id: 3, icon: "BookOpen", title: "Hagyományőrzés", description: "Ősi mesterségek, népi tudás és kulturális értékek megőrzése és továbbadása." },
  { id: 4, icon: "Users2", title: "Közösségépítés", description: "Együttműködés, tapasztalatcsere és kölcsönös támogatás a tagok között." },
];

export const defaultValuesList: string[] = [
  "Környezettudatosság és fenntarthatóság",
  "Közösségi összetartás és szolidaritás",
  "Hagyományok tisztelete és megőrzése",
  "Önállóság és függetlenség",
  "Tanulás és tudásmegosztás",
];

export const defaultFooterLinks: FooterLink[] = [
  { name: "Adatvédelmi szabályzat", url: "/adatvedelmi-szabalyzat" },
  { name: "Felhasználási feltételek", url: "/felhasznalasi-feltetelek" },
  { name: "Kötelező jelentések", url: "/kotelezo-jelentesek" },
];

export const defaultLegalPages: LegalPages = {
  privacy: { content: "", pdfUrl: "" },
  terms: { content: "", pdfUrl: "" },
  reports: { content: "", pdfUrl: "" },
};

export const defaultSocialLinks: SocialLink[] = [
  { platform: "Facebook", url: "#" },
  { platform: "Instagram", url: "#" },
  { platform: "Youtube", url: "#" },
];

export const defaultBlogPosts: BlogPost[] = [
  { id: 1, title: "Hogyan kezdj el konyhakerti gazdálkodni?", excerpt: "Tippek és trükkök kezdőknek az otthoni kertgazdálkodáshoz.", content: "A konyhakerti gazdálkodás az egyik legjobb módja annak, hogy friss, egészséges zöldségeket termesszünk otthon. Kezdjük a tervezéssel: válasszuk ki a megfelelő helyet, ahol elegendő napfény éri a kertet. A talaj előkészítése kulcsfontosságú – komposztáljunk és javítsuk a talaj minőségét természetes módszerekkel.", date: "2024. szeptember 20.", author: "Kovács Anna", category: "Kertészkedés", emoji: "🌱" },
  { id: 2, title: "Hagyományos tartósítási módszerek", excerpt: "Őseink is ismerték: fermentálás, szárítás, füstölés.", content: "A tartósítás művészete évezredek óta velünk él. A fermentálás nemcsak megőrzi az ételeket, de gazdagítja is probiotikumokkal. A szárítás egyszerű és hatékony módszer, különösen gyümölcsök és gyógynövények esetén. A füstölés pedig egyedi ízt ad a húsoknak és sajtoknak.", date: "2024. szeptember 15.", author: "Nagy Péter", category: "Hagyomány", emoji: "🫙" },
  { id: 3, title: "Fenntartható építkezés természetes anyagokból", excerpt: "Vályog, szalma, fa — hogyan építsünk környezetbarát otthont?", content: "A természetes építőanyagok használata egyre népszerűbb. A vályogház kiváló hőszigetelést biztosít, a szalmaház pedig meglepően tartós és energiahatékony. A fa építkezés hagyományos és megújuló megoldás.", date: "2024. szeptember 10.", author: "Tóth László", category: "Építkezés", emoji: "🏡" },
  { id: 4, title: "Gyógynövények a házi patikában", excerpt: "A legfontosabb gyógynövények és felhasználásuk.", content: "A gyógynövények évezredek óta szolgálják az emberiséget. A kamilla nyugtató hatású, a borsmenta segít az emésztésben, a levendula pedig relaxál. Ismerjük meg közelebbről ezeket a csodálatos növényeket!", date: "2024. augusztus 28.", author: "Szabó Éva", category: "Egészség", emoji: "🌿" },
  { id: 5, title: "Közösségi gazdálkodás: együtt könnyebb", excerpt: "Hogyan szervezzünk közösségi kertet?", content: "A közösségi kertek nemcsak élelmet termelnek, hanem közösséget is építenek. A szervezés első lépése a megfelelő terület kiválasztása, majd a résztvevők toborzása és a feladatok elosztása.", date: "2024. augusztus 20.", author: "Molnár Gábor", category: "Közösség", emoji: "🤝" },
  { id: 6, title: "Esővíz gyűjtés és felhasználás", excerpt: "Lépésről lépésre útmutató az esővíz gyűjtő rendszer kialakításához.", content: "Az esővíz gyűjtés egyszerű és hatékony módja a vízmegtakarításnak. Egy alaprendszer telepítéséhez szükségünk van ereszcsatornára, szűrőre és tárolóedényre. Az összegyűjtött vizet öntözésre, takarításra és WC-öblítésre is felhasználhatjuk.", date: "2024. augusztus 12.", author: "Kiss Judit", category: "Fenntarthatóság", emoji: "💧" },
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

  getValues: () => getItem<ValueItem[]>("siteValues", defaultValues),
  setValues: (v: ValueItem[]) => setItem("siteValues", v),

  getValuesList: () => getItem<string[]>("siteValuesList", defaultValuesList),
  setValuesList: (v: string[]) => setItem("siteValuesList", v),

  getFooterLinks: () => getItem<FooterLink[]>("footerLinks", defaultFooterLinks),
  setFooterLinks: (l: FooterLink[]) => setItem("footerLinks", l),

  getSocialLinks: () => getItem<SocialLink[]>("socialLinks", defaultSocialLinks),
  setSocialLinks: (s: SocialLink[]) => setItem("socialLinks", s),

  getLogo: () => localStorage.getItem("siteLogoUrl"),
  setLogo: (url: string) => localStorage.setItem("siteLogoUrl", url),
  clearLogo: () => localStorage.removeItem("siteLogoUrl"),

  getSubscribers: () => getItem<NewsletterSubscriber[]>("newsletterSubscribers", []),
  setSubscribers: (s: NewsletterSubscriber[]) => setItem("newsletterSubscribers", s),
  addSubscriber: (email: string) => {
    const subs = getItem<NewsletterSubscriber[]>("newsletterSubscribers", []);
    if (subs.some((s) => s.email === email)) return false;
    subs.unshift({ id: Date.now(), email, date: new Date().toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" }) + "." });
    setItem("newsletterSubscribers", subs);
    return true;
  },
};
