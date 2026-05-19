import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { siteData, SiteContent, Producer, Faq, BasketItem, HowStep, NavLink } from "@/lib/siteData";

const PASSWORD = "kosar2024";
type Tab = "branding" | "hero" | "about" | "how" | "producers" | "faq" | "newsletter" | "contact" | "footer" | "subs";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [c, setC] = useState<SiteContent>(siteData.get());
  const [tab, setTab] = useState<Tab>("branding");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => { if (sessionStorage.getItem("tmk_admin") === "1") setAuthed(true); }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) { sessionStorage.setItem("tmk_admin", "1"); setAuthed(true); }
    else alert("Hibás jelszó");
  };

  const save = (next: SiteContent) => { setC(next); siteData.save(next); setSavedAt(Date.now()); };
  const set = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => save({ ...c, [k]: v });

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
        <form onSubmit={login} className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full border border-cream-200">
          <h1 className="display text-2xl font-extrabold text-center mb-6">Admin belépés</h1>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Jelszó"
                 className="w-full px-4 py-3 rounded-xl border border-cream-200 mb-4 outline-none focus:border-tomato-500" autoFocus />
          <button className="w-full bg-tomato-500 hover:bg-tomato-600 text-white font-bold py-3 rounded-xl">Belépés</button>
          <Link to="/" className="block text-center text-sm text-ink-800/60 mt-4 hover:text-tomato-600">← Vissza az oldalra</Link>
        </form>
      </div>
    );
  }

  const tabs: [Tab, string][] = [
    ["branding", "Brand & menü"],
    ["hero", "Főoldal (Hero)"],
    ["about", "Rólunk"],
    ["how", "Hogyan működik"],
    ["producers", "Termelők"],
    ["faq", "GYIK"],
    ["newsletter", "Hírlevél"],
    ["contact", "Kapcsolat"],
    ["footer", "Lábléc"],
    ["subs", "Feliratkozók"],
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-white border-b border-cream-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <h1 className="display text-xl font-extrabold text-leaf-700">Admin · Több, mint kosár</h1>
          <div className="flex items-center gap-3">
            {savedAt && <span className="text-xs text-leaf-600">Mentve ✓</span>}
            <Link to="/" className="text-sm text-ink-800/70 hover:text-tomato-600">Megtekintés →</Link>
            <button onClick={() => { sessionStorage.removeItem("tmk_admin"); setAuthed(false); }}
                    className="text-sm bg-ink-900 text-white px-3 py-1.5 rounded-lg">Kilépés</button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-5 flex gap-1 overflow-x-auto">
          {tabs.map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
                    className={`px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition ${tab===k ? "border-tomato-500 text-tomato-600" : "border-transparent text-ink-800/60 hover:text-ink-900"}`}>
              {l}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8 space-y-6">
        {tab === "branding" && <BrandingTab c={c} save={save} set={set} />}
        {tab === "hero" && <HeroTab c={c} save={save} set={set} />}
        {tab === "about" && <AboutTab c={c} set={set} />}
        {tab === "how" && <HowTab c={c} save={save} set={set} />}
        {tab === "producers" && <ProducersTab c={c} save={save} />}
        {tab === "faq" && <FaqTab c={c} save={save} set={set} />}
        {tab === "newsletter" && <NewsletterTab c={c} set={set} />}
        {tab === "contact" && <ContactTab c={c} set={set} />}
        {tab === "footer" && <FooterTab c={c} set={set} />}
        {tab === "subs" && <SubsTab />}
      </main>
    </div>
  );
}

// === UI helpers ===
const inputCls = "w-full px-4 py-2.5 rounded-xl border border-cream-200 bg-white outline-none focus:border-tomato-500";
const taCls = inputCls + " min-h-[100px]";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl p-6 border border-cream-200">
      <h2 className="font-display text-xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink-900 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-ink-800/60 mt-1">{hint}</span>}
    </label>
  );
}

const EMOJI_PRESETS = [
  "🍅","🥬","🥕","🥦","🍎","🌽","🥒","🥔","🧅","🧄","🌶️","🫑","🍆","🥑","🍇","🍓","🍑","🍐","🍌","🍊","🍋","🍉","🍈","🍒","🥝","🥥","🫐","🍍",
  "🥖","🍞","🥐","🧀","🍯","🥚","🐓","🐄","🐖","🐑","🐐","🐝","🌻","🌾","🌿","🍀","🌱","🌳","🌼","🌷","🍄","🥜","🌰","🫛","🫘",
  "🛒","📦","🚚","🧺","🛍️","♻️","🌍","💚","🤝","✨","🌟","✅","🥗","🍲","🥣","🍵","☕","🥛","🧴","🧂","🫙","🍶","🌞","💧","🔥",
];

function EmojiPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button type="button" onClick={() => setOpen(o => !o)}
              className="px-3 py-2 rounded-xl border border-cream-200 bg-white text-2xl leading-none min-w-[56px]">
        {value || "❓"}
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-cream-200 rounded-xl shadow-xl p-2 w-72 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-8 gap-1">
            {EMOJI_PRESETS.map(e => (
              <button key={e} type="button" onClick={() => { onChange(e); setOpen(false); }}
                      className={`text-2xl p-1 rounded hover:bg-cream-100 ${value===e ? "bg-tomato-50 ring-2 ring-tomato-400" : ""}`}>{e}</button>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-cream-200">
            <input className="w-full px-2 py-1.5 rounded-lg border border-cream-200 text-sm"
                   placeholder="Vagy írj saját emoji-t / szöveget"
                   value={value} onChange={e => onChange(e.target.value)} />
            <button type="button" onClick={() => setOpen(false)} className="mt-2 w-full text-xs text-ink-800/60 hover:text-tomato-600">Bezár</button>
          </div>
        </div>
      )}
    </div>
  );
}

function sanitizeMapEmbed(input: string): string {
  if (!input) return "";
  const t = input.trim();
  // If user pasted full <iframe ...> HTML, extract src.
  const m = t.match(/src\s*=\s*["']([^"']+)["']/i);
  if (m) return m[1];
  return t;
}

type SetFn = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => void;
type SaveFn = (n: SiteContent) => void;

// === Branding & nav ===
function BrandingTab({ c, save, set }: { c: SiteContent; save: SaveFn; set: SetFn }) {
  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => set("logoDataUrl", r.result as string);
    r.readAsDataURL(f);
  };
  const updateLink = (i: number, p: Partial<NavLink>) => {
    const list = [...c.navLinks]; list[i] = { ...list[i], ...p };
    save({ ...c, navLinks: list });
  };
  const addLink = () => save({ ...c, navLinks: [...c.navLinks, { id: siteData.newId(), label: "Új menüpont", target: "about" }] });
  const delLink = (i: number) => save({ ...c, navLinks: c.navLinks.filter((_, k) => k !== i) });
  const moveLink = (i: number, d: -1 | 1) => {
    const j = i + d; if (j < 0 || j >= c.navLinks.length) return;
    const list = [...c.navLinks]; [list[i], list[j]] = [list[j], list[i]];
    save({ ...c, navLinks: list });
  };
  const targets = [
    { v: "top", l: "Főoldal teteje" },
    { v: "about", l: "Rólunk" },
    { v: "how", l: "Hogyan működik" },
    { v: "producers", l: "Termelők" },
    { v: "faq", l: "GYIK" },
    { v: "contact", l: "Kapcsolat" },
  ];

  return (
    <>
      <Section title="Logó és brand név">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-2xl bg-cream-100 border border-cream-200 flex items-center justify-center overflow-hidden">
            {c.logoDataUrl ? <img src={c.logoDataUrl} alt="logo" className="w-full h-full object-contain" /> : <span className="text-4xl">🧺</span>}
          </div>
          <div className="flex-1 space-y-3">
            <input type="file" accept="image/*" onChange={onLogo} className="block text-sm" />
            {c.logoDataUrl && (
              <button onClick={() => set("logoDataUrl", null)} className="text-sm text-tomato-600 hover:underline">Logó törlése</button>
            )}
            <Field label="Brand név (menüben és láblécben)">
              <input className={inputCls} value={c.brandName} onChange={e => set("brandName", e.target.value)} />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Shop URL">
        <Field label="Shop URL (összes 'Vásárolj' gomb ide visz)">
          <input className={inputCls} value={c.shopUrl} onChange={e => set("shopUrl", e.target.value)} />
        </Field>
        <Field label="Menü 'Shop' gomb felirata">
          <input className={inputCls} value={c.navCtaLabel} onChange={e => set("navCtaLabel", e.target.value)} />
        </Field>
      </Section>

      <Section title={`Menüpontok (${c.navLinks.length})`}>
        <div className="space-y-2">
          {c.navLinks.map((l, i) => (
            <div key={l.id} className="grid sm:grid-cols-12 gap-2 items-center bg-cream-50 rounded-xl p-2 border border-cream-200">
              <input className={`${inputCls} sm:col-span-5`} placeholder="Felirat" value={l.label} onChange={e => updateLink(i, { label: e.target.value })} />
              <select className={`${inputCls} sm:col-span-5`} value={l.target} onChange={e => updateLink(i, { target: e.target.value })}>
                {targets.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
              </select>
              <div className="sm:col-span-2 flex gap-1 justify-end">
                <button onClick={() => moveLink(i, -1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↑</button>
                <button onClick={() => moveLink(i, 1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↓</button>
                <button onClick={() => delLink(i)} className="px-2 py-1.5 bg-tomato-500 text-white rounded-lg text-sm">×</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addLink} className="mt-4 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2.5 rounded-full">+ Új menüpont</button>
      </Section>
    </>
  );
}

// === Hero ===
function HeroTab({ c, save, set }: { c: SiteContent; save: SaveFn; set: SetFn }) {
  const onHeroImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => set("heroImageUrl", r.result as string);
    r.readAsDataURL(f);
  };
  const updateItem = (i: number, p: Partial<BasketItem>) => {
    const list = [...c.basketItems]; list[i] = { ...list[i], ...p };
    save({ ...c, basketItems: list });
  };
  const addItem = () => save({ ...c, basketItems: [...c.basketItems, { id: siteData.newId(), emoji: "🥒", bg: "leaf" }] });
  const delItem = (i: number) => save({ ...c, basketItems: c.basketItems.filter((_, k) => k !== i) });

  return (
    <>
      <Section title="Hero — címsor és szövegek">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Badge (kis címke felül)"><input className={inputCls} value={c.heroBadge} onChange={e => set("heroBadge", e.target.value)} /></Field>
          <Field label="Címsor 1. sor (eleje)"><input className={inputCls} value={c.heroTitleLine1} onChange={e => set("heroTitleLine1", e.target.value)} /></Field>
          <Field label="Címsor 1. sor (piros kiemelés)"><input className={inputCls} value={c.heroTitleAccent} onChange={e => set("heroTitleAccent", e.target.value)} /></Field>
          <Field label="Címsor 2. sor (eleje)"><input className={inputCls} value={c.heroTitleLine2Prefix} onChange={e => set("heroTitleLine2Prefix", e.target.value)} /></Field>
          <Field label="Címsor 2. sor (zöld kiemelés)"><input className={inputCls} value={c.heroTitleLine2Accent} onChange={e => set("heroTitleLine2Accent", e.target.value)} /></Field>
          <Field label="Címsor 2. sor (vége, pl. „a tányérodon.")"><input className={inputCls} value={c.heroTitleLine2Suffix} onChange={e => set("heroTitleLine2Suffix", e.target.value)} /></Field>
        </div>
        <div className="mt-4">
          <Field label="Alcím / leírás"><textarea className={taCls} value={c.heroSubtitle} onChange={e => set("heroSubtitle", e.target.value)} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Elsődleges gomb (shopra visz)"><input className={inputCls} value={c.heroCtaPrimary} onChange={e => set("heroCtaPrimary", e.target.value)} /></Field>
          <Field label="Másodlagos gomb (Hogyan működik szekcióra)"><input className={inputCls} value={c.heroCtaSecondary} onChange={e => set("heroCtaSecondary", e.target.value)} /></Field>
          <Field label="Előny 1"><input className={inputCls} value={c.heroBenefit1} onChange={e => set("heroBenefit1", e.target.value)} /></Field>
          <Field label="Előny 2"><input className={inputCls} value={c.heroBenefit2} onChange={e => set("heroBenefit2", e.target.value)} /></Field>
          <Field label="Előny 3"><input className={inputCls} value={c.heroBenefit3} onChange={e => set("heroBenefit3", e.target.value)} /></Field>
        </div>
      </Section>

      <Section title="Heti kosár (jobb oldali kártya)">
        <Field label="Hero kép (cseréli az emoji-rácsot, ha feltöltesz)" hint="Ha üresen hagyod, megjelenik a kosár-emoji rács alább.">
          <input type="file" accept="image/*" onChange={onHeroImg} className="block text-sm" />
        </Field>
        {c.heroImageUrl && (
          <div className="mt-3 flex items-center gap-3">
            <img src={c.heroImageUrl} alt="" className="h-24 rounded-xl object-cover" />
            <button onClick={() => set("heroImageUrl", null)} className="text-sm text-tomato-600 hover:underline">Kép törlése</button>
          </div>
        )}

        <div className="mt-6">
          <Field label='Felirat a kosár alatt (pl. "A heti kosár tartalma a szezontól függ.")'>
            <input className={inputCls} value={c.basketCaption} onChange={e => set("basketCaption", e.target.value)} />
          </Field>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold mb-2">Kosár ikonok (emoji rács) — {c.basketItems.length} db</div>
          <div className="grid sm:grid-cols-3 gap-2">
            {c.basketItems.map((it, i) => (
              <div key={it.id} className="flex gap-2 items-center bg-cream-50 rounded-xl p-2 border border-cream-200">
                <EmojiPicker value={it.emoji} onChange={v => updateItem(i, { emoji: v })} />
                <select className={inputCls} value={it.bg} onChange={e => updateItem(i, { bg: e.target.value as any })}>
                  <option value="leaf">Zöld háttér</option>
                  <option value="tomato">Piros háttér</option>
                  <option value="cream">Krém háttér</option>
                </select>
                <button onClick={() => delItem(i)} className="px-2 py-1.5 bg-tomato-500 text-white rounded-lg text-sm">×</button>
              </div>
            ))}
          </div>
          <button onClick={addItem} className="mt-3 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2.5 rounded-full">+ Új ikon</button>
        </div>
      </Section>
    </>
  );
}

// === About ===
function AboutTab({ c, set }: { c: SiteContent; set: SetFn }) {
  return (
    <>
      <Section title="Rólunk — fő szövegek">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Kicker (kis felirat)"><input className={inputCls} value={c.aboutKicker} onChange={e => set("aboutKicker", e.target.value)} /></Field>
          <Field label="Cím"><input className={inputCls} value={c.aboutTitle} onChange={e => set("aboutTitle", e.target.value)} /></Field>
        </div>
        <div className="mt-4">
          <Field label="Leírás"><textarea className={taCls} value={c.aboutBody} onChange={e => set("aboutBody", e.target.value)} /></Field>
        </div>
      </Section>
      <Section title="3 kis kártya">
        {[1, 2, 3].map(n => {
          const eK = `aboutCard${n}Emoji` as keyof SiteContent;
          const tK = `aboutCard${n}Title` as keyof SiteContent;
          const dK = `aboutCard${n}Desc` as keyof SiteContent;
          return (
            <div key={n} className="grid sm:grid-cols-12 gap-3 mb-3 items-center">
              <div className="sm:col-span-1"><EmojiPicker value={c[eK] as string} onChange={v => set(eK, v as any)} /></div>
              <input className={`${inputCls} sm:col-span-3`} placeholder="Cím" value={c[tK] as string} onChange={e => set(tK, e.target.value as any)} />
              <input className={`${inputCls} sm:col-span-8`} placeholder="Leírás" value={c[dK] as string} onChange={e => set(dK, e.target.value as any)} />
            </div>
          );
        })}
      </Section>
    </>
  );
}

// === HowItWorks ===
function HowTab({ c, save, set }: { c: SiteContent; save: SaveFn; set: SetFn }) {
  const update = (i: number, p: Partial<HowStep>) => {
    const list = [...c.howSteps]; list[i] = { ...list[i], ...p };
    save({ ...c, howSteps: list });
  };
  const add = () => save({ ...c, howSteps: [...c.howSteps, { id: siteData.newId(), emoji: "✨", title: "Új lépés", desc: "Leírás" }] });
  const del = (i: number) => save({ ...c, howSteps: c.howSteps.filter((_, k) => k !== i) });
  const move = (i: number, d: -1 | 1) => {
    const j = i + d; if (j < 0 || j >= c.howSteps.length) return;
    const list = [...c.howSteps]; [list[i], list[j]] = [list[j], list[i]];
    save({ ...c, howSteps: list });
  };

  return (
    <>
      <Section title="Hogyan működik — fejléc + CTA">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Kicker"><input className={inputCls} value={c.howKicker} onChange={e => set("howKicker", e.target.value)} /></Field>
          <Field label="Cím"><input className={inputCls} value={c.howTitle} onChange={e => set("howTitle", e.target.value)} /></Field>
          <Field label="CTA gomb felirata (shopra visz)"><input className={inputCls} value={c.howCtaLabel} onChange={e => set("howCtaLabel", e.target.value)} /></Field>
        </div>
      </Section>
      <Section title={`Lépések (${c.howSteps.length})`}>
        <div className="space-y-3">
          {c.howSteps.map((s, i) => (
            <div key={s.id} className="grid sm:grid-cols-12 gap-2 items-start bg-cream-50 rounded-xl p-3 border border-cream-200">
              <div className="sm:col-span-1"><EmojiPicker value={s.emoji} onChange={v => update(i, { emoji: v })} /></div>
              <input className={`${inputCls} sm:col-span-3`} placeholder="Cím" value={s.title} onChange={e => update(i, { title: e.target.value })} />
              <textarea className={`${inputCls} sm:col-span-6 min-h-[60px]`} placeholder="Leírás" value={s.desc} onChange={e => update(i, { desc: e.target.value })} />
              <div className="sm:col-span-2 flex gap-1 justify-end">
                <button onClick={() => move(i, -1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↑</button>
                <button onClick={() => move(i, 1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↓</button>
                <button onClick={() => del(i)} className="px-2 py-1.5 bg-tomato-500 text-white rounded-lg text-sm">×</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={add} className="mt-4 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2.5 rounded-full">+ Új lépés</button>
      </Section>
    </>
  );
}

// === Producers ===
function ProducersTab({ c, save }: { c: SiteContent; save: SaveFn }) {
  const setH = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => save({ ...c, [k]: v });
  const update = (i: number, p: Partial<Producer>) => {
    const list = [...c.producers]; list[i] = { ...list[i], ...p };
    save({ ...c, producers: list });
  };
  const add = () => save({ ...c, producers: [...c.producers, { id: siteData.newId(), name: "Új termelő", description: "Leírás", emoji: "🌾", bgColor: "leaf" }] });
  const del = (i: number) => save({ ...c, producers: c.producers.filter((_, k) => k !== i) });
  const move = (i: number, d: -1 | 1) => {
    const j = i + d; if (j < 0 || j >= c.producers.length) return;
    const list = [...c.producers]; [list[i], list[j]] = [list[j], list[i]];
    save({ ...c, producers: list });
  };
  const sortAbc = () => {
    const sorted = [...c.producers].sort((a, b) => a.name.localeCompare(b.name, "hu", { sensitivity: "base" }));
    save({ ...c, producers: sorted });
  };
  const onLogo = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => update(i, { logoDataUrl: r.result as string });
    r.readAsDataURL(f);
  };
  const COLORS: { v: Producer["bgColor"]; l: string; sw: string }[] = [
    { v: "leaf",   l: "Zöld",   sw: "bg-leaf-50 border-leaf-200" },
    { v: "tomato", l: "Piros",  sw: "bg-tomato-50 border-tomato-200" },
    { v: "cream",  l: "Krém",   sw: "bg-cream-100 border-cream-200" },
    { v: "sky",    l: "Kék",    sw: "bg-sky-50 border-sky-200" },
    { v: "peach",  l: "Barack", sw: "bg-peach-50 border-peach-200" },
    { v: "lilac",  l: "Lila",   sw: "bg-lilac-50 border-lilac-200" },
  ];

  return (
    <>
      <Section title="Termelők szekció fejléc">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Kicker"><input className={inputCls} value={c.producersKicker} onChange={e => setH("producersKicker", e.target.value)} /></Field>
          <Field label="Cím"><input className={inputCls} value={c.producersTitle} onChange={e => setH("producersTitle", e.target.value)} /></Field>
        </div>
        <div className="mt-4">
          <Field label="Bevezető"><textarea className={taCls} value={c.producersIntro} onChange={e => setH("producersIntro", e.target.value)} /></Field>
        </div>
      </Section>
      <Section title={`Termelők (${c.producers.length})`}>
        <div className="flex gap-2 mb-4">
          <button onClick={sortAbc} className="bg-white border border-cream-200 hover:bg-cream-50 text-sm font-semibold px-4 py-2 rounded-full">
            🔤 ABC sorrend
          </button>
        </div>
        <div className="space-y-3">
          {c.producers.map((p, i) => (
            <div key={p.id} className="bg-cream-50 rounded-xl p-3 border border-cream-200">
              <div className="grid sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-2 flex flex-col items-center gap-1">
                  <div className="w-20 h-20 rounded-xl bg-white border border-cream-200 flex items-center justify-center overflow-hidden">
                    {p.logoDataUrl
                      ? <img src={p.logoDataUrl} alt="" className="max-w-full max-h-full object-contain" />
                      : <span className="text-3xl">{p.emoji}</span>}
                  </div>
                  <div className="flex gap-1 items-center">
                    <EmojiPicker value={p.emoji} onChange={v => update(i, { emoji: v })} />
                  </div>
                </div>
                <div className="sm:col-span-10 space-y-2">
                  <div className="grid sm:grid-cols-2 gap-2">
                    <input className={inputCls} placeholder="Név" value={p.name} onChange={e => update(i, { name: e.target.value })} />
                    <input className={inputCls} placeholder="Leírás" value={p.description} onChange={e => update(i, { description: e.target.value })} />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <label className="text-xs font-semibold text-ink-800/70">Logó:</label>
                    <input type="file" accept="image/*" onChange={e => onLogo(i, e)} className="text-xs" />
                    {p.logoDataUrl && (
                      <button onClick={() => update(i, { logoDataUrl: null })} className="text-xs text-tomato-600 hover:underline">Logó törlése</button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-semibold text-ink-800/70">Háttér:</span>
                    {COLORS.map(col => (
                      <button key={col.v} type="button" onClick={() => update(i, { bgColor: col.v })}
                              title={col.l}
                              className={`w-8 h-8 rounded-full border-2 ${col.sw} ${p.bgColor===col.v ? "ring-2 ring-tomato-500 ring-offset-1" : ""}`} />
                    ))}
                  </div>
                  <div className="flex gap-1 justify-end pt-1">
                    <button onClick={() => move(i, -1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↑</button>
                    <button onClick={() => move(i, 1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↓</button>
                    <button onClick={() => del(i)} className="px-3 py-1.5 bg-tomato-500 text-white rounded-lg text-sm">Törlés</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={add} className="mt-4 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2.5 rounded-full">+ Új termelő</button>
      </Section>
    </>
  );
}

// === FAQ ===
function FaqTab({ c, save, set }: { c: SiteContent; save: SaveFn; set: SetFn }) {
  const update = (i: number, p: Partial<Faq>) => {
    const list = [...c.faqs]; list[i] = { ...list[i], ...p };
    save({ ...c, faqs: list });
  };
  const add = () => save({ ...c, faqs: [...c.faqs, { id: siteData.newId(), question: "Új kérdés", answer: "Válasz" }] });
  const del = (i: number) => save({ ...c, faqs: c.faqs.filter((_, k) => k !== i) });
  const move = (i: number, d: -1 | 1) => {
    const j = i + d; if (j < 0 || j >= c.faqs.length) return;
    const list = [...c.faqs]; [list[i], list[j]] = [list[j], list[i]];
    save({ ...c, faqs: list });
  };
  return (
    <>
      <Section title="GYIK fejléc">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Kicker"><input className={inputCls} value={c.faqKicker} onChange={e => set("faqKicker", e.target.value)} /></Field>
          <Field label="Cím"><input className={inputCls} value={c.faqTitle} onChange={e => set("faqTitle", e.target.value)} /></Field>
        </div>
      </Section>
      <Section title={`Kérdések (${c.faqs.length})`}>
        <div className="space-y-3">
          {c.faqs.map((f, i) => (
            <div key={f.id} className="bg-cream-50 rounded-xl p-4 border border-cream-200 space-y-2">
              <div className="flex gap-2">
                <input className={`${inputCls} flex-1 font-semibold`} placeholder="Kérdés" value={f.question} onChange={e => update(i, { question: e.target.value })} />
                <button onClick={() => move(i, -1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↑</button>
                <button onClick={() => move(i, 1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↓</button>
                <button onClick={() => del(i)} className="px-3 py-1.5 bg-tomato-500 text-white rounded-lg text-sm">×</button>
              </div>
              <textarea className={taCls} placeholder="Válasz" value={f.answer} onChange={e => update(i, { answer: e.target.value })} />
            </div>
          ))}
        </div>
        <button onClick={add} className="mt-4 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2.5 rounded-full">+ Új kérdés</button>
      </Section>
    </>
  );
}

// === Newsletter ===
function NewsletterTab({ c, set }: { c: SiteContent; set: SetFn }) {
  return (
    <Section title="Hírlevél szekció">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Cím"><input className={inputCls} value={c.newsletterTitle} onChange={e => set("newsletterTitle", e.target.value)} /></Field>
        <Field label="Gomb felirata"><input className={inputCls} value={c.newsletterCta} onChange={e => set("newsletterCta", e.target.value)} /></Field>
      </div>
      <div className="mt-4">
        <Field label="Alcím"><textarea className={taCls} value={c.newsletterSubtitle} onChange={e => set("newsletterSubtitle", e.target.value)} /></Field>
      </div>
      <div className="mt-4">
        <Field label="Apró betűs (forma alatt)"><input className={inputCls} value={c.newsletterFinePrint} onChange={e => set("newsletterFinePrint", e.target.value)} /></Field>
      </div>
    </Section>
  );
}

// === Contact ===
function ContactTab({ c, set }: { c: SiteContent; set: SetFn }) {
  return (
    <>
      <Section title="Kapcsolat fejléc">
        <Field label="Cím"><input className={inputCls} value={c.contactTitle} onChange={e => set("contactTitle", e.target.value)} /></Field>
        <div className="mt-4">
          <Field label="Alcím"><textarea className={taCls} value={c.contactSubtitle} onChange={e => set("contactSubtitle", e.target.value)} /></Field>
        </div>
      </Section>
      <Section title="Elérhetőségek">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email"><input className={inputCls} value={c.contactEmail} onChange={e => set("contactEmail", e.target.value)} /></Field>
          <Field label="Telefon"><input className={inputCls} value={c.contactPhone} onChange={e => set("contactPhone", e.target.value)} /></Field>
        </div>
        <div className="mt-4">
          <Field label="Cím"><textarea className={taCls} value={c.contactAddress} onChange={e => set("contactAddress", e.target.value)} /></Field>
        </div>
        <div className="mt-4">
          <Field label="Alsó CTA gomb (shopra visz)"><input className={inputCls} value={c.contactShopCta} onChange={e => set("contactShopCta", e.target.value)} /></Field>
        </div>
      </Section>
      <Section title="Térkép (Google Maps)">
        <Field label="Cím gyors-beállítás (egyszerű mód)"
               hint="Csak írd be a címet és kattints a Beállítás gombra — automatikusan elkészítjük a térkép URL-t.">
          <div className="flex gap-2">
            <input id="map-addr-quick" className={inputCls} placeholder="pl. Budapest, Andrássy út 1." />
            <button type="button"
                    onClick={() => {
                      const el = document.getElementById("map-addr-quick") as HTMLInputElement | null;
                      const addr = el?.value.trim();
                      if (!addr) return;
                      set("mapEmbedUrl", `https://www.google.com/maps?q=${encodeURIComponent(addr)}&output=embed`);
                    }}
                    className="bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2 rounded-xl whitespace-nowrap">Beállítás</button>
          </div>
        </Field>
        <div className="mt-5">
          <Field label="Vagy egyéni Embed URL / iframe kód"
                 hint='Google Maps → keress rá a címre → Megosztás → "Térkép beágyazása" → másold be akár a teljes <iframe ...> kódot, akár csak az URL-t. Automatikusan kinyerjük.'>
            <input className={inputCls} value={c.mapEmbedUrl}
                   onChange={e => set("mapEmbedUrl", sanitizeMapEmbed(e.target.value))} />
          </Field>
          {c.mapEmbedUrl && !/^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.)/.test(c.mapEmbedUrl) && (
            <p className="mt-2 text-xs text-tomato-600">⚠️ Ez nem tűnik Google Maps URL-nek. Az előnézetben a megadott oldal jelenik meg. Használd a gyors-beállítást vagy a Google Maps „Térkép beágyazása" funkcióját.</p>
          )}
        </div>
        {c.mapEmbedUrl && (
          <div className="mt-4 rounded-xl overflow-hidden border border-cream-200">
            <iframe src={c.mapEmbedUrl} className="w-full h-64" loading="lazy" title="Térkép előnézet" />
          </div>
        )}
      </Section>
    </>
  );
}

// === Footer ===
function FooterTab({ c, set }: { c: SiteContent; set: SetFn }) {
  return (
    <Section title="Lábléc">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Copyright utáni szöveg"><input className={inputCls} value={c.footerText} onChange={e => set("footerText", e.target.value)} /></Field>
        <Field label="Shop link felirata"><input className={inputCls} value={c.footerShopLabel} onChange={e => set("footerShopLabel", e.target.value)} /></Field>
        <Field label="Lebegő gomb felirata (jobb alsó sarok)"><input className={inputCls} value={c.floatingCtaLabel} onChange={e => set("floatingCtaLabel", e.target.value)} /></Field>
      </div>
    </Section>
  );
}

// === Subscribers ===
function SubsTab() {
  const [list, setList] = useState(siteData.getSubscribers());
  const refresh = () => setList(siteData.getSubscribers());
  const remove = (email: string) => { if (confirm("Törlöd?")) { siteData.removeSubscriber(email); refresh(); } };
  const exportCsv = () => {
    const blob = new Blob([siteData.exportSubscribersCsv()], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `feliratkozok-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };
  return (
    <Section title={`Hírlevél feliratkozók (${list.length})`}>
      <div className="flex gap-3 mb-4">
        <button onClick={exportCsv} disabled={!list.length}
                className="bg-leaf-600 hover:bg-leaf-700 disabled:opacity-40 text-white font-semibold px-5 py-2.5 rounded-full">📥 CSV export</button>
      </div>
      {list.length === 0 ? <p className="text-ink-800/60 text-sm">Még nincs feliratkozó.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b border-cream-200"><th className="py-2">Email</th><th className="py-2">Dátum</th><th></th></tr></thead>
            <tbody>
              {list.map(s => (
                <tr key={s.email} className="border-b border-cream-100">
                  <td className="py-2.5">{s.email}</td>
                  <td className="py-2.5 text-ink-800/60">{new Date(s.date).toLocaleString("hu-HU")}</td>
                  <td className="py-2.5 text-right"><button onClick={() => remove(s.email)} className="text-tomato-600 hover:underline text-xs">Törlés</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
