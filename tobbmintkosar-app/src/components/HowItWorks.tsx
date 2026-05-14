export default function HowItWorks({ shopUrl }: { shopUrl: string }) {
  const steps = [
    { n: 1, e: "🛒", t: "Válaszd ki", d: "Nézd meg az aktuális kínálatot a shopunkban, és állítsd össze a saját kosaradat." },
    { n: 2, e: "📦", t: "Rendelj", d: "Néhány kattintás, és a rendelés már a termelőkhöz került. A héten összekészítjük." },
    { n: 3, e: "🚚", t: "Vedd át", d: "Vedd át az átvételi ponton, vagy kérd kiszállítva — frissen, gyorsan." },
  ];
  return (
    <section id="how" className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-leaf-600 font-semibold uppercase tracking-wider text-sm">Egyszerű</span>
          <h2 className="display text-3xl md:text-5xl font-extrabold mt-3">Hogyan működik?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(s => (
            <div key={s.n} className="bg-white rounded-2xl p-7 shadow-sm border border-cream-200 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-tomato-500 text-white font-display font-extrabold text-xl flex items-center justify-center shadow-lg">{s.n}</div>
              <div className="text-4xl mb-3">{s.e}</div>
              <h3 className="font-display text-2xl font-bold mb-2">{s.t}</h3>
              <p className="text-ink-800/70">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={shopUrl} target="_blank" rel="noopener"
             className="inline-flex items-center gap-2 bg-tomato-500 hover:bg-tomato-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-tomato-500/30 transition">
            Indítsd a rendelést →
          </a>
        </div>
      </div>
    </section>
  );
}
