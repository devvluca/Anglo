import { X, Users, BookOpen, Heart, Lightbulb, Flame } from "phosphor-react";
import { useEffect, useRef } from 'react';
import patternImage from "@/assets/pattern-bg.jpg";

export function MissionSection() {
  const missionRef = useRef<HTMLDivElement | null>(null);
  const vennRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = missionRef.current ? missionRef.current.querySelectorAll('.mission-zoom-target') : null;
    if (!targets) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        // apply same zoom used on hover (scale-105) when element is centered
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          el.classList.add('scale-105');
        } else {
          el.classList.remove('scale-105');
        }
      });
    }, {
      root: null,
      // rootMargin tuned so the 'center' of viewport is the activation zone
      rootMargin: '-30% 0px -30% 0px',
      threshold: [0.5]
    });

    targets.forEach(t => observer.observe(t));

    return () => {
      targets.forEach(t => observer.unobserve(t));
      observer.disconnect();
    };
  }, []);

  // Venn diagram scroll animation: staggered scale for circles when centered
  useEffect(() => {
    if (!vennRef.current) return;
    const circles = vennRef.current.querySelectorAll('.venn-circle-target');
    if (!circles || circles.length === 0) return;

    let timeouts: number[] = [];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          // staggered enter
          circles.forEach((c, i) => {
            const el = c as HTMLElement;
            const id = window.setTimeout(() => {
              el.classList.add('scale-105');
            }, i * 120);
            timeouts.push(id);
          });
        } else {
          // clear timeouts and remove classes
          timeouts.forEach(t => clearTimeout(t));
          timeouts = [];
          circles.forEach(c => (c as HTMLElement).classList.remove('scale-105'));
        }
      });
    }, {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: [0.45]
    });

    observer.observe(vennRef.current);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      observer.disconnect();
    };
  }, []);
  return (
    <section className="py-20 relative overflow-hidden bg-purple">
      {/* Background Pattern Overlay - more purple, less visible */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ 
          background: `linear-gradient(rgba(88, 51, 139, 0.8), rgba(88, 51, 139, 0.9)), url(${patternImage})`,
          backgroundBlendMode: 'multiply'
        }}
      />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-beige/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-rose/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-green/10 rounded-full animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="relative order-1 lg:order-1" ref={missionRef}>
            <div className="inline-flex items-center gap-2 bg-beige/20 text-beige px-4 lg:px-6 py-2 lg:py-3 rounded-full mb-6 lg:mb-8 hover:bg-beige/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-beige/30">
              <span className="font-bold text-sm lg:text-base">Nossa Missão</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 lg:mb-8 leading-tight animate-fade-in mission-zoom-target transform transition-transform duration-700 scale-100">
              <span className="block text-white">Uma Voz de</span>
              <span className="block text-beige transition-colors duration-500 relative leading-tight mb-1">Convergência</span>
              <span className="block text-white -mt-1">no Cenário Cristão</span>
            </h2>
            
            <div className="space-y-6 lg:space-y-10 font-serif text-lg md:text-xl lg:text-2xl leading-relaxed font-medium">
              <div className="group mission-zoom-target transition-transform duration-300 will-change-transform transform-gpu hover:scale-105">
                <p className="text-beige opacity-0 animate-slide-up-delayed-1 hover:text-white transition-all duration-300">
                  A Editora Anglo surge como uma ponte entre a rica tradição cristã e as necessidades 
                  espirituais contemporâneas, promovendo a unidade na diversidade através da publicação 
                  de conteúdos que nutrem a alma e fortalecem a fé.
                </p>
              </div>
              
              <div className="group mission-zoom-target transition-transform duration-300 will-change-transform transform-gpu hover:scale-105">
                <p className="text-beige opacity-0 animate-slide-up-delayed-2 hover:text-white transition-all duration-300">
                  Nosso compromisso é com a formação teológica sólida e a espiritualidade autêntica, 
                  oferecendo obras que dialogam com diferentes tradições cristãs enquanto permanecem 
                  fiéis à Palavra de Deus.
                </p>
              </div>
              
              <div className="group mission-zoom-target transition-transform duration-300 will-change-transform transform-gpu hover:scale-105">
                <p className="text-beige opacity-0 animate-slide-up-delayed-3 hover:text-white transition-all duration-300">
                  Acreditamos que a convergência cristã não diminui a riqueza das tradições, mas sim 
                  as celebra em sua diversidade, encontrando na unidade do Espírito a base para uma 
                  fé mais profunda e transformadora.
                </p>
              </div>
            </div>
          </div>
          
          
          {/* Right Content - Diagrama de Venn */}
          <div className="relative flex items-center justify-center h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto overflow-visible order-2 lg:order-2">
            <svg
              viewBox="0 0 700 700"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(245, 232, 199, 0.18)" />
                  <stop offset="100%" stopColor="rgba(245, 232, 199, 0.07)" />
                </radialGradient>
              </defs>
              {/* Círculo 1 - Tradição (Topo) */}
              <g className="group">
                <circle
                  cx="350"
                  cy="250"
                  r="170"
                  fill="url(#circleGradient)"
                  stroke="rgba(245, 232, 199, 0.7)"
                  strokeWidth="4"
                  className="transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
                  style={{ transformOrigin: '350px 250px' }}
                />
                <text x="350" y="190" textAnchor="middle" className="font-serif pointer-events-none" fontSize="2.1rem" fontWeight="bold" fill="#F5E8C7">Tradição</text>
                <text x="350" y="220" textAnchor="middle" className="font-serif pointer-events-none" fontSize="1.2rem" fill="#F5E8C7" opacity="0.7">Rica herança</text>
              </g>
              {/* Círculo 2 - Palavra (Inferior Esquerda) */}
              <g className="group">
                <circle
                  cx="220"
                  cy="450"
                  r="170"
                  fill="url(#circleGradient)"
                  stroke="rgba(245, 232, 199, 0.7)"
                  strokeWidth="4"
                  className="transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
                  style={{ transformOrigin: '220px 450px' }}
                />
                <text x="170" y="470" textAnchor="middle" className="font-serif pointer-events-none" fontSize="2.1rem" fontWeight="bold" fill="#F5E8C7">Palavra</text>
                <text x="170" y="500" textAnchor="middle" className="font-serif pointer-events-none" fontSize="1.2rem" fill="#F5E8C7" opacity="0.7">Fundamento</text>
              </g>
              {/* Círculo 3 - Presença (Inferior Direita) */}
              <g className="group">
                <circle
                  cx="480"
                  cy="450"
                  r="170"
                  fill="url(#circleGradient)"
                  stroke="rgba(245, 232, 199, 0.7)"
                  strokeWidth="4"
                  className="transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
                  style={{ transformOrigin: '480px 450px' }}
                />
                <text x="530" y="470" textAnchor="middle" className="font-serif pointer-events-none" fontSize="2.1rem" fontWeight="bold" fill="#F5E8C7">Presença</text>
                <text x="530" y="500" textAnchor="middle" className="font-serif pointer-events-none" fontSize="1.2rem" fill="#F5E8C7" opacity="0.7">Divina</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}