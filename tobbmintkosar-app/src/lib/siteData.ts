// LocalStorage-based site data store for "Több, mint kosár"

export type Producer = { id: string; name: string; description: string; emoji: string; bgColor: "leaf" | "tomato" | "cream" };
export type Faq = { id: string; question: string; answer: string };
export type BasketItem = { id: string; emoji: string; bg: "leaf" | "tomato" | "cream" };
export type HowStep = { id: string; emoji: string; title: string; desc: string };
export type NavLink = { id: string; label: string; target: string };

export type SiteContent = {
  // Branding
  logoDataUrl: string | null;
  brandName: string;
  heroImageUrl: string | null; // data URL of custom hero image (optional)

  // Nav
  navLinks: NavLink[];
  navCtaLabel: string;

  // Hero
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleAccent: string;
  heroTitleLine2Prefix: string;
  heroTitleLine2Accent: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroBenefit1: string;
  heroBenefit2: string;
  heroBenefit3: string;
  basketCaption: string;
  basketItems: BasketItem[];

  // About
  aboutKicker: string;
  aboutTitle: string;
  aboutBody: string;
  aboutCard1Emoji: string; aboutCard1Title: string; aboutCard1Desc: string;
  aboutCard2Emoji: string; aboutCard2Title: string; aboutCard2Desc: string;
  aboutCard3Emoji: string; aboutCard3Title: string; aboutCard3Desc: string;

  // How it works
  howKicker: string;
  howTitle: string;
  howSteps: HowStep[];
  howCtaLabel: string;

  // Producers
  producersKicker: string;
  producersTitle: string;
  producersIntro: string;
  producers: Producer[];

  // FAQ
  faqKicker: string;
  faqTitle: string;
  faqs: Faq[];

  // Newsletter
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterCta: string;
  newsletterFinePrint: string;

  // Contact
  contactTitle: string;
  contactSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  mapEmbedUrl: string;
  contactShopCta: string;

  // Shop + footer
  shopUrl: string;
  footerText: string;
  footerShopLabel: string;
  floatingCtaLabel: string;
};

const KEY_CONTENT = "tmk_content_v2";
const KEY_SUBS = "tmk_subscribers_v1";

const uid = () => Math.random().toString(36).slice(2, 10);

export const defaultContent: SiteContent = {
  logoDataUrl: null,
  brandName: "Több, mint kosár",
  heroImageUrl: null,

  navLinks: [
    { id: uid(), label: "Rólunk", target: "about" },
    { id: uid(), label: "Hogyan működik", target: "how" },
    { id: uid(), label: "Termelők", target: "producers" },
    { id: uid(), label: "GYIK", target: "faq" },
    { id: uid(), label: "Kapcsolat", target: "contact" },
  ],
  navCtaLabel: "Irány a shop →",

  heroBadge: "🌿 Helyi · Friss · Szezonális",
  heroTitleLine1: "Több, mint",
  heroTitleAccent: "kosár.",
  heroTitleLine2Prefix: "Egy",
  heroTitleLine2Accent: "közösség",
  heroSubtitle: "Heti friss zöldség- és gyümölcskosarak közvetlenül helyi gazdáktól. Rendeld meg pár kattintással — és támogasd a magyar termelőket.",
  heroCtaPrimary: "🛒 Vásárolj most a shopban",
  heroCtaSecondary: "Hogyan működik?",
  heroBenefit1: "Heti szállítás",
  heroBenefit2: "Helyi termelők",
  heroBenefit3: "Szezonális",
  basketCaption: "A heti kosár tartalma a szezontól függ.",
  basketItems: [
    { id: uid(), emoji: "🍅", bg: "tomato" },
    { id: uid(), emoji: "🥬", bg: "leaf" },
    { id: uid(), emoji: "🥕", bg: "cream" },
    { id: uid(), emoji: "🥦", bg: "leaf" },
    { id: uid(), emoji: "🍎", bg: "cream" },
    { id: uid(), emoji: "🌽", bg: "tomato" },
  ],

  aboutKicker: "Rólunk",
  aboutTitle: "Mi az a kosárközösség?",
  aboutBody: "A Több, mint kosár egy helyi gazdákat és tudatos vásárlókat összekötő közösség. Hetente friss, szezonális zöldséget, gyümölcsöt és kézműves élelmiszert juttatunk el hozzád — közvetlenül onnan, ahol termett. Nincs felesleges közvetítő, nincs hosszú tárolás. Csak igazi íz, igazi emberek mögött.",
  aboutCard1Emoji: "🌱", aboutCard1Title: "Friss", aboutCard1Desc: "Reggel szedve, aznap nálad.",
  aboutCard2Emoji: "🤝", aboutCard2Title: "Közösségi", aboutCard2Desc: "Helyi termelőket támogatsz.",
  aboutCard3Emoji: "♻️", aboutCard3Title: "Fenntartható", aboutCard3Desc: "Rövid ellátási lánc, kevesebb hulladék.",

  howKicker: "Egyszerű",
  howTitle: "Hogyan működik?",
  howSteps: [
    { id: uid(), emoji: "🛒", title: "Válaszd ki", desc: "Nézd meg az aktuális kínálatot a shopunkban, és állítsd össze a saját kosaradat." },
    { id: uid(), emoji: "📦", title: "Rendelj", desc: "Néhány kattintás, és a rendelés már a termelőkhöz került. A héten összekészítjük." },
    { id: uid(), emoji: "🚚", title: "Vedd át", desc: "Vedd át az átvételi ponton, vagy kérd kiszállítva — frissen, gyorsan." },
  ],
  howCtaLabel: "Indítsd a rendelést →",

  producersKicker: "Termelőink",
  producersTitle: "Akik mögötte állnak",
  producersIntro: "Helyi gazdák, kézművesek, kistermelők — mindannyian szenvedéllyel készítik, amit eszel.",
  producers: [
    { id: uid(), name: "Kovács Zöldségkert", description: "Szezonális zöldségek", emoji: "👨‍🌾", bgColor: "leaf" },
    { id: uid(), name: "Méhész Pista", description: "Hazai mézek", emoji: "🍯", bgColor: "tomato" },
    { id: uid(), name: "Hegyi Sajtműhely", description: "Kézműves sajtok", emoji: "🧀", bgColor: "cream" },
    { id: uid(), name: "Falusi Pékség", description: "Kovászos kenyerek", emoji: "🍞", bgColor: "leaf" },
  ],

  faqKicker: "GYIK",
  faqTitle: "Gyakori kérdések",
  faqs: [
    { id: uid(), question: "Mikor van leadási és átvételi határidő?", answer: "Vasárnap 20:00-ig adhatod le a rendelésed. Az átvétel/szállítás a hét közepén történik." },
    { id: uid(), question: "Hova szállítotok?", answer: "Több budapesti és környéki átvételi pontunk van, illetve házhozszállítást is vállalunk a régióban." },
    { id: uid(), question: "Kell-e előfizetni?", answer: "Nem. Hétről hétre szabadon eldöntheted, rendelsz-e — semmilyen kötelezettség nincs." },
    { id: uid(), question: "Hogyan fizethetek?", answer: "A shopban bankkártyával és átutalással is fizethetsz biztonságosan." },
  ],

  newsletterTitle: "Iratkozz fel a hírlevelünkre",
  newsletterSubtitle: "Heti kosártartalom, új termelők, akciók — egy emailben, hetente egyszer.",
  newsletterCta: "Feliratkozom",
  newsletterFinePrint: "Bármikor leiratkozhatsz. Adataidat biztonságban kezeljük.",

  contactTitle: "Kérdésed van?",
  contactSubtitle: "Írj vagy hívj minket bátran — szívesen segítünk.",
  contactEmail: "info@tobbmintkosar.hu",
  contactPhone: "+36 30 123 4567",
  contactAddress: "Budapest, Magyarország",
  mapEmbedUrl: "https://www.google.com/maps?q=Budapest&output=embed",
  contactShopCta: "🛒 Irány a shop",

  shopUrl: "https://shop.tobbmintkosar.hu",
  footerText: "Minden jog fenntartva.",
  footerShopLabel: "shop.tobbmintkosar.hu →",
  floatingCtaLabel: "Vásárolj most",
};

export const siteData = {
  newId: uid,
  get(): SiteContent {
    try {
      const raw = localStorage.getItem(KEY_CONTENT);
      if (!raw) return defaultContent;
      return { ...defaultContent, ...JSON.parse(raw) };
    } catch { return defaultContent; }
  },
  save(c: SiteContent) {
    localStorage.setItem(KEY_CONTENT, JSON.stringify(c));
  },
  reset() { localStorage.removeItem(KEY_CONTENT); },

  getSubscribers(): { email: string; date: string }[] {
    try { return JSON.parse(localStorage.getItem(KEY_SUBS) || "[]"); } catch { return []; }
  },
  addSubscriber(email: string): boolean {
    const list = siteData.getSubscribers();
    if (list.some(s => s.email.toLowerCase() === email.toLowerCase())) return false;
    list.push({ email, date: new Date().toISOString() });
    localStorage.setItem(KEY_SUBS, JSON.stringify(list));
    return true;
  },
  removeSubscriber(email: string) {
    const list = siteData.getSubscribers().filter(s => s.email !== email);
    localStorage.setItem(KEY_SUBS, JSON.stringify(list));
  },
  exportSubscribersCsv(): string {
    const list = siteData.getSubscribers();
    const rows = [["Email", "Dátum"], ...list.map(s => [s.email, s.date])];
    return rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  },
};
