import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { X, List } from "phosphor-react";
import { SearchBar } from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { AccountIcon } from "./AccountIcon";


const navigationLinks = [
  { href: "/", label: "Início" },
  { href: "/", label: "Sobre" },
  { href: "/#newsletter-section", label: "Contato" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    const scrollToSection = () => {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId === 'newsletter-section') {
        const el = document.getElementById(sectionId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 40;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      } else if (sectionId === 'about-section') {
        // Procurar por vários possíveis seletores da seção About
        const el = document.querySelector("section[id='about-section'], section#about, #about, .about-section, [data-section='about']");
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 40;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };
    
    // Se estamos em página diferente da home, navegar para home primeiro
    if (location.pathname !== '/') {
      navigate('/');
      // Usar timeout para scroll após navegação
      setTimeout(() => {
        scrollToSection();
      }, 150);
    } else {
      // Já estamos na home, apenas scroll
      scrollToSection();
    }
  };

  return (
            <nav 
              className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50 translate-y-0"
              style={{ willChange: 'transform' }}
            >
  <div className="container mx-auto px-4">
  <div className="flex items-center justify-between h-20">
          {/* Logo */}
            <div className="flex items-center gap-3 lg:translate-x-[-10px]">
              <button
                aria-label="Ir para o início"
                className="focus:outline-none"
                style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src="/horizontal_navbar.png"
                  alt="Logo Editora Anglo"
                  className="w-48 h-auto object-contain cursor-pointer"
                />
              </button>
            </div>

          {/* Desktop Navigation a */}
          <div className="hidden lg:flex items-center gap-10 pl-0">
            {navigationLinks.map((link) => {
              const style = { transform: 'translateX(-30px)' };
              if (link.label === "Contato") {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-serif font-medium transition-colors relative group text-foreground hover:text-purple"
                    style={style}
                    onClick={e => handleNavigation(e, 'newsletter-section')}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-purple" />
                  </a>
                );
              }
              if (link.label === "Início") {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-serif font-medium transition-colors relative group text-foreground hover:text-purple"
                    style={style}
                    onClick={e => handleNavigation(e, 'top')}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-purple" />
                  </a>
                );
              }
              if (link.label === "Sobre") {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-serif font-medium transition-colors relative group text-foreground hover:text-purple"
                    style={style}
                    onClick={e => handleNavigation(e, 'about-section')}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-purple" />
                  </a>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-serif font-medium transition-colors relative group text-foreground hover:text-purple"
                  style={style}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-purple" />
                </a>
              );
            })}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <SearchBar />
            <CartIcon />
            <AccountIcon />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <div className="flex items-center gap-2 justify-between w-full">
              <SearchBar />
              <div className="flex-1 flex justify-center">
                <CartIcon />
              </div>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="transition-colors text-foreground hover:text-purple hover:bg-purple/10"
                  >
                    <List className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-3 mb-8 pt-4">
                    <button
                      aria-label="Ir para o início"
                      className="focus:outline-none"
                      style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                      onClick={() => {
                        setIsOpen(false);
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }, 250);
                      }}
                    >
                      <img
                        src="/horizontal_navbar.png"
                        alt="Logo Editora Anglo"
                        className="w-32 h-auto object-contain cursor-pointer"
                      />
                    </button>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-4 mb-8">
                    {navigationLinks.map((link) => {
                      if (link.label === "Contato") {
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            className="font-serif text-lg font-medium text-foreground hover:text-purple transition-colors py-2"
                            onClick={e => {
                              handleNavigation(e, 'newsletter-section');
                              setIsOpen(false);
                            }}
                          >
                            {link.label}
                          </a>
                        );
                      }
                      if (link.label === "Início") {
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            className="font-serif text-lg font-medium text-foreground hover:text-purple transition-colors py-2"
                            onClick={e => {
                              handleNavigation(e, 'top');
                              setIsOpen(false);
                            }}
                          >
                            {link.label}
                          </a>
                        );
                      }
                      if (link.label === "Sobre") {
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            className="font-serif text-lg font-medium text-foreground hover:text-purple transition-colors py-2"
                            onClick={e => {
                              handleNavigation(e, 'about-section');
                              setIsOpen(false);
                            }}
                          >
                            {link.label}
                          </a>
                        );
                      }
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          className="font-serif text-lg font-medium text-foreground hover:text-purple transition-colors py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </a>
                      );
                    })}
                  </div>

                  {/* Mobile Actions */}
                  <div className="space-y-4 mt-auto pb-8">
                    <div className="flex items-center gap-4 justify-center">
                      <SearchBar onClose={() => setIsOpen(false)} />
                      <CartIcon />
                      <AccountIcon />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
}