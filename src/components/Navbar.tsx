import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { X, List, ShoppingCart, MagnifyingGlass, User } from "phosphor-react";

const navigationLinks = [
  { href: "#", label: "Início" },
  { href: "#", label: "Livros" },
  { href: "#", label: "Categorias" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Sobre" },
  { href: "#", label: "Contato" }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
            <nav 
              className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled || isHovered
                  ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50" 
                  : "bg-transparent border-none shadow-none"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
  <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={(isScrolled || isHovered) ? "/logo_com_nome.png" : "/logo_com_nome_bege.png"}
              alt="Logo Editora Anglo"
              className="w-32 h-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-serif font-medium transition-colors relative group ${
                  (isScrolled || isHovered)
                    ? "text-foreground hover:text-purple" 
                    : "text-white/90 hover:text-beige"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                  (isScrolled || isHovered) ? "bg-purple" : "bg-beige"
                }`} />
              </a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors ${
                (isScrolled || isHovered)
                  ? "text-foreground hover:text-purple hover:bg-purple/10" 
                  : "text-white/90 hover:text-beige hover:bg-white/10"
              }`}
            >
              <MagnifyingGlass className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors ${
                (isScrolled || isHovered)
                  ? "text-foreground hover:text-purple hover:bg-purple/10" 
                  : "text-white/90 hover:text-beige hover:bg-white/10"
              }`}
            >
              <User className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors ${
                (isScrolled || isHovered)
                  ? "text-foreground hover:text-purple hover:bg-purple/10" 
                  : "text-white/90 hover:text-beige hover:bg-white/10"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>

            <Button 
              variant={(isScrolled || isHovered) ? "spiritual" : "hero"} 
              className="font-serif ml-4"
            >
              Explorar Livros
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-colors ${
                    (isScrolled || isHovered)
                      ? "text-foreground hover:text-purple hover:bg-purple/10" 
                      : "text-white/90 hover:text-beige hover:bg-white/10"
                  }`}
                >
                  <List className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-3 mb-8 pt-4">
                    <img
                      src={(isScrolled || isHovered) ? "/logo_com_nome.png" : "/logo_com_nome_bege.png"}
                      alt="Logo Editora Anglo"
                      className="w-32 h-auto object-contain"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-4 mb-8">
                    {navigationLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="font-serif text-lg font-medium text-foreground hover:text-purple transition-colors py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="space-y-4 mt-auto pb-8">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="icon">
                        <MagnifyingGlass className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <User className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ShoppingCart className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <Button variant="spiritual" className="w-full font-serif">
                      Explorar Livros
                    </Button>
                  </div>

                  {/* Trinity Symbol */}
                  <div className="flex justify-center pb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-beige/60"></div>
                        <div className="w-2 h-2 rounded-full bg-rose/60 -ml-0.5"></div>
                        <div className="w-2 h-2 rounded-full bg-blue/60 -ml-0.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}