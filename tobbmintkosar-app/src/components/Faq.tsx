import { Faq as FaqType } from "@/lib/siteData";

export default function Faq({ faqs }: { faqs: FaqType[] }) {
  return (
    <section id="faq" className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="text-leaf-600 font-semibold uppercase tracking-wider text-sm">GYIK</span>
          <h2 className="display text-3xl md:text-5xl font-extrabold mt-3">Gyakori kérdések</h2>
        </div>
        <div className="space-y-3">
          {faqs.map(f => (
            <details key={f.id} className="group bg-white rounded-2xl p-5 border border-cream-200 open:shadow-md transition">
              <summary className="cursor-pointer font-display font-bold text-lg flex justify-between items-center list-none">
                {f.question}
                <span className="text-tomato-500 text-2xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-ink-800/70 whitespace-pre-line">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
