// LocalStorage-based site data store for "Több, mint kosár"
// All admin-editable content lives here. CSV export for subscribers.

export type Producer = { id: string; name: string; description: string; emoji: string; bgColor: "leaf" | "tomato" | "cream" };
export type Faq = { id: string; question: string; answer: string };
export type SiteContent = {
  logoDataUrl: string | null;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  mapEmbedUrl: string;
  shopUrl: string;
  producers: Producer[];
  faqs: Faq[];
};

const KEY_CONTENT = "tmk_content_v1";
const KEY_SUBS = "tmk_subscribers_v1";

const uid = () => Math.random().toString(36).slice(2, 10);

export const defaultContent: SiteContent = {
  logoDataUrl: null,
  contactEmail: "info@tobbmintkosar.hu",
  contactPhone: "+36 30 123 4567",
  contactAddress: "Budapest, Magyarország",
  mapEmbedUrl: "https://www.google.com/maps?q=Budapest&output=embed",
  shopUrl: "https://shop.tobbmintkosar.hu",
  producers: [
    { id: uid(), name: "Kovács Zöldségkert", description: "Szezonális zöldségek", emoji: "👨‍🌾", bgColor: "leaf" },
    { id: uid(), name: "Méhész Pista", description: "Hazai mézek", emoji: "🍯", bgColor: "tomato" },
    { id: uid(), name: "Hegyi Sajtműhely", description: "Kézműves sajtok", emoji: "🧀", bgColor: "cream" },
    { id: uid(), name: "Falusi Pékség", description: "Kovászos kenyerek", emoji: "🍞", bgColor: "leaf" },
  ],
  faqs: [
    { id: uid(), question: "Mikor van leadási és átvételi határidő?", answer: "Vasárnap 20:00-ig adhatod le a rendelésed. Az átvétel/szállítás a hét közepén történik." },
    { id: uid(), question: "Hova szállítotok?", answer: "Több budapesti és környéki átvételi pontunk van, illetve házhozszállítást is vállalunk a régióban." },
    { id: uid(), question: "Kell-e előfizetni?", answer: "Nem. Hétről hétre szabadon eldöntheted, rendelsz-e — semmilyen kötelezettség nincs." },
    { id: uid(), question: "Hogyan fizethetek?", answer: "A shopban bankkártyával és átutalással is fizethetsz biztonságosan." },
  ],
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

  // Subscribers
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
