import { Card, CardContent } from "@/components/ui/card";
import { X, Users, BookOpen, Heart } from "phosphor-react";
import patternImage from "@/assets/pattern-bg.jpg";

// Imagem de fundo para a seção de missão
const fundoMissao = "/fundo_missao.jpg";

export function MissionSection() {
  return (
    <section className="py-20 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fundoMissao})` }}
      />
      
      {/* Light overlay for better text readability */}
      <div className="absolute inset-0 bg-white/85" />
      
      {/* Beige accent overlay */}
      <div className="absolute inset-0 bg-beige/10" />
      
      {/* Background Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `url(${patternImage})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple/10 text-purple px-4 py-2 rounded-full mb-6 hover:bg-purple/15 transition-all duration-300 hover:scale-105">
              <X className="w-4 h-4 animate-pulse" />
              <span className="font-semibold">Nossa Missão</span>
            </div>
            
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight animate-fade-in">
              Uma Voz de{" "}
              <span className="text-purple hover:text-rose transition-colors duration-500">Convergência</span>{" "}
              no Cenário Cristão
            </h2>
            
            <div className="space-y-8 font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
              <p className="opacity-0 animate-slide-up-delayed-1 hover:text-foreground transition-colors duration-300">
                A Editora Anglo surge como uma ponte entre a rica tradição cristã e as necessidades 
                espirituais contemporâneas, promovendo a unidade na diversidade através da publicação 
                de conteúdos que nutrem a alma e fortalecem a fé.
              </p>
              
              <p className="opacity-0 animate-slide-up-delayed-2 hover:text-foreground transition-colors duration-300">
                Nosso compromisso é com a formação teológica sólida e a espiritualidade autêntica, 
                oferecendo obras que dialogam com diferentes tradições cristãs enquanto permanecem 
                fiéis à Palavra de Deus.
              </p>
              
              <p className="opacity-0 animate-slide-up-delayed-3 hover:text-foreground transition-colors duration-300">
                Acreditamos que a convergência cristã não diminui a riqueza das tradições, mas sim 
                as celebra em sua diversidade, encontrando na unidade do Espírito a base para uma 
                fé mais profunda e transformadora.
              </p>
            </div>
          </div>
          
          {/* Right Content - Values */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-purple bg-card/50 backdrop-blur-sm shadow-spiritual hover:shadow-elegant transition-all duration-500 hover:scale-105 opacity-0 animate-slide-right-delayed-1 group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-purple/10 p-3 rounded-lg group-hover:bg-purple/20 transition-all duration-300 group-hover:scale-110">
                    <BookOpen className="w-6 h-6 text-purple group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-3 text-foreground group-hover:text-purple transition-colors duration-300">Tradição</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium group-hover:text-foreground transition-colors duration-300">
                      Honramos a rica herança cristã, preservando e transmitindo os tesouros 
                      espirituais das gerações passadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-rose bg-card/50 backdrop-blur-sm shadow-spiritual hover:shadow-elegant transition-all duration-500 hover:scale-105 opacity-0 animate-slide-right-delayed-2 group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-rose/10 p-3 rounded-lg group-hover:bg-rose/20 transition-all duration-300 group-hover:scale-110">
                    <X className="w-6 h-6 text-rose group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-3 text-foreground group-hover:text-rose transition-colors duration-300">Palavra</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium group-hover:text-foreground transition-colors duration-300">
                      A Sagrada Escritura é nosso fundamento, guiando cada publicação e 
                      iluminando o caminho da verdade.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue bg-card/50 backdrop-blur-sm shadow-spiritual hover:shadow-elegant transition-all duration-500 hover:scale-105 opacity-0 animate-slide-right-delayed-3 group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue/10 p-3 rounded-lg group-hover:bg-blue/20 transition-all duration-300 group-hover:scale-110">
                    <Heart className="w-6 h-6 text-blue group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-3 text-foreground group-hover:text-blue transition-colors duration-300">Presença</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium group-hover:text-foreground transition-colors duration-300">
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