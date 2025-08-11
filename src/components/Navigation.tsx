import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Kezdőlap", href: "#home" },
    { name: "Rólunk", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Galéria", href: "#gallery" },
    { name: "Események", href: "#events" },
    { name: "Támogatók", href: "#supporters" },
    { name: "Kapcsolat", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-nature-gradient rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">É</span>
            </div>
            <span className="text-xl font-bold text-primary">ÉLET-Közösség</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="text-foreground hover:text-primary hover:bg-muted"
                asChild
              >
                <a href={item.href}>{item.name}</a>
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-primary hover:bg-muted"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a href={item.href}>{item.name}</a>
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