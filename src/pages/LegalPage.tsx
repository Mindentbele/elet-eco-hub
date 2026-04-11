import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteData } from "@/lib/siteData";
import logoDefault from "@/assets/logo-default.svg";

const pageTitles: Record<string, string> = {
  privacy: "Adatvédelmi szabályzat",
  terms: "Felhasználási feltételek",
  reports: "Kötelező jelentések",
};

const LegalPage = ({ pageKey }: { pageKey: string }) => {
  const [content, setContent] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const logoUrl = siteData.getLogo();

  useEffect(() => {
    const pages = siteData.getLegalPages();
    const page = pages[pageKey];
    if (page) {
      setContent(page.content || "");
      setPdfUrl(page.pdfUrl || "");
    }
    document.title = `${pageTitles[pageKey] || "Oldal"} | ÉLET-Közösség Egyesület`;
  }, [pageKey]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center gap-3 sticky top-0 z-50">
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-card p-0.5">
            <img src={logoUrl ?? logoDefault} alt="Logó" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold">{pageTitles[pageKey] || "Oldal"}</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">{pageTitles[pageKey]}</h1>

        {pdfUrl && (
          <div className="mb-8 p-4 bg-muted rounded-xl flex items-center justify-between">
            <span className="text-sm text-muted-foreground">📄 Letölthető dokumentum elérhető</span>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">PDF megnyitása</Button>
            </a>
          </div>
        )}

        {content ? (
          <div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap leading-relaxed">
            {content}
          </div>
        ) : (
          <p className="text-muted-foreground text-lg">Ez az oldal még nem tartalmaz tartalmat. Az adminisztrációs felületen töltheted fel.</p>
        )}
      </div>

      <footer className="bg-primary text-primary-foreground/60 text-center py-6 text-sm">
        <Link to="/" className="hover:text-primary-foreground transition-colors">← Vissza a főoldalra</Link>
      </footer>
    </div>
  );
};

export default LegalPage;
