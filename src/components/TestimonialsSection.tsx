import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Pe. Francisco Almeida",
    role: "Pároco da Igreja São José",
    location: "São Paulo, SP",
    content: "As publicações da Editora Anglo têm sido fundamentais para minha formação continuada. A qualidade teológica é excepcional e a abordagem convergente enriquece minha perspectiva pastoral.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Dra. Maria Fernanda",
    role: "Professora de Teologia",
    location: "Rio de Janeiro, RJ", 
    content: "Recomendo os livros da Anglo para todos os meus alunos. A editora consegue unir profundidade acadêmica com acessibilidade, tornando temas complexos compreensíveis.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Rev. Carlos Santos",
    role: "Pastor Metodista",
    location: "Belo Horizonte, MG",
    content: "A visão convergente da Anglo é exatamente o que nossa igreja precisava. Os livros nos ajudam a valorizar nossa tradição enquanto dialogamos com outras denominações cristãs.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Irmã Teresa Gonzalez",
    role: "Diretora Espiritual",
    location: "Brasília, DF",
    content: "Os livros de espiritualidade da Anglo transformaram minha vida de oração. A combinação de tradição e contemporaneidade é perfeita para os desafios atuais.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Prof. João Ribeiro",
    role: "Teólogo Leigo",
    location: "Recife, PE",
    content: "Como estudioso da teologia, posso afirmar que a Editora Anglo está entre as melhores do país. A seriedade acadêmica aliada à espiritualidade é impressionante.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Ana Clara Silva",
    role: "Líder de Grupo de Estudo",
    location: "Curitiba, PR",
    content: "Nossa comunidade foi enriquecida pelos estudos bíblicos da Anglo. A profundidade dos comentários nos ajuda a crescer na fé e no conhecimento das Escrituras.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple/5 to-rose/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Testemunhos que{" "}
            <span className="text-purple">Inspiram</span>
          </h2>
          <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja como nossas publicações têm transformado vidas e fortalecido comunidades cristãs
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant transition-spiritual bg-card/80 backdrop-blur-sm border-border/50"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-purple/60" />
                </div>
                
                {/* Content */}
                <p className="font-serif text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-serif font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}