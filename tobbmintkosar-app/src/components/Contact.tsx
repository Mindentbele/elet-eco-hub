import { SiteContent } from "@/lib/siteData";

export default function Contact({ content }: { content: SiteContent }) {
  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-br from-leaf-600 to-leaf-700 text-white">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <h2 className="display text-3xl md:text-5xl font-extrabold">Kérdésed van?</h2>
        <p className="mt-4 text-white/85 text-lg">Írj vagy hívj minket bátran — szívesen segítünk.</p>
        <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          <a href={`mailto:${content.contactEmail}`} className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl p-6 transition border border-white/20">
            <div className="text-3xl mb-2">✉️</div>
            <div className="font-bold">Email</div>
            <div className="text-sm text-white/80 mt-1 break-all">{content.contactEmail}</div>
          </a>
          <a href={`tel:${content.contactPhone.replace(/\s/g, "")}`} className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl p-6 transition border border-white/20">
            <div className="text-3xl mb-2">📞</div>
            <div className="font-bold">Telefon</div>
            <div className="text-sm text-white/80 mt-1">{content.contactPhone}</div>
          </a>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-2">📍</div>
            <div className="font-bold">Cím</div>
            <div className="text-sm text-white/80 mt-1">{content.contactAddress}</div>
          </div>
        </div>

        {content.mapEmbedUrl && (
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <iframe
              src={content.mapEmbedUrl}
              title="Térkép"
              className="w-full h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        <a href={content.shopUrl} target="_blank" rel="noopener"
           className="mt-12 inline-flex items-center gap-2 bg-tomato-500 hover:bg-tomato-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl transition transform hover:-translate-y-0.5">
          🛒 Irány a shop
        </a>
      </div>
    </section>
  );
}
