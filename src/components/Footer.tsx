import { Envelope, Phone, MapPin } from "phosphor-react";
import { motion } from "framer-motion";


export function Footer() {
  // Função para scroll suave ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Variants para animação de hover em grupo
  const hoverVariant = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.08, y: -4, color: "#F5F5F5" },
  };

  return (
    <footer
      className="bg-primary text-primary-foreground relative"
      style={{
        backgroundImage: 'url(/padronagem_footer.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay para deixar a padronagem bem de leve */}
      <div className="absolute inset-0 bg-primary/95 pointer-events-none" style={{mixBlendMode: 'multiply', opacity: 0.7}} />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
          {/* Coluna 1: Logo e descrição */}
          <motion.div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left" initial="rest" whileHover="hover" animate="rest">
            <motion.img
              src="/logo_com_nome_bege.png"
              alt="Editora Anglo"
              className="w-32 md:w-40 h-auto cursor-pointer"
              variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.015, y: -4 } }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 120, damping: 22 }}
              onClick={scrollToTop}
            />
            <motion.p
              className="text-white text-xs md:text-sm leading-relaxed cursor-pointer"
              variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.01, y: -2, color: '#F5F5F5' } }}
              whileHover={{ color: '#F5F5F5', scale: 1.01, y: -2 }}
              transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            >
              Editora Anglo - Tradição em literatura espiritual e formação cristã.
            </motion.p>
          </motion.div>

          {/* Coluna 2: Links rápidos */}
          <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-beige font-serif text-base md:text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 md:space-y-3">
              <motion.li
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <motion.a
                  href="#"
                  className="text-white transition-colors text-xs md:text-sm cursor-pointer px-2 py-1 rounded"
                  style={{ color: 'inherit' }}
                  whileHover={{ color: 'var(--beige, #e7cfa7)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  onClick={e => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >Início</motion.a>
              </motion.li>
              <motion.li
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <motion.a
                  href="#"
                  className="text-white transition-colors text-xs md:text-sm cursor-pointer px-2 py-1 rounded"
                  style={{ color: 'inherit' }}
                  whileHover={{ color: 'var(--beige, #e7cfa7)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  onClick={e => {
                    e.preventDefault();
                    const el = document.getElementById("unified-about-section");
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 40;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >Sobre Nós</motion.a>
              </motion.li>
              <motion.li
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <motion.a
                  href="#"
                  className="text-white transition-colors text-xs md:text-sm cursor-pointer px-2 py-1 rounded"
                  style={{ color: 'inherit' }}
                  whileHover={{ color: 'var(--beige, #e7cfa7)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  onClick={e => {
                    e.preventDefault();
                    const el = document.getElementById("newsletter-section");
                    if (el) {
                      // Subir menos para mobile, pois já está colado no topo
                      const offset = window.innerWidth < 768 ? 120 : 40;
                      const y = el.getBoundingClientRect().top + window.scrollY - offset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >Contato</motion.a>
              </motion.li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-beige font-serif text-base md:text-lg font-semibold">Contato</h3>
            {/* Separador para mobile */}
            <div className="block md:hidden w-12 mx-auto my-2 border-t border-beige/40" />
            <div className="space-y-4 md:space-y-3 text-base md:text-sm w-full flex flex-col items-center md:items-start">
              <motion.div className="flex items-center gap-3 justify-center md:justify-start group" initial="rest" whileHover="hover" animate="rest">
                <motion.span variants={hoverVariant} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
                  <Envelope className="w-5 h-5 text-beige" />
                </motion.span>
                <motion.a
                  href="mailto:editoraanglo@gmail.com"
                  className="text-white cursor-pointer text-base md:text-sm"
                  variants={hoverVariant}
                  whileHover={{ color: '#F5F5F5', scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >editoraanglo@gmail.com</motion.a>
              </motion.div>
              <motion.div className="flex items-center gap-3 justify-center md:justify-start group" initial="rest" whileHover="hover" animate="rest">
                <motion.span variants={hoverVariant} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
                  <Phone className="w-5 h-5 text-beige" />
                </motion.span>
                <motion.a
                  href="https://wa.me/558199733520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white cursor-pointer text-base md:text-sm"
                  variants={hoverVariant}
                  whileHover={{ color: '#F5F5F5', scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >(81) 9973-3520</motion.a>
              </motion.div>
              <motion.div className="flex items-center gap-3 justify-center md:justify-start group" initial="rest" whileHover="hover" animate="rest">
                <motion.span variants={hoverVariant} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
                  <MapPin className="w-5 h-5 text-beige" />
                </motion.span>
                <motion.p
                  className="text-white cursor-pointer text-base md:text-sm"
                  variants={hoverVariant}
                  whileHover={{ color: '#F5F5F5', scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >Recife, PE - Brasil</motion.p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Separador e copyright */}
        <div className="border-t border-primary-foreground/20 pt-6 md:pt-8">
          <motion.p
            className="text-center text-white text-xs md:text-sm cursor-pointer"
            whileHover={{ color: '#F5F5F5', scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            © 2025 Editora Anglo. Todos os direitos reservados.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}