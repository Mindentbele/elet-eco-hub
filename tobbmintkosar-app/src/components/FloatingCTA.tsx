import { SiteContent } from "@/lib/siteData";

export default function FloatingCTA({ content }: { content: SiteContent }) {
  return (
    <a href={content.shopUrl} target="_blank" rel="noopener" aria-label={content.floatingCtaLabel}
       className="fixed bottom-6 right-6 z-50 group">
      <span className="absolute inset-0 rounded-full bg-tomato-500 animate-pulseRing"></span>
      <span className="relative inline-flex items-center gap-2 bg-tomato-500 hover:bg-tomato-600 text-white font-bold px-5 py-4 rounded-full shadow-2xl shadow-tomato-500/40 transition transform group-hover:-translate-y-0.5">
        <span className="text-xl">🛒</span>
        <span className="hidden sm:inline">{content.floatingCtaLabel}</span>
      </span>
    </a>
  );
}
