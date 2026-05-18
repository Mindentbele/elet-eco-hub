import { SiteContent } from "@/lib/siteData";
import { scrollToId } from "@/lib/scroll";

const bgMap: Record<string, string> = {
  tomato: "bg-tomato-50",
  leaf: "bg-leaf-50",
  cream: "bg-cream-100",
};

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="top" className="hero-bg veggie-pattern pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
        <div className="animate-fadeUp">
          <span className="inline-flex items-center gap-2 bg-leaf-100 text-leaf-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {content.heroBadge}
          </span>
          <h1 className="display text-4xl md:text-6xl font-extrabold mt-5 leading-[1.05] text-ink-900">
            {content.heroTitleLine1} <span className="text-tomato-600">{content.heroTitleAccent}</span><br/>
            {content.heroTitleLine2Prefix} <span className="text-leaf-600">{content.heroTitleLine2Accent}</span> a tányérodon.
          </h1>
          <p className="mt-5 text-lg text-ink-800/80 max-w-xl whitespace-pre-line">{content.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={content.shopUrl} target="_blank" rel="noopener"
               className="inline-flex items-center gap-2 bg-tomato-500 hover:bg-tomato-600 text-white font-bold px-7 py-4 rounded-full text-base shadow-lg shadow-tomato-500/30 transition transform hover:-translate-y-0.5">
              {content.heroCtaPrimary}
            </a>
            <button onClick={() => scrollToId("how")} className="inline-flex items-center gap-2 bg-white hover:bg-cream-100 text-ink-900 font-semibold px-6 py-4 rounded-full text-base border border-cream-200 transition">
              {content.heroCtaSecondary}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-ink-800/70">
            <div className="flex items-center gap-2"><span className="text-leaf-600">✓</span> {content.heroBenefit1}</div>
            <div className="flex items-center gap-2"><span className="text-leaf-600">✓</span> {content.heroBenefit2}</div>
            <div className="flex items-center gap-2"><span className="text-leaf-600">✓</span> {content.heroBenefit3}</div>
          </div>
        </div>
        <div className="relative animate-fadeUp">
          <div className="absolute -inset-6 bg-gradient-to-tr from-tomato-100 to-leaf-100 rounded-[2rem] blur-2xl opacity-70"></div>
          <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 border border-cream-200">
            {content.heroImageUrl ? (
              <img src={content.heroImageUrl} alt="Heti kosár" className="w-full h-72 object-cover rounded-2xl" />
            ) : (
              <>
                <div className="text-7xl md:text-8xl text-center animate-float">🧺</div>
                <div className="grid grid-cols-3 gap-3 mt-6 text-center text-3xl md:text-4xl">
                  {content.basketItems.map(it => (
                    <div key={it.id} className={`${bgMap[it.bg] || bgMap.leaf} rounded-2xl py-4`}>{it.emoji}</div>
                  ))}
                </div>
              </>
            )}
            <p className="text-center text-sm text-ink-800/60 mt-5">{content.basketCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
