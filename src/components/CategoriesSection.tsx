// removed unused UI imports
import { ArrowRight, BookOpen, X, Heart, Users, Lightbulb, Buildings } from "phosphor-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './carousel-styles.css';

const categories = [
  {
    icon: X,
    title: "Teologia",
    description: "Fundamentos doutrinários e reflexões teológicas profundas para fortalecer sua fé",
    color: "purple",
    count: 127
  },
  {
    icon: Heart,
    title: "Espiritualidade",
    description: "Práticas e ensinamentos para o crescimento espiritual e intimidade com Deus",
    color: "beige",
    count: 89
  },
  {
    icon: BookOpen,
    title: "Estudos Bíblicos",
    description: "Comentários, análises e guias para uma compreensão mais profunda das Escrituras",
    color: "rose",
    count: 156
  },
  {
    icon: Users,
    title: "Vida Cristã",
    description: "Orientações práticas para viver os valores cristãos no cotidiano moderno",
    color: "blue",
    count: 94
  },
  {
    icon: Buildings,
    title: "Oração & Liturgia",
    description: "Recursos para enriquecer sua vida de oração e participação litúrgica",
    color: "green",
    count: 73
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
    <section className="py-20 bg-muted/80 font-display">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-8 animate-fade-in">
            Explore Nossas{" "}
            <span className="text-purple hover:text-rose transition-colors duration-500">Categorias</span>
          </h2>
          <p className="font-display text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium opacity-0 animate-slide-up-delayed-1">
            Descubra conteúdos organizados para nutrir cada aspecto de sua jornada espiritual
          </p>
        </div>
        
        {/* Categories Grid - Desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            const Icon = category.icon;
            
            return (
              <div
                key={index} 
                className={`group cursor-pointer rounded-2xl ${colors.bg} hover:scale-105 hover:-rotate-1 hover:z-10 transition-all duration-300 opacity-0 animate-card-fade-in shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:${colors.glow} relative will-change-transform font-display overflow-hidden`}
                style={{ 
                  animationDelay: `${(index + 2) * 0.1}s`
                }}
              >
                <div className="relative p-6 h-[26rem] flex flex-col group-hover:scale-[1.02] transition-transform duration-300">
                  {/* Simplified header icon (no background) */}
                  <div className="mb-6 relative z-10">
                    <Icon weight="thin" className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  
                  {/* Simplified content */}
                  <div className="flex-1 flex flex-col justify-between relative z-10">
                    <div className="space-y-4">
                      <h3 className={`text-2xl font-bold ${colors.text} leading-tight group-hover:scale-105 transition-transform duration-300`}>
                        {category.title}
                      </h3>
                      
                      <p className={`${colors.text} leading-relaxed text-sm font-normal group-hover:opacity-100 transition-opacity duration-300`}>
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Simplified bottom section */}
                    <div className="mt-6 space-y-4">
                      {/* Book count */}
                      <div className={`px-4 py-2 rounded-full inline-flex items-center group-hover:scale-105 transition-transform duration-300`}>
                        <span className={`text-sm font-semibold ${colors.text}`}>
                          {category.count} livros
                        </span>
                      </div>
                      
                      {/* Simplified CTA */}
                      <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl group-hover:scale-[1.02] duration-300 w-full justify-center cursor-pointer bg-black/10 hover:bg-black/30 ${colors.text} hover:text-white hover:-translate-y-1 transition-colors duration-200`}> 
                        <span className={`font-display font-semibold text-sm text-current`}>
                          Explorar
                        </span>
                        <ArrowRight weight="thin" className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300`} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Simplified border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/10 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Categories Carousel - Mobile */}
        <div className="md:hidden bg-transparent">
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
            className="categories-swiper pb-12 px-4"
            style={{ touchAction: 'pan-y', backgroundColor: 'transparent' }}
          >
            {categories.map((category, index) => {
              const colors = colorClasses[category.color as keyof typeof colorClasses];
              const Icon = category.icon;
              
              return (
                <SwiperSlide key={index} style={{ background: 'none', backgroundColor: 'transparent', border: 'none', outline: 'none' }}>
                  <div className="w-full h-full bg-transparent p-0 m-0">
                    <div className={`group cursor-pointer rounded-2xl ${colors.bg} shadow-2xl hover:shadow-[0_18px_36px_rgba(0,0,0,0.22)] relative h-[22rem] w-full font-display overflow-hidden border-0`}>
                    <div className={`absolute inset-0 pointer-events-none ${colors.overlay} transition-opacity duration-300`} />
                    
                    <div className="relative p-4 h-full flex flex-col">
                      {/* Header icon (no background) */}
                      <div className="mb-4 relative z-10">
                        <Icon weight="thin" className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      
                      {/* Simplified content */}
                      <div className="flex-1 flex flex-col justify-between relative z-10">
                        <div className="space-y-5">
                          <h3 className={`text-2xl font-bold ${colors.text} leading-tight`}>
                            {category.title}
                          </h3>
                          
                          <p className={`${colors.text} leading-relaxed text-base font-normal`}>
                            {category.description}
                          </p>
                        </div>
                        
                        {/* Simplified bottom section */}
                        <div className="mt-6 space-y-4">
                          {/* Book count */}
                          <div className={`px-4 py-2 rounded-full inline-flex items-center`}>
                            <span className={`text-sm font-semibold ${colors.text}`}>
                              {category.count} livros
                            </span>
                          </div>
                          
                          {/* Simplified CTA */}
                          <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl w-full justify-center cursor-pointer bg-black/10 hover:bg-black/30 ${colors.text} hover:text-white hover:-translate-y-1 transition-colors duration-200`}>
                            <span className={`font-display font-semibold text-sm text-current`}>
                              Explorar
                            </span>
                            <ArrowRight weight="thin" className={`w-4 h-4`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}