import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const colorMeanings = {
  purple: "Soberania de Cristo",
  beige: "Simplicidade e Clareza na fé", 
  rose: "Calor e Acessibilidade",
  blue: "Tradição e Modernidade",
  green: "Tempo Comum Litúrgico"
};

const colorDescriptions = {
  purple: "O roxo representa a majestade e soberania de Cristo, lembrando-nos de que Ele é o Rei dos reis e Senhor dos senhores.",
  beige: "O bege simboliza a simplicidade e clareza da fé, refletindo a pureza e transparência que devemos buscar em nossa jornada espiritual.",
  rose: "O rosa expressa o calor humano e a acessibilidade do evangelho, mostrando o amor incondicional de Deus por toda a humanidade.",
  blue: "O azul une tradição e modernidade, representando a continuidade da fé através dos tempos e sua relevância eterna.",
  green: "O verde simboliza o tempo comum litúrgico, o crescimento espiritual e a renovação constante em nossa caminhada cristã."
};

export function ColorsSection() {
  const infoDisplayRef = useRef<HTMLDivElement>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [firstReveal, setFirstReveal] = useState(false);
  const [lastColor, setLastColor] = useState<string | null>(null);

  const colors = ['purple', 'beige', 'rose', 'blue', 'green'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 3000); // Muda a cor a cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  // Abre automaticamente ao entrar na tela
  useEffect(() => {
    const ref = infoDisplayRef.current;
    if (!ref) return;
    let triggered = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered && !hoveredColor) {
          setHoveredColor(colors[0]);
          setIsHovered(true); // Simula hover automático
          triggered = true;
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, []); // Removido hoveredColor da dependência para não travar a troca

  // Detecta primeira revelação
  useEffect(() => {
    if (hoveredColor && !firstReveal) {
      setFirstReveal(true);
    }
    if (hoveredColor && hoveredColor !== lastColor) {
      setLastColor(hoveredColor);
    }
  }, [hoveredColor, firstReveal, lastColor]);

  const handleMouseEnterBall = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsHovered(true);
  };

  const handleMouseLeaveBall = () => {
    if (firstReveal) return; // Mantém aberta após a primeira revelação
    const timeout = setTimeout(() => {
      setIsHovered(false);
      setHoveredColor(null);
    }, 500);
    setHoverTimeout(timeout);
  };

  // Função utilitária para hex das cores
  function getColorHex(color: string) {
    switch (color) {
      case 'purple': return '#9333ea';
      case 'beige': return '#f5f5dc';
      case 'rose': return '#fb7185';
      case 'blue': return '#3b82f6';
      case 'green': return '#22c55e';
      default: return 'rgba(255,255,255,0.95)';
    }
  }

  return (
  <section className="pt-20 pb-8 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden font-display">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple/20 filter blur-xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-rose/20 filter blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-blue/20 filter blur-xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Nossas <span className="text-purple hover:text-rose transition-colors duration-500">cores</span>
          </motion.h2>
          <motion.p 
            className="font-serif text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Cada cor em nossa identidade carrega um significado profundo, refletindo aspectos essenciais da fé cristã e nossa missão editorial.
          </motion.p>
        </motion.div>



        {/* Interactive Color Ball - Center */}
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative flex items-center justify-center mb-8">
            <motion.div 
              className={`bg-white/20 backdrop-blur-sm border-2 border-gray-200/50 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-700 ease-in-out ${
                isHovered ? 'w-96 h-24 rounded-full' : 'w-56 h-56 rounded-full'
              }`}
              onMouseEnter={handleMouseEnterBall}
              onMouseLeave={handleMouseLeaveBall}
              whileHover={{ scale: 1.02 }}
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))'
              }}
            >
              <div className="relative flex items-center justify-center">
                <div className={`flex items-center justify-center transition-all duration-700 ease-in-out ${
                  isHovered ? 'gap-6' : 'gap-0'
                }`}>
                  <div 
                    className={`rounded-full bg-purple cursor-pointer transition-all duration-700 ease-in-out shadow-lg ${
                      isHovered ? 'w-8 h-8' : 'w-6 h-6 -mr-2'
                    } ${hoveredColor === 'purple' ? 'scale-125' : ''}`}
                    onMouseEnter={() => setHoveredColor('purple')}
                    style={{ 
                      boxShadow: hoveredColor === 'purple' ? '0 0 0 4px rgba(147, 51, 234, 0.3)' : undefined 
                    }}
                  />
                  <div 
                    className={`rounded-full bg-beige cursor-pointer transition-all duration-700 ease-in-out shadow-lg ${
                      isHovered ? 'w-8 h-8' : 'w-6 h-6 -mr-2'
                    } ${hoveredColor === 'beige' ? 'scale-125' : ''}`}
                    onMouseEnter={() => setHoveredColor('beige')}
                    style={{ 
                      boxShadow: hoveredColor === 'beige' ? '0 0 0 4px rgba(245, 245, 220, 0.5)' : undefined 
                    }}
                  />
                  <div 
                    className={`rounded-full bg-rose cursor-pointer transition-all duration-700 ease-in-out shadow-lg ${
                      isHovered ? 'w-8 h-8' : 'w-6 h-6 -mr-2'
                    } ${hoveredColor === 'rose' ? 'scale-125' : ''}`}
                    onMouseEnter={() => setHoveredColor('rose')}
                    style={{ 
                      boxShadow: hoveredColor === 'rose' ? '0 0 0 4px rgba(251, 113, 133, 0.3)' : undefined 
                    }}
                  />
                  <div 
                    className={`rounded-full bg-blue cursor-pointer transition-all duration-700 ease-in-out shadow-lg ${
                      isHovered ? 'w-8 h-8' : 'w-6 h-6 -mr-2'
                    } ${hoveredColor === 'blue' ? 'scale-125' : ''}`}
                    onMouseEnter={() => setHoveredColor('blue')}
                    style={{ 
                      boxShadow: hoveredColor === 'blue' ? '0 0 0 4px rgba(59, 130, 246, 0.3)' : undefined 
                    }}
                  />
                  <div 
                    className={`rounded-full bg-green cursor-pointer transition-all duration-700 ease-in-out shadow-lg ${
                      isHovered ? 'w-8 h-8' : 'w-6 h-6'
                    } ${hoveredColor === 'green' ? 'scale-125' : ''}`}
                    onMouseEnter={() => setHoveredColor('green')}
                    style={{ 
                      boxShadow: hoveredColor === 'green' ? '0 0 0 4px rgba(34, 197, 94, 0.3)' : undefined 
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.p 
            className="text-center text-gray-500 font-serif text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
            Passe o mouse sobre as cores para descobrir seus significados
          </motion.p>
        </motion.div>

        {/* Color Information Display - Bottom */}
        <motion.div
          ref={infoDisplayRef}
          className="mt-16 min-h-[200px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={hoveredColor && !firstReveal ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className={`transition-all duration-500 ease-in-out ${hoveredColor ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            key={hoveredColor}
            initial={firstReveal ? false : { opacity: 0, y: 30 }}
            animate={firstReveal ? { opacity: 1, y: 0, scale: 1 } : hoveredColor ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {hoveredColor && (
              <div className="text-center space-y-6 max-w-2xl mx-auto">
                <motion.div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full shadow-xl mb-6`}
                  key={hoveredColor}
                  initial={lastColor === null ? { scale: 0.9, opacity: 0 } : false}
                  animate={{
                    backgroundColor: `hsl(var(--${hoveredColor}))`,
                    scale: lastColor && lastColor !== hoveredColor ? [1, 1.08, 1] : 1,
                    opacity: 1
                  }}
                  transition={{ duration: lastColor && lastColor !== hoveredColor ? 0.4 : 0.6, ease: "easeOut" }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/30" />
                </motion.div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {colorMeanings[hoveredColor as keyof typeof colorMeanings]}
                </h3>
                <p className="font-serif text-lg md:text-xl text-gray-600 leading-relaxed">
                  {colorDescriptions[hoveredColor as keyof typeof colorDescriptions]}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}