import { SiteContent } from "@/lib/siteData";

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="top" className="hero-bg veggie-pattern pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
        <div className="animate-fadeUp">
          <span className="inline-flex items-center gap-2 bg-leaf-100 text-leaf-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            🌿 Helyi · Friss · Szezonális
          </span>
          <h1 className="display text-4xl md:text-6xl font-extrabold mt-5 leading-[1.05] text-ink-900">
            Több, mint <span className="text-tomato-600">kosár.</span><br/>
            Egy <span className="text-leaf-600">közösség</span> a tányérodon.
          </h1>
          <p className="mt-5 text-lg text-ink-800/80 max-w-xl">
            Heti friss zöldség- és gyümölcskosarak közvetlenül helyi gazdáktól.
            Rendeld meg pár kattintással — és támogasd a magyar termelőket.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={content.shopUrl} target="_blank" rel="noopener"
               className="inline-flex items-center gap-2 bg-tomato-500 hover:bg-tomato-600 text-white font-bold px-7 py-4 rounded-full text-base shadow-lg shadow-tomato-500/30 transition transform hover:-translate-y-0.5">
              🛒 Vásárolj most a shopban
            </a>
            <a href="#how" className="inline-flex items-center gap-2 bg-white hover:bg-cream-100 text-ink-900 font-semibold px-6 py-4 rounded-full text-base border border-cream-200 transition">
              Hogyan működik?
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-ink-800/70">
            <div className="flex items-center gap-2"><span className="text-leaf-600">✓</span> Heti szállítás</div>
            <div className="flex items-center gap-2"><span className="text-leaf-600">✓</span> Helyi termelők</div>
            <div className="flex items-center gap-2"><span className="text-leaf-600">✓</span> Szezonális</div>
          </div>
        </div>
        <div className="relative animate-fadeUp">
          <div className="absolute -inset-6 bg-gradient-to-tr from-tomato-100 to-leaf-100 rounded-[2rem] blur-2xl opacity-70"></div>
          <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 border border-cream-200">
            <div className="text-7xl md:text-8xl text-center animate-float">🧺</div>
            <div className="grid grid-cols-3 gap-3 mt-6 text-center text-3xl md:text-4xl">
              <div className="bg-tomato-50 rounded-2xl py-4">🍅</div>
              <div className="bg-leaf-50 rounded-2xl py-4">🥬</div>
              <div className="bg-cream-100 rounded-2xl py-4">🥕</div>
              <div className="bg-leaf-50 rounded-2xl py-4">🥦</div>
              <div className="bg-cream-100 rounded-2xl py-4">🍎</div>
              <div className="bg-tomato-50 rounded-2xl py-4">🌽</div>
            </div>
            <p className="text-center text-sm text-ink-800/60 mt-5">A heti kosár tartalma a szezontól függ.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
