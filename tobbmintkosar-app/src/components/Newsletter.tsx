import { useState } from "react";
import { siteData, SiteContent } from "@/lib/siteData";

export default function Newsletter({ content }: { content: SiteContent }) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [last, setLast] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    const now = Date.now();
    if (now - last < 30000) {
      setMsg({ ok: false, text: "Túl gyors! Várj egy kicsit a következő próbálkozás előtt." });
      return;
    }
    if (!email) return;
    const added = siteData.addSubscriber(email);
    setMsg({ ok: true, text: added ? "Sikeres feliratkozás! Köszönjük." : "Ezzel az email címmel már korábban feliratkoztál." });
    setLast(now);
    setEmail("");
  };

  return (
    <section className="py-16 bg-gradient-to-br from-tomato-500 to-tomato-600">
      <div className="max-w-3xl mx-auto px-5 text-center text-white">
        <div className="text-5xl mb-4">✉️</div>
        <h2 className="display text-3xl md:text-4xl font-extrabold">{content.newsletterTitle}</h2>
        <p className="mt-3 text-white/90 whitespace-pre-line">{content.newsletterSubtitle}</p>
        <form onSubmit={submit} className="mt-8 max-w-md mx-auto">
          <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off"
                 className="absolute opacity-0 h-0 w-0 pointer-events-none" name="website" />
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" required placeholder="email@cim.hu" value={email} onChange={e => setEmail(e.target.value)}
                   className="flex-1 rounded-full px-5 py-3 text-ink-900 bg-white/95 placeholder:text-ink-800/50 outline-none" />
            <button type="submit" className="bg-ink-900 hover:bg-ink-800 text-white font-semibold px-6 py-3 rounded-full transition">
              {content.newsletterCta}
            </button>
          </div>
          {msg && <p className={`mt-3 text-sm ${msg.ok ? "text-white" : "text-yellow-100"}`}>{msg.text}</p>}
          <p className="mt-3 text-xs text-white/70">{content.newsletterFinePrint}</p>
        </form>
      </div>
    </section>
  );
}
