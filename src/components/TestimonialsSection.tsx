import { useEffect, useState, useRef } from "react";
import { Star } from "phosphor-react";

const testimonials = [
  {
    name: "Helena Franco",
    content: "Desde 2020 utilizo os planners, e depois comecei a ser abençoada pelos livros, book planner, journal... todas as ferramentas criadas por vocês me aproximam de Jesus, e fazem eu ter uma visão mais clara da vida que Ele me deu para administrar, me deixando mais consciente sobre para onde Ele está me levando e de seu Propósito para a minha vida. Obrigada!",
    color: "purple"
  },
  {
    name: "Cil Farney",
    content: "As publicações da Editora Anglo têm sido fundamentais para minha formação continuada. A qualidade teológica é excepcional e a abordagem convergente enriquece minha perspectiva pastoral.",
    color: "beige"
  },
  {
    name: "Adriane Stephany",
    content: "Recomendo os livros da Anglo para todos os meus alunos. A editora consegue unir profundidade acadêmica com acessibilidade, tornando temas complexos compreensíveis.",
    color: "rose"
  },
  {
    name: "Júlia Sultanum",
    content: "A visão convergente da Anglo é exatamente o que nossa igreja precisava. Os livros nos ajudam a valorizar nossa tradição enquanto dialogamos com outras denominações cristãs.",
    color: "blue"
  },
  {
    name: "Irmã Lídia",
    content: "Os livros de espiritualidade da Anglo transformaram minha vida de oração. A combinação de tradição e contemporaneidade é perfeita para os desafios atuais.",
    color: "green"
  }
];

const colorClasses = {
  purple: "text-purple",
  beige: "text-beige", 
  rose: "text-rose",
  blue: "text-blue",
  green: "text-green"
};

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ isDown: false, startX: 0, delta: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDraggingRef.current) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 6000); // Muda a cada 6 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      try {
        (e.currentTarget as Element).setPointerCapture((e as any).pointerId);
      } catch {}
      pointerRef.current.isDown = true;
      pointerRef.current.startX = e.clientX;
      pointerRef.current.delta = 0;
      isDraggingRef.current = true;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerRef.current.isDown) return;
      e.preventDefault();
      const dxRaw = e.clientX - pointerRef.current.startX;
      // clamp so user can't drag content completely off-screen
      const max = window.innerWidth * 0.6;
      const dx = Math.max(Math.min(dxRaw, max), -max);
      pointerRef.current.delta = dx;
      // apply transform for visual feedback
      el.style.transform = `translateX(${dx}px)`;
    };

    const onPointerUp = (e?: PointerEvent) => {
      if (!pointerRef.current.isDown) return;
      pointerRef.current.isDown = false;
      try {
        (e?.currentTarget as Element)?.releasePointerCapture?.((e as any)?.pointerId);
      } catch {}
      const dx = pointerRef.current.delta;
      el.style.transform = '';
      // swipe threshold
      const threshold = 80;
      if (dx > threshold) {
        // swipe right -> previous
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      } else if (dx < -threshold) {
        // swipe left -> next
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
      pointerRef.current.delta = 0;
      // short delay before allowing autoplay again
      setTimeout(() => { isDraggingRef.current = false; }, 300);
    };

  el.addEventListener('pointerdown', onPointerDown as any, { passive: false });
  window.addEventListener('pointermove', onPointerMove as any, { passive: false });
  window.addEventListener('pointerup', onPointerUp as any);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown as any);
      window.removeEventListener('pointermove', onPointerMove as any);
      window.removeEventListener('pointerup', onPointerUp as any);
    };
  }, [carouselRef.current]);

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Título da seção */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Vozes que Transformam
          </h2>
        </div>

        {/* Testemunho atual */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Estrelas com cor do testemunho atual */}
          <div className="flex items-center justify-center gap-1 mb-12">
            {[...Array(5)].map((_, index) => (
              <Star 
                key={index}
                weight="fill"
                className={`w-4 h-4 transition-all duration-500 ${
                  colorClasses[current.color as keyof typeof colorClasses]
                }`}
              />
            ))}
          </div>

          {/* Conteúdo do testemunho */}
          <div
            ref={carouselRef}
            className="transition-transform duration-300 ease-in-out cursor-grab active:cursor-grabbing"
          >
            <p className="font-serif text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              {current.content}
            </p>
            
            <p className="font-serif text-lg text-gray-600">
              - {current.name}.
            </p>
          </div>

          {/* Indicadores de progresso */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? `${colorClasses[testimonial.color as keyof typeof colorClasses].replace('text-', 'bg-')} scale-125` 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}