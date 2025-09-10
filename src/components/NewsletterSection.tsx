import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Envelope, PaperPlaneTilt, Gift, BookOpen, Users } from "phosphor-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá em breve nossos conteúdos exclusivos.",
      });
      setEmail("");
    }
  };

  const benefits = [
    {
      icon: BookOpen,
      title: "Conteúdo Exclusivo",
      description: "Artigos e materiais disponíveis apenas para assinantes"
    },
    {
      icon: Gift,
      title: "Ofertas Especiais", 
      description: "Descontos exclusivos e pré-vendas com preços promocionais"
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Acesso a eventos online e grupos de discussão"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple/10 to-rose/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/90 backdrop-blur-sm shadow-elegant border-2 border-purple/20">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-purple/10 text-purple px-4 py-2 rounded-full mb-6">
                  <Envelope className="w-4 h-4" />
                  <span className="font-medium">Newsletter</span>
                </div>
                
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Receba Inspiração{" "}
                  <span className="text-purple">Semanal</span>
                </h2>
                
                <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
                  Inscreva-se em nossa newsletter e receba conteúdos exclusivos, lançamentos 
                  antecipados e reflexões espirituais direto em seu e-mail.
                </p>
              </div>
              
              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-serif text-lg h-12"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="spiritual" 
                    size="lg"
                    className="font-serif"
                  >
                    <PaperPlaneTilt className="w-4 h-4" />
                    Inscrever
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Seus dados estão seguros. Não enviamos spam.
                </p>
              </form>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple/10 rounded-xl mb-4">
                        <Icon className="w-6 h-6 text-purple" />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}