import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Heart } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-repeat" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--beige)) 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, hsl(var(--rose)) 1px, transparent 1px)`,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
            <Heart className="w-4 h-4 text-beige" />
            <span className="text-sm font-medium">Uma voz de convergência cristã</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Tradição,{" "}
            <span className="text-beige block">Palavra</span>
            <span className="text-rose">& Presença</span>
          </h1>
          
          {/* Subtitle */}
          <p className="font-serif text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Promovendo formação teológica e espiritualidade sólida através da publicação de conteúdos 
            que unem tradição cristã e presença transformadora.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="font-serif text-lg px-8 py-6">
              <BookOpen className="w-5 h-5" />
              Explore Nossos Livros
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="font-serif text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              Conheça Nossa Missão
            </Button>
          </div>
          
          {/* Trinity Symbol */}
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-beige/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-beige opacity-60"></div>
                  <div className="w-3 h-3 rounded-full bg-rose opacity-60 -ml-1"></div>
                  <div className="w-3 h-3 rounded-full bg-blue opacity-60 -ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}