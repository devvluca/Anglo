import { Card, CardContent } from "@/components/ui/card";
import { Cross, Users, BookOpen, Heart } from "lucide-react";
import patternImage from "@/assets/pattern-bg.jpg";

export function MissionSection() {
  return (
    <section className="py-20 relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `url(${patternImage})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple/10 text-purple px-4 py-2 rounded-full mb-6">
              <Cross className="w-4 h-4" />
              <span className="font-medium">Nossa Missão</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Uma Voz de{" "}
              <span className="text-purple">Convergência</span>{" "}
              no Cenário Cristão
            </h2>
            
            <div className="space-y-6 font-serif text-lg text-muted-foreground leading-relaxed">
              <p>
                A Editora Anglo surge como uma ponte entre a rica tradição cristã e as necessidades 
                espirituais contemporâneas, promovendo a unidade na diversidade através da publicação 
                de conteúdos que nutrem a alma e fortalecem a fé.
              </p>
              
              <p>
                Nosso compromisso é com a formação teológica sólida e a espiritualidade autêntica, 
                oferecendo obras que dialogam com diferentes tradições cristãs enquanto permanecem 
                fiéis à Palavra de Deus.
              </p>
              
              <p>
                Acreditamos que a convergência cristã não diminui a riqueza das tradições, mas sim 
                as celebra em sua diversidade, encontrando na unidade do Espírito a base para uma 
                fé mais profunda e transformadora.
              </p>
            </div>
          </div>
          
          {/* Right Content - Values */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-purple bg-card/50 backdrop-blur-sm shadow-spiritual">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">Tradição</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Honramos a rica herança cristã, preservando e transmitindo os tesouros 
                      espirituais das gerações passadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-rose bg-card/50 backdrop-blur-sm shadow-spiritual">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-rose/10 p-3 rounded-lg">
                    <Cross className="w-6 h-6 text-rose" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">Palavra</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A Sagrada Escritura é nosso fundamento, guiando cada publicação e 
                      iluminando o caminho da verdade.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue bg-card/50 backdrop-blur-sm shadow-spiritual">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue/10 p-3 rounded-lg">
                    <Heart className="w-6 h-6 text-blue" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">Presença</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Cultivamos a presença divina através da espiritualidade contemplativa 
                      e da vida em comunidade.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}