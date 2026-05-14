import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { siteData, SiteContent, Producer, Faq } from "@/lib/siteData";

const PASSWORD = "kosar2024";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [c, setC] = useState<SiteContent>(siteData.get());
  const [tab, setTab] = useState<"general" | "producers" | "faq" | "subs">("general");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("tmk_admin") === "1") setAuthed(true);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      sessionStorage.setItem("tmk_admin", "1");
      setAuthed(true);
    } else alert("Hibás jelszó");
  };

  const save = (next: SiteContent) => {
    setC(next);
    siteData.save(next);
    setSavedAt(Date.now());
  };

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
          {[["general","Általános"],["producers","Termelők"],["faq","GYIK"],["subs","Hírlevél"]].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k as any)}
                    className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${tab===k ? "border-tomato-500 text-tomato-600" : "border-transparent text-ink-800/60 hover:text-ink-900"}`}>
              {l}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        {tab === "general" && <GeneralTab c={c} save={save} />}
        {tab === "producers" && <ProducersTab c={c} save={save} />}
        {tab === "faq" && <FaqTab c={c} save={save} />}
        {tab === "subs" && <SubsTab />}
      </main>
    </div>
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
const inputCls = "w-full px-4 py-2.5 rounded-xl border border-cream-200 bg-white outline-none focus:border-tomato-500";

function GeneralTab({ c, save }: { c: SiteContent; save: (n: SiteContent) => void }) {
  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => save({ ...c, logoDataUrl: r.result as string });
    r.readAsDataURL(f);
  };
  return (
    <div className="space-y-6">
      <Section title="Logó">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-2xl bg-cream-100 border border-cream-200 flex items-center justify-center overflow-hidden">
            {c.logoDataUrl ? <img src={c.logoDataUrl} alt="logo" className="w-full h-full object-contain" /> : <span className="text-4xl">🧺</span>}
          </div>
          <div className="flex-1">
            <input type="file" accept="image/*" onChange={onLogo} className="block text-sm" />
            {c.logoDataUrl && (
              <button onClick={() => save({ ...c, logoDataUrl: null })}
                      className="mt-2 text-sm text-tomato-600 hover:underline">Logó törlése</button>
            )}
            <p className="text-xs text-ink-800/60 mt-2">Ajánlott: PNG vagy SVG, kb. 200×200 px.</p>
          </div>
        </div>
      </Section>

      <Section title="Shop és kapcsolat">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Shop URL">
            <input className={inputCls} value={c.shopUrl} onChange={e => save({ ...c, shopUrl: e.target.value })} />
          </Field>
          <Field label="Email">
            <input className={inputCls} value={c.contactEmail} onChange={e => save({ ...c, contactEmail: e.target.value })} />
          </Field>
          <Field label="Telefon">
            <input className={inputCls} value={c.contactPhone} onChange={e => save({ ...c, contactPhone: e.target.value })} />
          </Field>
          <Field label="Cím">
            <input className={inputCls} value={c.contactAddress} onChange={e => save({ ...c, contactAddress: e.target.value })} />
          </Field>
        </div>
      </Section>

      <Section title="Térkép (Google Maps embed URL)">
        <Field label="Embed URL"
               hint='Google Mapson keress rá a címre → Megosztás → Térkép beágyazása → másold ki a src="..." értékét. Vagy használd: https://www.google.com/maps?q=CÍM&output=embed'>
          <input className={inputCls} value={c.mapEmbedUrl} onChange={e => save({ ...c, mapEmbedUrl: e.target.value })} />
        </Field>
        {c.mapEmbedUrl && (
          <div className="mt-4 rounded-xl overflow-hidden border border-cream-200">
            <iframe src={c.mapEmbedUrl} className="w-full h-64" loading="lazy" />
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl p-6 border border-cream-200">
      <h2 className="font-display text-xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function ProducersTab({ c, save }: { c: SiteContent; save: (n: SiteContent) => void }) {
  const update = (i: number, p: Partial<Producer>) => {
    const list = [...c.producers]; list[i] = { ...list[i], ...p };
    save({ ...c, producers: list });
  };
  const add = () => save({ ...c, producers: [...c.producers, { id: siteData.newId(), name: "Új termelő", description: "Leírás", emoji: "🌾", bgColor: "leaf" }] });
  const del = (i: number) => { if (confirm("Biztosan törlöd?")) save({ ...c, producers: c.producers.filter((_, k) => k !== i) }); };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= c.producers.length) return;
    const list = [...c.producers]; [list[i], list[j]] = [list[j], list[i]];
    save({ ...c, producers: list });
  };

  return (
    <Section title={`Termelők (${c.producers.length})`}>
      <div className="space-y-3">
        {c.producers.map((p, i) => (
          <div key={p.id} className="grid sm:grid-cols-12 gap-3 items-center bg-cream-50 rounded-xl p-3 border border-cream-200">
            <input className={`${inputCls} sm:col-span-1 text-2xl text-center`} value={p.emoji} onChange={e => update(i, { emoji: e.target.value })} />
            <input className={`${inputCls} sm:col-span-3`} placeholder="Név" value={p.name} onChange={e => update(i, { name: e.target.value })} />
            <input className={`${inputCls} sm:col-span-4`} placeholder="Leírás" value={p.description} onChange={e => update(i, { description: e.target.value })} />
            <select className={`${inputCls} sm:col-span-2`} value={p.bgColor} onChange={e => update(i, { bgColor: e.target.value as any })}>
              <option value="leaf">Zöld</option>
              <option value="tomato">Piros</option>
              <option value="cream">Krém</option>
            </select>
            <div className="sm:col-span-2 flex gap-1 justify-end">
              <button onClick={() => move(i, -1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↑</button>
              <button onClick={() => move(i, 1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↓</button>
              <button onClick={() => del(i)} className="px-2 py-1.5 bg-tomato-500 text-white rounded-lg text-sm">×</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-4 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2.5 rounded-full">
        + Új termelő
      </button>
    </Section>
  );
}

function FaqTab({ c, save }: { c: SiteContent; save: (n: SiteContent) => void }) {
  const update = (i: number, p: Partial<Faq>) => {
    const list = [...c.faqs]; list[i] = { ...list[i], ...p };
    save({ ...c, faqs: list });
  };
  const add = () => save({ ...c, faqs: [...c.faqs, { id: siteData.newId(), question: "Új kérdés", answer: "Válasz" }] });
  const del = (i: number) => { if (confirm("Biztosan törlöd?")) save({ ...c, faqs: c.faqs.filter((_, k) => k !== i) }); };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= c.faqs.length) return;
    const list = [...c.faqs]; [list[i], list[j]] = [list[j], list[i]];
    save({ ...c, faqs: list });
  };

  return (
    <Section title={`GYIK (${c.faqs.length})`}>
      <div className="space-y-3">
        {c.faqs.map((f, i) => (
          <div key={f.id} className="bg-cream-50 rounded-xl p-4 border border-cream-200 space-y-2">
            <div className="flex gap-2">
              <input className={`${inputCls} flex-1 font-semibold`} placeholder="Kérdés" value={f.question} onChange={e => update(i, { question: e.target.value })} />
              <button onClick={() => move(i, -1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↑</button>
              <button onClick={() => move(i, 1)} className="px-2 py-1.5 bg-white border border-cream-200 rounded-lg text-sm">↓</button>
              <button onClick={() => del(i)} className="px-3 py-1.5 bg-tomato-500 text-white rounded-lg text-sm">×</button>
            </div>
            <textarea className={`${inputCls} min-h-[80px]`} placeholder="Válasz" value={f.answer} onChange={e => update(i, { answer: e.target.value })} />
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-4 bg-leaf-600 hover:bg-leaf-700 text-white font-semibold px-5 py-2.5 rounded-full">
        + Új kérdés
      </button>
    </Section>
  );
}

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
                className="bg-leaf-600 hover:bg-leaf-700 disabled:opacity-40 text-white font-semibold px-5 py-2.5 rounded-full">
          📥 CSV export
        </button>
      </div>
      {list.length === 0 ? (
        <p className="text-ink-800/60 text-sm">Még nincs feliratkozó.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b border-cream-200">
              <th className="py-2">Email</th><th className="py-2">Dátum</th><th></th>
            </tr></thead>
            <tbody>
              {list.map(s => (
                <tr key={s.email} className="border-b border-cream-100">
                  <td className="py-2.5">{s.email}</td>
                  <td className="py-2.5 text-ink-800/60">{new Date(s.date).toLocaleString("hu-HU")}</td>
                  <td className="py-2.5 text-right">
                    <button onClick={() => remove(s.email)} className="text-tomato-600 hover:underline text-xs">Törlés</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
