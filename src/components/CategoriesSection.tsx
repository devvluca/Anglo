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
    color: "rose",
    count: 89
  },
  {
    icon: BookOpen,
    title: "Estudos Bíblicos",
    description: "Comentários, análises e guias para uma compreensão mais profunda das Escrituras",
    color: "blue",
    count: 156
  },
  {
    icon: Users,
    title: "Vida Cristã",
    description: "Orientações práticas para viver os valores cristãos no cotidiano moderno",
    color: "green",
    count: 94
  },
  {
    icon: Buildings,
    title: "Oração & Liturgia",
    description: "Recursos para enriquecer sua vida de oração e participação litúrgica",
    color: "purple",
    count: 73
  },
  {
    icon: Lightbulb,
    title: "Formação",
    description: "Cursos e materiais educativos para líderes e educadores cristãos",
    color: "rose",
    count: 45
  }
];

const colorClasses = {
  purple: {
    bg: "bg-purple/10",
    text: "text-purple",
    border: "border-purple/20",
    hover: "hover:bg-purple/20"
  },
  rose: {
    bg: "bg-rose/10",
    text: "text-rose", 
    border: "border-rose/20",
    hover: "hover:bg-rose/20"
  },
  blue: {
    bg: "bg-blue/10",
    text: "text-blue",
    border: "border-blue/20", 
    hover: "hover:bg-blue/20"
  },
  green: {
    bg: "bg-green/10",
    text: "text-green",
    border: "border-green/20",
    hover: "hover:bg-green/20"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            const Icon = category.icon;
            
            return (
              <Card 
                key={index} 
                className={`group cursor-pointer hover:shadow-elegant transition-all duration-500 border-2 ${colors.border} ${colors.hover} hover:scale-105 hover:-translate-y-2 opacity-0 animate-card-fade-in`}
                style={{ animationDelay: `${(index + 2) * 0.15}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`${colors.bg} p-4 rounded-xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg`}>
                      <Icon className={`w-8 h-8 ${colors.text} group-hover:scale-110 transition-all duration-300`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-2xl font-bold text-foreground group-hover:${colors.text} transition-colors duration-300">
                          {category.title}
                        </h3>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${colors.bg} ${colors.text} group-hover:scale-110 transition-all duration-300 group-hover:shadow-md`}>
                          {category.count}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg font-medium group-hover:text-foreground transition-colors duration-300">
                    {category.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className={`group/btn w-full justify-between ${colors.text} ${colors.hover} font-serif text-lg font-semibold hover:scale-105 transition-all duration-300`}
                  >
                    <span>Explorar Categoria</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}