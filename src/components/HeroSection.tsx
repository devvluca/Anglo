import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Heart } from "phosphor-react";
import { useState, useEffect } from "react";
// Imagens de fundo para desktop e mobile
const heroDesktop = "/public/hero_desktop.jpg";
const heroMobile = "/public/hero_mobile.jpg";

const colorMeanings = {
  purple: "Associado à realeza e à espiritualidade, representa a soberania de Cristo, cor litúrgica da Quaresma e Advento",
  beige: "Tom neutro que equilibra a composição, representando simplicidade, clareza e solidez fundamentais na fé", 
  rose: "Variação moderna do roxo, trazendo calor e acessibilidade sem perder sofisticação e caráter simbólico",
  blue: "Remete à serenidade e confiança, fazendo referência à tradição e modernidade",
  green: "Associado ao Tempo Comum litúrgico, representa esperança, crescimento e renovação espiritual"
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
  
  const colors = ['purple', 'beige', 'rose', 'blue', 'green'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 2000); // Muda a cor a cada 2 segundos
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
            <Heart 
              className={`w-4 h-4 transition-colors duration-500 text-${colors[currentColorIndex]}`}
            />
            <span className="text-sm font-medium">Uma voz de convergência cristã</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Tradição,{" "}
            <span className="text-beige block">Palavra</span>
            <span className="text-blue">& Presença</span>
          </h1>
          
          {/* Subtitle */}
          <p className="font-serif text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Promovendo formação teológica e espiritualidade sólida através da publicação de conteúdos 
            que unem tradição cristã e presença transformadora.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="font-serif text-lg px-8 py-6">
              <BookOpen className="w-5 h-5" />
              Explore Nossos Livros
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="font-serif text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              Conheça Nossa Missão
            </Button>
          </div>
          
          {/* Color description text between buttons and symbol */}
          <div className="mt-8 mb-4 h-12 flex items-center justify-center">
            <div className={`transition-all duration-300 ease-in-out ${
              hoveredColor ? 'opacity-100' : 'opacity-0'
            }`}>
              {hoveredColor && (
                <div className="text-center">
                  <div className="font-serif font-bold text-xl mb-1" style={{ 
                    color: `hsl(var(--${hoveredColor}))`,
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7)',
                  }}>
                    {colorNames[hoveredColor]}
                  </div>
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
          <div className="mb-24 flex justify-center">
            <div className="relative h-24 flex items-center justify-center">
              <div 
                className={`bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer transition-all duration-700 ease-in-out ${
                  isHovered ? 'w-40 h-10 rounded-full' : 'w-20 h-20 rounded-full'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setHoveredColor(null);
                }}
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