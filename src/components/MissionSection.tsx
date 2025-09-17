import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function MissionSection() {
  // Captura o scroll para animar o diagrama de Venn
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gira proporcional ao scroll, tanto para cima quanto para baixo
  // Quanto mais scroll, mais gira (ex: 0.1 grau por pixel)
  const rotation = (scrollY - 200) * 0.2; // 200 é o ponto "neutro" (ajuste para centralizar, agora mais rápido)

  return (
    <motion.section
      id="mission-section"
      className="min-h-[100vh] relative overflow-hidden bg-center bg-cover flex items-start justify-center pt-20"
      style={{ backgroundImage: `url(/nossa-missao.jpg)` }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Overlay branco semi-transparente */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/90"></div>
      {/* Overlay branco extra na base */}
      <div className="absolute left-0 right-0 bottom-0 h-[20vh] bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-8xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-purple mt-20 mb-12 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            O que cremos?
          </motion.h1>
          <motion.div 
            className="space-y-6 text-base md:text-lg text-purple max-w-3xl mx-auto font-normal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div
              className="text-center mx-auto px-8 md:px-20 lg:px-32"
              style={{ fontFamily: 'Cormorant Infant, serif', lineHeight: '1.7' }}
            >
              Acreditamos que a fé cristã floresce quando caminha em unidade. Buscamos uma espiritualidade bíblica que honra o passado, proclama o evangelho com clareza e permanece sensível à ação do Espírito hoje. Nossa missão é celebrar a riqueza das tradições cristãs, encontrando na unidade do Espírito a base para uma fé profunda e transformadora.
            </div>
          </motion.div>
          <motion.h2
            className="font-display text-3xl md:text-4xl font-semibold tracking-wide text-purple mt-20 mb-8 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            O que queremos?
          </motion.h2>
          <motion.div 
            className="space-y-6 text-base md:text-lg text-purple max-w-3xl mx-auto font-normal mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div
              className="text-center mx-auto px-8 md:px-20 lg:px-32"
              style={{ fontFamily: 'Cormorant Infant, serif', lineHeight: '1.7' }}
            >
              Ser uma voz de convergência no cenário cristão brasileiro, promovendo formação teológica e espiritualidade sólida através da publicação de conteúdos que unem tradição, Palavra e presença. Queremos inspirar uma caminhada cristã que valorize tanto o legado quanto a renovação, nutrindo a alma e fortalecendo a fé.
            </div>
          </motion.div>
          {/* Venn Diagram */}
          <motion.div 
            className="mt-20 mb-24 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ rotate: rotation }}
            whileHover={{ rotate: rotation + 30, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ display: 'inline-block' }}
          >
            <svg
              width="150"
              height="120"
              viewBox="0 0 150 120"
              className="text-purple"
            >
              {/* Three interlocking circles */}
              <circle
                cx="75"
                cy="40"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="55"
                cy="75"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="95"
                cy="75"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}