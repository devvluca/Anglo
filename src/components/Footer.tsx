import { Envelope, Phone, MapPin } from "phosphor-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";


export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Função para scroll suave ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (sectionId: string) => {
    const scrollToSection = () => {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId === 'newsletter-section') {
        const el = document.getElementById(sectionId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 40;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      } else if (sectionId === 'about-section') {
        const el = document.querySelector("section[id='about-section'], section#about, #about, .about-section, [data-section='about']");
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 40;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };
    
    // Se estamos em página diferente da home, navegar para home primeiro
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection();
      }, 150);
    } else {
      scrollToSection();
    }
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
          <motion.div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.img
              src="/logo_com_nome_bege.png"
              alt="Editora Anglo"
              className="w-32 md:w-40 h-auto cursor-pointer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 120, damping: 22 }}
              onClick={scrollToTop}
            />
            <p
              className="text-white text-xs md:text-sm leading-relaxed cursor-pointer"
            >
              Editora Anglo - Tradição em literatura espiritual e formação cristã.
            </p>
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
                    handleNavigation('top');
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
                    handleNavigation('about-section');
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
                    handleNavigation('newsletter-section');
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
                >faleconosco@editoraanglo.com</motion.a>
              </motion.div>
              {/* Instagram */}
              <motion.div className="flex items-center gap-3 justify-center md:justify-start group" initial="rest" whileHover="hover" animate="rest">
                <motion.span variants={hoverVariant} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
                  {/* Ícone Instagram SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-beige"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" fill="currentColor"/></svg>
                </motion.span>
                <motion.a
                  href="https://instagram.com/editoraanglo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white cursor-pointer text-base md:text-sm"
                  variants={hoverVariant}
                  whileHover={{ color: '#F5F5F5', scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >@editoraanglo</motion.a>
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