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
  className="min-h-[100vh] relative overflow-hidden bg-center bg-cover flex items-start justify-center pt-20 pb-2"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6 mt-20 mb-4 relative">
            
            {/* First Column - O que cremos? */}
            <motion.div
              className="relative px-6 lg:px-12 xl:px-20 2xl:px-32 max-w-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-10 h-10 bg-purple text-white rounded-full text-lg font-bold mb-4 shadow-lg font-display"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                1
              </motion.div>
              <motion.h1
                className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide text-purple mb-2 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                O que cremos?
              </motion.h1>
              <motion.div
                className="h-0.5 w-full bg-purple/60 mb-4 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ display: 'block' }}
              />
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


            {/* Second Column - O que queremos? */}
            <motion.div
              className="relative px-6 lg:px-12 xl:px-20 2xl:px-32 max-w-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-10 h-10 bg-purple text-white rounded-full text-lg font-bold mb-4 shadow-lg font-display"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                2
              </motion.div>
              <motion.h2
                className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide text-purple mb-2 leading-tight whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                O que queremos?
              </motion.h2>
              <motion.div
                className="h-0.5 w-full bg-purple/60 mb-4 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ display: 'block' }}
              />
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
        </div>
      </div>
    </motion.section>
  );
}