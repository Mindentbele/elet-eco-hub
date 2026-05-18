import { SiteContent } from "@/lib/siteData";

export default function About({ content }: { content: SiteContent }) {
  const cards = [
    { e: content.aboutCard1Emoji, t: content.aboutCard1Title, d: content.aboutCard1Desc },
    { e: content.aboutCard2Emoji, t: content.aboutCard2Title, d: content.aboutCard2Desc },
    { e: content.aboutCard3Emoji, t: content.aboutCard3Title, d: content.aboutCard3Desc },
  ];
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <span className="text-tomato-600 font-semibold uppercase tracking-wider text-sm">{content.aboutKicker}</span>
        <h2 className="display text-3xl md:text-5xl font-extrabold mt-3">{content.aboutTitle}</h2>
        <p className="mt-6 text-lg text-ink-800/80 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">{content.aboutBody}</p>
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {cards.map((x, i) => (
            <div key={i} className="bg-cream-50 rounded-2xl p-6 border border-cream-200">
              <div className="text-4xl mb-3">{x.e}</div>
              <h3 className="font-display text-xl font-bold mb-2">{x.t}</h3>
              <p className="text-sm text-ink-800/70 whitespace-pre-line">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
