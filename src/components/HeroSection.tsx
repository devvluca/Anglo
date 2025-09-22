import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Heart } from "phosphor-react";
import { motion as m } from "framer-motion";
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
  const [showStaticLogo, setShowStaticLogo] = useState(false);
  
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
    {/* Overlay branco sutil na base do HeroSection, cobrindo toda a largura */}
  <div className="pointer-events-none absolute left-0 right-0 bottom-0 w-full h-[1.2vh] bg-gradient-to-t from-white to-transparent z-10" />
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
        <div className="w-full md:max-w-4xl mx-auto pb-20">
          <div className="flex flex-col items-center justify-center gap-4 mt-16">
            <div className="relative w-full h-32 flex items-end justify-center">
              <img
                src="/LogoAnimada-EditoraAngloMono-Alfa.webp"
                alt="Logo Anglo animada"
                className={`absolute bottom-1 mb-5 cursor-pointer translate-y-8${showStaticLogo ? ' hidden' : ''}`}
                style={{ maxWidth: '110px', width: '100%' }}
                onLoad={() => {
                  setTimeout(() => setShowStaticLogo(true), 4500);
                }}
              />
              {showStaticLogo && (
                <img
                  src="/frame_099.png"
                  alt="Logo Anglo estática"
                  className="absolute bottom-1 mb-5 cursor-pointer translate-y-8 transition-transform duration-300 hover:scale-110"
                  style={{ maxWidth: '110px', width: '100%' }}
                />
              )}
            </div>
            <motion.span 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white drop-shadow-lg text-center mb-2 mt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              UMA VOZ DE<br />CONVERGÊNCIA CRISTÃ
            </motion.span>
            <motion.p 
              className="font-modern text-xs md:text-sm lg:text-base max-w-xl mx-auto leading-relaxed opacity-90 mt-2"
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
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
              >
{/* Arrow animation */}
<button
  aria-label="Ir para a próxima seção"
  className="block cursor-pointer bg-transparent border-none p-0"
  onClick={() => {
    window.scrollBy({ top: 350, left: 0, behavior: "smooth" });
  }}
>
  <m.div
    animate={{ y: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.7 }}
    className="mt-2"
  >
    <m.svg
      width="32"
      height="48"
      viewBox="0 0 32 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <m.path
        d="M16 8V40"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <m.path
        d="M8 32L16 40L24 32"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 1.1 }}
      />
    </m.svg>
  </m.div>
</button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Sobre Nós Section */}
          <motion.div 
            className="mt-12 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-beige font-light">
                      Nossa Missão
                    </h2>
                <motion.div
                  className="w-40 h-0.5 bg-beige rounded-full mx-auto"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.2, ease: 'easeOut', delay: 2.2 }}
                  style={{ transformOrigin: 'center' }}
                />
              </div>
              
              <div className="space-y-6 text-white leading-relaxed">
                <p className="text-base md:text-lg font-modern opacity-90">
                  A <span className="font-semibold text-beige">Editora Anglo</span> nasceu com a missão de promover literatura
                  espiritual e formação cristã de qualidade, sendo um farol de conhecimento e fé para leitores em busca
                  de crescimento pessoal e espiritual.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Espaço extra para descer os elementos */}
          <div className="mt-24" />
        </div>
      </div>

    </section>
  );
}