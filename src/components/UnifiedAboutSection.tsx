import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Users, BookOpen, IconProps } from "phosphor-react";

interface TabData {
  id: string;
  icon: React.ComponentType<IconProps>;
  label: string;
}

const tabs: TabData[] = [
  {
    id: "about",
    icon: Users,
    label: "Sobre Nós"
  },
  {
    id: "origin",
    icon: BookOpen,
    label: "Nossa Origem"
  },
  {
    id: "symbol",
    icon: (props: IconProps) => (
      <img
        src="/logo_principal.png"
        alt="Logo Anglo"
        style={{
          width: props.size ?? 32,
          height: props.size ?? 32,
          objectFit: 'contain',
          filter: props.className?.includes('text-primary')
            ? 'none'
            : 'grayscale(100%) opacity(0.5)',
          transition: 'filter 0.3s',
        }}
      />
    ),
    label: "Nosso Símbolo"
  }
];

export function UnifiedAboutSection() {
  const [activeTab, setActiveTab] = useState("about");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  const AUTO_ROTATE_INTERVAL = 6000; // 6 segundos
  const USER_PAUSE_DURATION = 10000; // 10 segundos após interação

  // Auto-rotate logic
  useEffect(() => {
    if (isPaused || userInteracted) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed % AUTO_ROTATE_INTERVAL) / AUTO_ROTATE_INTERVAL, 1);
      setProgress(newProgress);

      if (elapsed >= AUTO_ROTATE_INTERVAL && elapsed % AUTO_ROTATE_INTERVAL < 100) {
        setActiveTab(prev => {
          if (prev === "about") return "origin";
          if (prev === "origin") return "symbol";
          return "about";
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeTab, isPaused, userInteracted]);

  // Handle user interaction pause
  useEffect(() => {
    if (!userInteracted) return;

    // Após interação, nunca mais mostra barra de progresso
    setIsPaused(true);
    setProgress(0);
    // Se quiser reabilitar auto-rotate após X segundos, descomente abaixo:
    // const timeout = setTimeout(() => {
    //   setUserInteracted(false);
    //   setIsPaused(false);
    // }, USER_PAUSE_DURATION);
    // return () => clearTimeout(timeout);
  }, [userInteracted]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setUserInteracted(true);
    setIsPaused(true);
    setProgress(0);
  };


  // Remove mouse enter/leave logic for progress bar
  // Progress bar should always show when auto-rotate is active
  // Section events no longer affect isPaused

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tabId);
    }
  };

  // Ref para medir altura do conteúdo
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [activeTab]);

  return (
    <section 
      id="unified-about-section" 
      className="pt-20 pb-2 relative overflow-hidden bg-white"
    >
      {/* Background pattern for all tabs */}
      <AnimatePresence>
        {(
          activeTab === "about" ||
          activeTab === "origin" ||
          activeTab === "symbol"
        ) && (
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: 'url(/padronagem_aboutus.png)',
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto',
            }}
          />
        )}
      </AnimatePresence>

      {/* Gradient overlay for all tabs */}
      <AnimatePresence>
        {(
          activeTab === "about" ||
          activeTab === "origin" ||
          activeTab === "symbol"
        ) && (
          <motion.div 
            className="absolute left-0 right-0 bottom-0 h-[20vh] bg-gradient-to-t from-white to-transparent pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Logo Section - menor e mais à direita */}
          <motion.div 
            className="flex justify-center lg:justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "about" && (
                <motion.img
                  key="logo-about"
                  src="/logo_principal.png"
                  alt="Logo Editora Anglo"
                  className="w-40 md:w-56 lg:w-64 h-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.04, y: -6 }}
                  style={{ filter: 'none' }}
                />
              )}
              {activeTab === "origin" && (
                <motion.img
                  key="logo-origin"
                  src="/logo_principal.png"
                  alt="Logo Editora Anglo"
                  className="w-40 md:w-56 lg:w-64 h-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.04, y: -6 }}
                  style={{ filter: 'none' }}
                />
              )}
              {activeTab === "symbol" && (
                <motion.img
                  key="logo-symbol"
                  src="/logo_principal.png"
                  alt="Logo Editora Anglo"
                  className="w-40 md:w-56 lg:w-64 h-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.04, y: -6 }}
                  style={{ filter: 'none' }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Content Section - altura fixa responsiva */}
          <motion.div
            className="space-y-8 overflow-y-hidden md:overflow-y-auto overflow-x-hidden"
            style={{
              minHeight: '480px',
              height: '480px',
              maxHeight: '100%'
            }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "about" ? (
                <motion.div
                  key="about-content"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* About Title */}
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary font-bold">
                      Sobre Nós
                    </h2>
                    <motion.div
                      className="w-40 h-1 bg-beige rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2.2, ease: 'easeOut' }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>

                  {/* About Text */}
                  <div className="space-y-6 text-gray-700 leading-relaxed break-words">
                    <p className="text-lg md:text-xl break-words">
                      A <span className="font-semibold text-primary">Editora Anglo</span> nasceu com a missão de promover literatura<br />
                      espiritual e formação cristã de qualidade, sendo um farol de conhecimento e fé para leitores em busca<br />
                      de crescimento pessoal e espiritual.
                    </p>
                  
                    <p className="text-base md:text-lg break-words">
                      Nossa tradição em publicações cristãs reflete nosso compromisso com a excelência editorial<br />
                      e a profundidade dos conteúdos que oferecemos.<br />
                      Cada obra é cuidadosamente selecionada para inspirar, edificar e transformar vidas através da palavra escrita.
                    </p>
                  </div>
                </motion.div>
              ) : activeTab === "origin" ? (
                <motion.div
                  key="origin-content"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Origin Title */}
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary font-bold">
                      De onde vem o nome{' '}
                      <span className="text-purple font-bold">Anglo?</span>
                    </h2>
                    <motion.div
                      className="w-40 h-1 bg-purple rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2.2, ease: 'easeOut' }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>

                  {/* Origin Text */}
                  <div className="space-y-6 text-gray-700 leading-relaxed break-words">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <h3 className="text-2xl font-serif text-primary font-semibold mb-4">
                          Tradição Anglo
                        </h3>
                        <p className="text-base md:text-lg mb-4 break-words">
                          O nome <span className="font-bold text-purple">Anglo</span> representa as denominações nascidas da Igreja da Inglaterra,<br />
                          buscando equilíbrio e convergência na fé cristã.
                        </p>
                        <p className="text-base md:text-lg break-words">
                          Uma tradição que integra diferentes dimensões da espiritualidade:<br />
                          carismática, reformada e litúrgica, acolhendo vozes complementares.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="symbol-content"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Symbol Title */}
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary font-bold">
                      Nosso{' '}
                      <span className="text-beige font-bold">Símbolo</span>
                    </h2>
                    <motion.div
                      className="w-40 h-1 bg-beige rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2.2, ease: 'easeOut' }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>

                  {/* Symbol Text */}
                  <div className="space-y-6 text-gray-700 leading-relaxed break-words">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <h3 className="text-2xl font-serif text-primary font-semibold mb-4">
                          Identidade Visual
                        </h3>
                        <p className="text-base md:text-lg mb-4 break-words">
                          A identidade visual da Anglo resgata a tradição e a história da Igreja Inglesa, conectando-se à realeza inglesa e à arquitetura das igrejas antigas.
                        </p>
                        <p className="text-base md:text-lg mb-4 break-words">
                          O <span className="font-bold text-purple">vitral</span> foi escolhido como símbolo central da marca por representar a espiritualidade, a tradição e a beleza presentes nas igrejas medievais.
                        </p>
                        <p className="text-base md:text-lg break-words">
                          Para reforçar a identidade única da marca, o vitral assume a forma da letra <span className="font-bold text-purple">"A"</span>, remetendo diretamente ao nome Anglo. Essa escolha não apenas fortalece a presença da marca, mas também cria um símbolo memorável e significativo.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
  <div className="mt-2 mb-0 flex flex-col items-center space-y-8 px-4">
          {/* Tab Icons */}
          <div 
            className="flex items-center space-x-10 py-0 px-2"
            role="tablist"
            aria-label="Seções sobre a Editora Anglo"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  aria-label={tab.label}
                  tabIndex={isActive ? 0 : -1}
                  className={`
                    flex flex-col items-center space-y-2 p-3 mx-1
                    transition-all
                    bg-transparent
                    ${isActive 
                      ? 'text-primary' 
                      : 'text-gray-400'
                    }
                    hover:text-primary hover:scale-105
                  `}
                  onClick={() => handleTabClick(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, tab.id)}
                >
                  {/* Ícone sempre regular, exceto para a logo que já tem filtro customizado */}
                  <Icon weight="regular" size={32} className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400 hover:scale-110 hover:text-purple'}`} />
                  <span className="text-sm font-medium mt-1">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          {(!isPaused && !userInteracted) && (
            <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden mb-0" style={{ transform: 'translateY(-25px)' }}>
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}