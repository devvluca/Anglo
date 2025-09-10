import { Card, CardContent } from "@/components/ui/card";
import { Shield, Trophy, Users, Truck, BookOpen, Heart } from "phosphor-react";

const benefits = [
  {
    icon: Shield,
    title: "Qualidade Teológica",
    description: "Todos os nossos livros passam por rigorosa revisão teológica por especialistas renomados",
    color: "purple"
  },
  {
    icon: Trophy,
    title: "Autores Reconhecidos", 
    description: "Trabalhamos com os melhores teólogos e escritores cristãos do Brasil e exterior",
    color: "rose"
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Faça parte de uma comunidade engajada de leitores e participe de discussões exclusivas",
    color: "blue"
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Receba seus livros em casa com segurança e agilidade em todo território nacional",
    color: "green"
  },
  {
    icon: BookOpen,
    title: "Diversidade de Temas",
    description: "Amplo catálogo cobrindo todas as áreas da teologia e espiritualidade cristã",
    color: "purple"
  },
  {
    icon: Heart,
    title: "Compromisso Social", 
    description: "Parte dos nossos lucros é destinada a projetos sociais e missionários",
    color: "rose"
  }
];

const colorClasses = {
  purple: "text-purple",
  rose: "text-rose",
  blue: "text-blue", 
  green: "text-green"
};

export function WhyChooseSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-8 animate-fade-in">
            Por que escolher a{" "}
            <span className="text-purple hover:text-rose transition-colors duration-500">Anglo?</span>
          </h2>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium opacity-0 animate-slide-up-delayed-1">
            Descubra os diferenciais que fazem da Editora Anglo a escolha ideal para sua jornada espiritual
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colorClass = colorClasses[benefit.color as keyof typeof colorClasses];
            
            return (
              <Card 
                key={index}
                className={`group hover:shadow-elegant transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm hover:scale-105 cursor-pointer opacity-0 animate-card-fade-in`}
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple/10 to-rose/10 rounded-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg">
                      <Icon className={`w-10 h-10 ${colorClass} group-hover:scale-110 transition-all duration-300`} />
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-4 group-hover:text-purple transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium group-hover:text-foreground transition-colors duration-300">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}