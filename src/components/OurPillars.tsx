// removed unused UI imports
import { ArrowRight, BookOpen, X, Heart, Users, Lightbulb, Buildings } from "phosphor-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './carousel-styles.css';

// SVG Venn Diagram icon - minimal 3 circles
// SVG Palette icon for estética
const PaletteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3C7 3 3 7 3 12c0 5 4 9 9 9 3.5 0 5-2 5-4.5a2.5 2.5 0 0 0-2.5-2.5H12a1 1 0 0 1-1-1V12a1 1 0 0 1 1-1h4.5A2.5 2.5 0 0 0 19 8.5C19 6 15.5 3 12 3z" />
    <circle cx="7.5" cy="10.5" r="1" />
    <circle cx="12" cy="7.5" r="1" />
    <circle cx="16.5" cy="10.5" r="1" />
  </svg>
);
const VennIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" style={{marginTop: '-6px'}} {...props}>
    <circle cx="9" cy="10" r="6" />
    <circle cx="15" cy="10" r="6" />
    <circle cx="12" cy="16" r="6" />
  </svg>
);

const categories = [
  {
    icon: VennIcon,
    title: "Convergência",
    description: "valorizamos a herança dos três rios da fé cristã: o carismático, o evangelical e o sacramental.",
    color: "purple"
  },
  {
    icon: Heart,
    title: "Fidelidade",
    description: "nosso compromisso é com a verdade bíblica, a ortodoxia histórica e a missão do reino.",
    color: "beige"
  },
  {
    icon: Users,
    title: "Unidade",
    description: "publicamos com o coração voltado à reconciliação e à edificação da igreja.",
    color: "blue"
  },
  {
    icon: PaletteIcon,
    title: "Beleza",
    description: "acreditamos que a estética comunica o sagrado e nos ajuda a perceber a glória de deus.",
    color: "rose"
  },
  {
    icon: BookOpen,
    title: "Formação",
    description: "buscamos formar leitores e líderes que compreendam e vivam uma espiritualidade bíblica, profunda e prática.",
    color: "green"
  }
];

const colorClasses = {
  purple: {
    bg: "bg-gradient-to-b from-purple/90 via-purple to-purple/95",
    text: "text-white",
    border: "border-purple/30",
    accent: "bg-white/15",
    overlay: "bg-black/20",
    glow: "shadow-purple/20"
  },
  beige: {
    bg: "bg-gradient-to-b from-beige/90 via-beige to-beige/95",
    text: "text-gray-800", 
    border: "border-beige/30",
    accent: "bg-black/15",
    overlay: "bg-black/10",
    glow: "shadow-beige/30"
  },
  rose: {
    bg: "bg-gradient-to-b from-rose/90 via-rose to-rose/95",
    text: "text-white",
    border: "border-rose/30", 
    accent: "bg-white/15",
    overlay: "bg-black/20",
    glow: "shadow-rose/20"
  },
  blue: {
    bg: "bg-gradient-to-b from-blue/90 via-blue to-blue/95",
    text: "text-white",
    border: "border-blue/30",
    accent: "bg-white/15",
    overlay: "bg-black/20",
    glow: "shadow-blue/20"
  },
  green: {
    bg: "bg-gradient-to-b from-green/90 via-green to-green/95",
    text: "text-white",
    border: "border-green/30",
    accent: "bg-white/15",
    overlay: "bg-black/20",
    glow: "shadow-green/20"
  }
};

export function CategoriesSection() {
  return (
  <section className="py-20 bg-white font-display">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="font-display text-5xl md:text-6xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Nossos <span className="text-purple hover:text-rose transition-colors duration-500">pilares</span>
          </motion.h2>
        </motion.div>
        
        {/* Categories Grid - Desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
          {categories.map((category, index) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.18, // Dominó mais suave e normal
                    ease: "easeOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0, type: "tween" }
                }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group cursor-pointer rounded-2xl ${colors.bg} hover:z-10 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:${colors.glow} relative will-change-transform font-display overflow-hidden`}
              >
                <div className="relative p-6 pb-8 h-[20rem] flex flex-col group-hover:scale-[1.02] transition-transform duration-75">
                  {/* Simplified header icon (no background) */}
                  <div className="mb-6 relative z-10">
                    <Icon weight="thin" className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  {/* Simplified content - moved up */}
                  <div className="flex-1 flex flex-col justify-start relative z-10 -mt-2">
                    <div className="space-y-4">
                      <h3 className={`text-2xl font-bold capitalize ${colors.text} leading-tight group-hover:scale-105 transition-transform duration-75`}>
                        {category.title}
                      </h3>
                      <p className={`${colors.text} leading-relaxed text-sm font-normal group-hover:opacity-100 transition-opacity duration-75`} style={{ textTransform: 'lowercase' }}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Simplified border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/10 transition-all duration-75"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Categories Carousel - Mobile */}
  <div className="w-full pb-8 md:hidden">
          <motion.div 
            className="bg-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="categories-swiper pb-12"
              style={{ touchAction: 'pan-y', backgroundColor: 'transparent' }}
            >
              {categories.map((category, index) => {
                const colors = colorClasses[category.color as keyof typeof colorClasses];
                const Icon = category.icon;
                return (
                  <SwiperSlide key={index} style={{ background: 'none', backgroundColor: 'transparent', border: 'none', outline: 'none' }}>
                    <motion.div 
                      className="w-full h-full bg-transparent p-0 m-0"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: "easeOut"
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <div className={`group cursor-pointer rounded-2xl ${colors.bg} shadow-2xl hover:shadow-[0_18px_36px_rgba(0,0,0,0.22)] relative h-[18rem] w-full font-display overflow-hidden border-0`}>
                        <div className={`absolute inset-0 pointer-events-none ${colors.overlay} transition-opacity duration-300`} />
                        <div className="relative p-4 pb-6 h-full flex flex-col">
                          {/* Header icon (no background) */}
                          <div className="mb-4 relative z-10">
                            <Icon weight="thin" className={`w-6 h-6 ${colors.text}`} />
                          </div>
                          {/* Simplified content - moved up */}
                          <div className="flex-1 flex flex-col justify-start relative z-10 -mt-1">
                            <div className="space-y-5">
                              <h3 className={`text-2xl font-bold capitalize ${colors.text} leading-tight`}>
                                {category.title}
                              </h3>
                              <p className={`${colors.text} leading-relaxed text-base font-normal`} style={{ textTransform: 'lowercase' }}>
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}