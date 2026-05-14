import { Producer } from "@/lib/siteData";

const bgMap: Record<Producer["bgColor"], string> = {
  leaf: "bg-leaf-50 border-leaf-100",
  tomato: "bg-tomato-50 border-tomato-100",
  cream: "bg-cream-100 border-cream-200",
};

export default function Producers({ producers }: { producers: Producer[] }) {
  return (
    <section id="producers" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-tomato-600 font-semibold uppercase tracking-wider text-sm">Termelőink</span>
          <h2 className="display text-3xl md:text-5xl font-extrabold mt-3">Akik mögötte állnak</h2>
          <p className="mt-4 text-ink-800/70 max-w-2xl mx-auto">Helyi gazdák, kézművesek, kistermelők — mindannyian szenvedéllyel készítik, amit eszel.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {producers.map(p => (
            <div key={p.id} className={`${bgMap[p.bgColor] || bgMap.leaf} rounded-2xl p-6 text-center border`}>
              <div className="text-5xl mb-3">{p.emoji}</div>
              <h3 className="font-display font-bold">{p.name}</h3>
              <p className="text-sm text-ink-800/60 mt-1">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
