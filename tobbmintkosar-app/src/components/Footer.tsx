import { SiteContent } from "@/lib/siteData";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-ink-900 text-white/70 py-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row gap-4 items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-display text-white">
          <span>🧺</span> {content.brandName}
        </div>
        <div>© {new Date().getFullYear()} {content.brandName}. {content.footerText}</div>
        <a href={content.shopUrl} target="_blank" rel="noopener" className="text-tomato-400 hover:text-tomato-50">
          {content.footerShopLabel}
        </a>
      </div>
    </footer>
  );
}
