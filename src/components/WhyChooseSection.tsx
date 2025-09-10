import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Truck, BookOpen, Heart } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Qualidade Teológica",
    description: "Todos os nossos livros passam por rigorosa revisão teológica por especialistas renomados",
    color: "purple"
  },
  {
    icon: Award,
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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Por que escolher a{" "}
            <span className="text-purple">Anglo?</span>
          </h2>
          <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
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
                className="group hover:shadow-elegant transition-spiritual border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple/10 to-rose/10 rounded-2xl group-hover:scale-110 transition-spiritual">
                      <Icon className={`w-8 h-8 ${colorClass}`} />
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
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