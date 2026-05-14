import { SiteContent } from "@/lib/siteData";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-ink-900 text-white/70 py-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row gap-4 items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-display text-white">
          <span>🧺</span> Több, mint kosár
        </div>
        <div>© {new Date().getFullYear()} Több, mint kosár. Minden jog fenntartva.</div>
        <a href={content.shopUrl} target="_blank" rel="noopener" className="text-tomato-400 hover:text-tomato-50">
          shop.tobbmintkosar.hu →
        </a>
      </div>
    </footer>
  );
}
