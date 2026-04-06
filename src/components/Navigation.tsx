import { useState, useEffect, useRef, type ChangeEvent } from "react";
import { Menu, X, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDefault from "@/assets/logo-default.svg";
import { siteData, defaultNavItems } from "@/lib/siteData";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [navItems, setNavItems] = useState(defaultNavItems);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditable = import.meta.env.DEV;

  useEffect(() => {
    const stored = siteData.getLogo();
    if (stored) setLogoUrl(stored);
    setNavItems(siteData.getNavItems());
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLogoUrl(result);
      siteData.setLogo(result);
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setLogoUrl(null);
    siteData.clearLogo();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center overflow-hidden p-1 shrink-0 bg-card">
              <img src={logoUrl ?? logoDefault} alt="ÉLET-Közösség logó" className="w-full h-full object-contain rounded-lg" />
            </div>
            <span className="text-xl font-bold text-primary">ÉLET-Közösség</span>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {isEditable && (
              <div className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => fileInputRef.current?.click()} aria-label="Logó feltöltése" title="Logó feltöltése">
                  <Upload className="h-4 w-4" />
                </Button>
                {logoUrl && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearLogo} aria-label="Logó eltávolítása" title="Logó eltávolítása">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" className="text-foreground hover:text-primary hover:bg-muted" asChild>
                <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.name}</a>
              </Button>
            ))}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Button key={item.name} variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-muted" asChild>
                  <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.name}</a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
