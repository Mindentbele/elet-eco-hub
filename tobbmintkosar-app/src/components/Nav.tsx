import { SiteContent } from "@/lib/siteData";

export default function Nav({ content }: { content: SiteContent }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-cream-50/80 backdrop-blur border-b border-cream-200">
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-extrabold text-leaf-700">
          {content.logoDataUrl ? (
            <img src={content.logoDataUrl} alt="Logo" className="h-9 w-9 object-contain" />
          ) : (
            <span className="text-2xl">🧺</span>
          )}
          Több, mint kosár
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-800">
          <li><a className="hover:text-tomato-600" href="#about">Rólunk</a></li>
          <li><a className="hover:text-tomato-600" href="#how">Hogyan működik</a></li>
          <li><a className="hover:text-tomato-600" href="#producers">Termelők</a></li>
          <li><a className="hover:text-tomato-600" href="#faq">GYIK</a></li>
          <li><a className="hover:text-tomato-600" href="#contact">Kapcsolat</a></li>
        </ul>
        <a href={content.shopUrl} target="_blank" rel="noopener"
           className="hidden sm:inline-flex items-center gap-2 bg-tomato-500 hover:bg-tomato-600 text-white font-semibold px-4 py-2 rounded-full text-sm shadow-md transition">
          Irány a shop →
        </a>
      </nav>
    </header>
  );
}
