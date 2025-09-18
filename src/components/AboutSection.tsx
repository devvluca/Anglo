import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about-section" className="py-20 relative overflow-hidden bg-white">
      {/* Padronagem de fundo bem suave */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'url(/padronagem_aboutus.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        opacity: 0.10
      }} />
      {/* Efeito gradiente branco extra na base, igual ao MissionSection */}
      <div className="absolute left-0 right-0 bottom-0 h-[20vh] bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>

      <div className="container mx-auto px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Logo normal com animação de hover */}
          <motion.div 
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src="/logo_principal.png"
              alt="Logo Editora Anglo"
              className="w-64 md:w-80 lg:w-96 h-auto"
              whileHover={{ scale: 1.04, y: -6 }}
              transition={{ type: 'spring', stiffness: 40, damping: 40, duration: 2.2 }}
              style={{ opacity: 1, filter: 'none' }}
            />
          </motion.div>

          {/* Conteúdo do texto */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Título */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary font-bold">
                Sobre Nós
              </h2>
              <motion.div
                className="w-40 h-1 bg-beige rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Texto principal */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg md:text-xl">
                A <span className="font-semibold text-primary">Editora Anglo</span> nasceu com a missão de promover literatura 
                espiritual e formação cristã de qualidade, sendo um farol de conhecimento e fé para leitores em busca 
                de crescimento pessoal e espiritual.
              </p>
              
              <p className="text-base md:text-lg">
                Nossa tradição em publicações cristãs reflete nosso compromisso com a excelência editorial e a 
                profundidade dos conteúdos que oferecemos. Cada obra é cuidadosamente selecionada para inspirar, 
                edificar e transformar vidas através da palavra escrita.
              </p>
            </div>
            {/* Call to action sutil */}
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                className="group inline-flex items-center gap-2 text-primary hover:text-beige transition-colors duration-300 relative"
                onClick={() => {
                  const el = document.getElementById('origin-section');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY;
                    // Scroll mais rápido
                    const startY = window.scrollY;
                    const distance = y - startY;
                    let start;
                    function step(timestamp) {
                      if (!start) start = timestamp;
                      const progress = Math.min((timestamp - start) / 900, 1); // 0.9s
                      window.scrollTo(0, startY + distance * progress);
                      if (progress < 1) {
                        window.requestAnimationFrame(step);
                      }
                    }
                    window.requestAnimationFrame(step);
                  }
                }}
              >
                <span className="text-lg font-medium">Descubra nossa origem</span>
                <span className="relative flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary group-hover:text-beige group-hover:animate-bounce-down"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <style>{`
                  @keyframes bounce-down {
                    0% { transform: translateY(0); }
                    30% { transform: translateY(0); }
                    40% { transform: translateY(18px); }
                    55% { transform: translateY(-8px); }
                    70% { transform: translateY(10px); }
                    85% { transform: translateY(-4px); }
                    100% { transform: translateY(0); }
                  }
                  .animate-bounce-down {
                    animation: bounce-down 1.6s cubic-bezier(.4,0,.2,1) infinite;
                  }
                `}</style>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}