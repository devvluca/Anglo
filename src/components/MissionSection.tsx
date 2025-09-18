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
  {/* Overlay branco extra no topo (invertido) */}
  <div className="absolute left-0 right-0 top-0 h-[20vh] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
  {/* Overlay branco extra na base */}
  <div className="absolute left-0 right-0 bottom-0 h-[20vh] bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="w-full md:max-w-8xl mx-auto">
          {/* Two-column layout for desktop, stacked for mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-40 mt-20 mb-16 relative">
            
            {/* First Column - O que cremos? */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Reading indicator - number 1 */}
              <motion.div 
                className="inline-flex items-center justify-center w-10 h-10 bg-purple text-white rounded-full text-lg font-bold mb-6 shadow-lg font-display"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                1
              </motion.div>
              
              <motion.h1
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-purple mb-8 leading-tight drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                O que cremos?
              </motion.h1>
              
              <motion.div 
                className="text-base md:text-lg text-purple font-normal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div
                  className="text-left"
                  style={{ fontFamily: 'Cormorant Infant, serif', lineHeight: '1.7' }}
                >
                  Acreditamos que a fé cristã floresce quando caminha em unidade. Buscamos uma espiritualidade bíblica que honra o passado, proclama o evangelho com clareza e permanece sensível à ação do Espírito hoje. Nossa missão é celebrar a riqueza das tradições cristãs, encontrando na unidade do Espírito a base para uma fé profunda e transformadora.
                </div>
              </motion.div>
            </motion.div>

            {/* Linha horizontal no desktop, vertical no mobile */}
            <motion.div
              className="hidden lg:block absolute left-[46.5%] top-[68%] -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.0, ease: 'easeOut' }}
              style={{ transformOrigin: 'center left' }}
              viewport={{ once: true }}
            >
              <div className="h-0.5 w-24 bg-purple/40 mx-auto" />
            </motion.div>
            {/* Linha vertical para mobile */}
            <motion.div
              className="lg:hidden w-full flex justify-center"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.8, ease: 'easeOut' }}
              style={{ transformOrigin: 'top center' }}
              viewport={{ once: true }}
            >
              <div className="w-0.5 h-16 bg-purple/40 my-8" />
            </motion.div>

            {/* Second Column - O que queremos? */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Reading indicator - number 2 */}
              <motion.div 
                className="inline-flex items-center justify-center w-10 h-10 bg-purple text-white rounded-full text-lg font-bold mb-6 shadow-lg font-display"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                2
              </motion.div>
              
              <motion.h2
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-purple mb-8 leading-tight drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                O que queremos?
              </motion.h2>
              
              <motion.div 
                className="text-base md:text-lg text-purple font-normal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div
                  className="text-left"
                  style={{ fontFamily: 'Cormorant Infant, serif', lineHeight: '1.7' }}
                >
                  Ser uma voz de convergência no cenário cristão brasileiro, promovendo formação teológica e espiritualidade sólida através da publicação de conteúdos que unem tradição, Palavra e presença. Queremos inspirar uma caminhada cristã que valorize tanto o legado quanto a renovação, nutrindo a alma e fortalecendo a fé.
                </div>
              </motion.div>
            </motion.div>
          </div>
          {/* Venn Diagram - Centralizado e mais abaixo */}
          <motion.div 
            className="flex justify-center items-center w-full mt-40 mb-24"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ rotate: rotation }}
            whileHover={{ rotate: rotation + 30, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <svg
              width="150"
              height="120"
              viewBox="0 0 150 120"
              className="text-purple drop-shadow-lg"
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