import { useState, useRef, useEffect } from "react";
import { Truck, CreditCard, Shield, Clock } from "phosphor-react";

const InfoBanner = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const requestRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const benefits = [
    { icon: Truck, text: "Envio para todo o Brasil" },
    { icon: CreditCard, text: "Parcele em até 12x sem juros" },
    { icon: Shield, text: "Compra 100% segura" },
    { icon: Clock, text: "Entrega rápida em até 7 dias" },
    { icon: Truck, text: "Frete grátis acima de R$ 99" },
    { icon: CreditCard, text: "Aceitamos PIX, cartão e boleto" },
  ];

  // Animation loop
  useEffect(() => {
    let lastTime = performance.now();
    const speed = 60; // px per second
    const animate = (time) => {
      if (!isPaused) {
        const dt = (time - lastTime) / 1000;
        lastTime = time;
        setOffset((prev) => {
          const container = containerRef.current;
          const contentWidth = container && container.scrollWidth ? container.scrollWidth / 2 : 0;
          let next = prev + speed * dt;
          if (contentWidth && next > contentWidth) {
            next -= contentWidth;
          }
          return next;
        });
      } else {
        lastTime = time;
      }
  requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused]);

  return (
    <div 
      className="bg-purple text-white py-3 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={containerRef}
        style={{ transform: `translateX(-${offset}px)`, transition: isPaused ? 'none' : 'transform 0.03s linear' }}
        className="flex whitespace-nowrap"
      >
        {/* Duplicate the content to create seamless loop */}
        {[...benefits, ...benefits].map((benefit, index) => (
          <div key={index} className="flex items-center mx-8 flex-shrink-0">
            <benefit.icon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { InfoBanner };