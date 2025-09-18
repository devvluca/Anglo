import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Heart } from "phosphor-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Imagens de fundo para desktop e mobile
const heroDesktop = "/hero_desktop.jpg";
const heroMobile = "/hero_mobile.jpg";

const colorMeanings = {
  purple: "Soberania de Cristo",
  beige: "Simplicidade e Clareza na fé", 
  rose: "Calor e Acessibilidade",
  blue: "Tradição e Modernidade",
  green: "Tempo Comum Litúrgico"
};

const colorNames = {
  purple: "Roxo",
  beige: "Bege", 
  rose: "Rosa",
  blue: "Azul",
  green: "Verde"
};

export function HeroSection() {
  const [hoveredColor, setHoveredColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  
  const colors = ['purple', 'beige', 'rose', 'blue', 'green'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 2000); // Muda a cor a cada 2 segundos
    
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnterBall = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsHovered(true);
  };

  const handleMouseLeaveBall = () => {
    const timeout = setTimeout(() => {
      setIsHovered(false);
      setHoveredColor(null);
    }, 500); // 0.5 segundos de delay
    setHoverTimeout(timeout);
  };

  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-0">
      {/* Bolas decorativas com efeito prisma */}
      <div className="absolute top-1/4 left-8 w-16 h-16 opacity-30 pointer-events-none animate-pulse">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple/40 via-rose/30 to-blue/40 filter blur-sm animate-bounce" style={{animationDuration: '4s'}} />
      </div>
      <div className="absolute bottom-1/3 right-12 w-12 h-12 opacity-25 pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-beige/50 via-green/30 to-purple/40 filter blur-sm animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}} />
      </div>
      <div className="absolute top-2/3 left-16 w-8 h-8 opacity-35 pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue/40 via-rose/30 to-beige/40 filter blur-sm animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}} />
      </div>
      <div className="absolute top-1/5 right-20 w-10 h-10 opacity-30 pointer-events-none animate-pulse">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-green/40 via-purple/30 to-rose/40 filter blur-sm" style={{animationDuration: '3.5s', animationDelay: '0.5s'}} />
      </div>
      
      {/* Prisma sutil original */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple/30 via-rose/30 to-blue/30 filter blur-sm" />
      </div>
      {/* Background Image responsiva */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroDesktop})` }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${heroMobile})` }}
      />
      

      
      {/* Content */}
  <div className="relative z-10 container mx-auto px-4 text-center text-white pt-4">
        <div className="w-full md:max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-4">
            <motion.img 
              src="/logo_branco.png" 
              alt="Logo Anglo" 
              className="mx-auto mb-5 cursor-pointer" 
              style={{ maxWidth: '110px', width: '100%' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
            />
            <motion.span 
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-white drop-shadow-lg text-center mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              UMA VOZ DE<br />CONVERGÊNCIA CRISTÃ
            </motion.span>
            <motion.p 
              className="font-serif text-base md:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Somos uma editora cristã que une tradição e renovação. <br /> Os conteúdos que iremos compartilhar bebem das fontes do evangelicalismo, da liturgia sacramental e da sensibilidade carismática.
            </motion.p>
            <motion.div 
              className="flex justify-center items-center mb-8 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              <Button
                variant="hero"
                className="font-serif text-lg px-8 py-2 ml-0 rounded-full bg-purple/80 hover:bg-purple/90 hover:scale-105 transition-all duration-700 shadow-lg border-2 border-white/20"
                onClick={() => {
                  const aboutSection = document.getElementById('about-section');
                  if (aboutSection) {
                    const rect = aboutSection.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = rect.top + scrollTop - 180; // 180px antes do topo
                    // Scroll suave customizado, ainda mais devagar
                    const startY = window.scrollY;
                    const distance = targetY - startY;
                    const duration = 1200; // ms, mais rápido
                    let startTime: number | null = null;
                    function animateScroll(currentTime: number) {
                      if (!startTime) startTime = currentTime;
                      const elapsed = currentTime - startTime;
                      const progress = Math.min(elapsed / duration, 1);
                      const ease = 1 - Math.pow(1 - progress, 3); // easeOut cubic
                      window.scrollTo(0, startY + distance * ease);
                      if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                      }
                    }
                    requestAnimationFrame(animateScroll);
                  }
                }}
              >
                Saiba mais sobre a Anglo
              </Button>
            </motion.div>
          </div>
          
          {/* Espaço extra para descer os elementos */}
          <div className="mt-24" />
        </div>
      </div>

    </section>
  );
}