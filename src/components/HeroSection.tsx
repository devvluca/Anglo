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
              className="mx-auto mb-5" 
              style={{ maxWidth: '110px', width: '100%' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
                  const missionSection = document.getElementById('mission-section');
                  if (missionSection) {
                    missionSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Conheça nossa Missão
              </Button>
            </motion.div>
          </div>
          
          {/* Color description text between buttons and symbol */}
          <div className="mt-8 mb-8 h-12 flex items-center justify-center">
            <div className={`transition-all duration-300 ease-in-out ${
              hoveredColor ? 'opacity-100' : 'opacity-0'
            }`}>
              {hoveredColor && (
                <div className="text-center">
                  {/* Nome da cor removido conforme solicitado */}
                  <div className="font-serif text-sm leading-relaxed max-w-md" style={{
                    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.6)',
                    color: '#ffffff'
                  }}>
                    {colorMeanings[hoveredColor]}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Trinity Symbol - Interactive 5 Colors */}
          <div className="-mt-16 mb-6 flex justify-center">
            <div className="relative h-24 flex items-center justify-center">
              <div 
                className={`bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer transition-all duration-700 ease-in-out ${
                  isHovered ? 'w-40 h-10 rounded-full' : 'w-20 h-20 rounded-full'
                }`}
                onMouseEnter={handleMouseEnterBall}
                onMouseLeave={handleMouseLeaveBall}
              >
                <div className="relative flex items-center justify-center">
                  {/* Convergent state - all colors together forming a circle */}
                  <div className={`flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isHovered ? 'gap-3' : 'gap-0'
                  }`}>
                    <div 
                      className={`rounded-full bg-purple cursor-pointer transition-all duration-700 ease-in-out ${
                        isHovered ? 'w-4 h-4' : 'w-3 h-3 -mr-1'
                      } ${hoveredColor === 'purple' ? 'scale-125 ring-2 ring-white/50' : ''}`}
                      onMouseEnter={() => setHoveredColor('purple')}
                      onMouseLeave={() => setHoveredColor(null)}
                    />
                    <div 
                      className={`rounded-full bg-beige cursor-pointer transition-all duration-700 ease-in-out ${
                        isHovered ? 'w-4 h-4' : 'w-3 h-3 -mr-1'
                      } ${hoveredColor === 'beige' ? 'scale-125 ring-2 ring-white/50' : ''}`}
                      onMouseEnter={() => setHoveredColor('beige')}
                      onMouseLeave={() => setHoveredColor(null)}
                    />
                    <div 
                      className={`rounded-full bg-rose cursor-pointer transition-all duration-700 ease-in-out ${
                        isHovered ? 'w-4 h-4' : 'w-3 h-3 -mr-1'
                      } ${hoveredColor === 'rose' ? 'scale-125 ring-2 ring-white/50' : ''}`}
                      onMouseEnter={() => setHoveredColor('rose')}
                      onMouseLeave={() => setHoveredColor(null)}
                    />
                    <div 
                      className={`rounded-full bg-blue cursor-pointer transition-all duration-700 ease-in-out ${
                        isHovered ? 'w-4 h-4' : 'w-3 h-3 -mr-1'
                      } ${hoveredColor === 'blue' ? 'scale-125 ring-2 ring-white/50' : ''}`}
                      onMouseEnter={() => setHoveredColor('blue')}
                      onMouseLeave={() => setHoveredColor(null)}
                    />
                    <div 
                      className={`rounded-full bg-green cursor-pointer transition-all duration-700 ease-in-out ${
                        isHovered ? 'w-4 h-4' : 'w-3 h-3'
                      } ${hoveredColor === 'green' ? 'scale-125 ring-2 ring-white/50' : ''}`}
                      onMouseEnter={() => setHoveredColor('green')}
                      onMouseLeave={() => setHoveredColor(null)}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}