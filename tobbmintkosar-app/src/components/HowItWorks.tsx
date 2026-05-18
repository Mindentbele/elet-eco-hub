import { SiteContent } from "@/lib/siteData";

export default function HowItWorks({ content }: { content: SiteContent }) {
  return (
    <section id="how" className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-leaf-600 font-semibold uppercase tracking-wider text-sm">{content.howKicker}</span>
          <h2 className="display text-3xl md:text-5xl font-extrabold mt-3">{content.howTitle}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {content.howSteps.map((s, i) => (
            <div key={s.id} className="bg-white rounded-2xl p-7 shadow-sm border border-cream-200 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-tomato-500 text-white font-display font-extrabold text-xl flex items-center justify-center shadow-lg">{i + 1}</div>
              <div className="text-4xl mb-3">{s.emoji}</div>
              <h3 className="font-display text-2xl font-bold mb-2">{s.title}</h3>
              <p className="text-ink-800/70 whitespace-pre-line">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={content.shopUrl} target="_blank" rel="noopener"
             className="inline-flex items-center gap-2 bg-tomato-500 hover:bg-tomato-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-tomato-500/30 transition">
            {content.howCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
