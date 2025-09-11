import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, X, Heart, Users, Lightbulb, Buildings } from "phosphor-react";

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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-8 animate-fade-in">
            Explore Nossas{" "}
            <span className="text-purple hover:text-rose transition-colors duration-500">Categorias</span>
          </h2>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium opacity-0 animate-slide-up-delayed-1">
            Descubra conteúdos organizados para nutrir cada aspecto de sua jornada espiritual
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            const Icon = category.icon;
            
            return (
              <div
                key={index} 
                className={`group cursor-pointer rounded-2xl overflow-hidden ${colors.bg} hover:scale-105 hover:-rotate-1 hover:z-10 transition-all duration-300 opacity-0 animate-card-fade-in shadow-xl hover:shadow-2xl hover:${colors.glow} relative will-change-transform`}
                style={{ 
                  animationDelay: `${(index + 2) * 0.1}s`
                }}
              >
                {/* Simplified overlay */}
                <div className={`absolute inset-0 ${colors.overlay} group-hover:opacity-30 transition-opacity duration-300`} />
                
                {/* Reduced floating particles */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/25 rounded-full animate-ping"></div>
                </div>
                
                <div className="relative p-6 h-[26rem] flex flex-col group-hover:scale-[1.02] transition-transform duration-300">
                  {/* Simplified background icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Simplified header icon */}
                  <div className="mb-6 relative z-10">
                    <div className={`${colors.accent} p-3 rounded-xl backdrop-blur-sm inline-flex group-hover:scale-110 transition-all duration-300`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                  </div>
                  
                  {/* Simplified content */}
                  <div className="flex-1 flex flex-col justify-between relative z-10">
                    <div className="space-y-4">
                      <h3 className={`font-display text-2xl font-bold ${colors.text} leading-tight group-hover:scale-105 transition-transform duration-300`}>
                        {category.title}
                      </h3>
                      
                      <p className={`${colors.text} opacity-85 leading-relaxed text-sm font-medium group-hover:opacity-100 transition-opacity duration-300`}>
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Simplified bottom section */}
                    <div className="mt-6 space-y-4">
                      {/* Book count */}
                      <div className={`${colors.accent} backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center group-hover:scale-105 transition-transform duration-300`}>
                        <span className={`text-sm font-bold ${colors.text}`}>
                          {category.count} livros
                        </span>
                      </div>
                      
                      {/* Simplified CTA */}
                      <div className={`inline-flex items-center gap-2 ${colors.accent} backdrop-blur-sm px-5 py-3 rounded-xl group-hover:scale-[1.02] transition-all duration-300 w-full justify-center cursor-pointer`}>
                        <span className={`font-serif font-semibold text-sm ${colors.text}`}>
                          Explorar
                        </span>
                        <ArrowRight className={`w-4 h-4 ${colors.text} group-hover:translate-x-1 transition-transform duration-300`} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Simplified border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/15 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}