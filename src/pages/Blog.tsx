import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatWidget } from "@/components/ChatWidget";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MagnifyingGlass, Calendar, User, ArrowRight, ArrowUp } from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useNavigate } from "react-router-dom";
import type { BlogPost } from "@/lib/supabase/types";

// SVG Venn Icon - PERFEITO E SIMÉTRICO
const VennIcon = (props: React.SVGProps<SVGSVGElement>) => {
  // Valores fixos calculados para simetria PERFEITA
  // Todos os 3 círculos têm EXATAMENTE o mesmo raio
  const r = 5.5; // raio IDÊNTICO para todos
  
  // Centros formando triângulo equilátero perfeito
  // Distância do centro ao vértice do triângulo
  const d = 4.5;
  
  // Ângulos EXATOS para triângulo equilátero
  const a1 = -90;  // topo
  const a2 = 150;  // esquerda inferior
  const a3 = 30;   // direita inferior
  
  // Converter para radianos e calcular posições
  const rad1 = (a1 * Math.PI) / 180;
  const rad2 = (a2 * Math.PI) / 180;
  const rad3 = (a3 * Math.PI) / 180;
  
  // Centro do SVG
  const cx = 12;
  const cy = 13;
  
  // Posições dos 3 círculos
  const x1 = cx + d * Math.cos(rad1);
  const y1 = cy + d * Math.sin(rad1);
  
  const x2 = cx + d * Math.cos(rad2);
  const y2 = cy + d * Math.sin(rad2);
  
  const x3 = cx + d * Math.cos(rad3);
  const y3 = cy + d * Math.sin(rad3);
  
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Círculo 1 - Topo */}
      <circle cx={x1} cy={y1} r={r} />
      {/* Círculo 2 - Esquerda inferior */}
      <circle cx={x2} cy={y2} r={r} />
      {/* Círculo 3 - Direita inferior */}
      <circle cx={x3} cy={y3} r={r} />
    </svg>
  );
};

// Componente do Diagrama de Venn Animado
const VennDiagram = ({ onNavigateHome }: { onNavigateHome: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setRotation(prev => (prev + (e.deltaY > 0 ? 15 : -15)) % 360);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div
      className="cursor-pointer"
      style={{ touchAction: 'none' }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onNavigateHome}
        animate={{ scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto inline-block"
        >
          <VennIcon className="w-24 h-24 text-purple/70" />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Dados de exemplo para os posts do blog (fallback se Supabase não tiver dados)
const fallbackBlogPosts: BlogPost[] = [];

const fallbackCategories = ["Todos", "Espiritualidade", "Educação", "Liturgia"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const navigate = useNavigate();
  
  // Função para navegar para o HeroSection com scroll para o topo
  const handleNavigateHome = () => {
    navigate('/');
    // Scroll para o topo após navegação
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };
  
  // Buscar posts do Supabase
  const { posts: supabasePosts, categories: supabaseCategories, loading } = useBlogPosts();
  
  // Usar posts do Supabase se disponíveis, caso contrário usar fallback
  const blogPosts = supabasePosts.length > 0 ? supabasePosts : fallbackBlogPosts;
  const categories = supabaseCategories.length > 0 
    ? ["Todos", ...supabaseCategories.map(cat => cat.name)]
    : fallbackCategories;

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section com Padronagem de Fundo - Inclui Busca e Categorias */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-purple/5 via-background to-blue/5 relative overflow-hidden">
        {/* Padronagem de fundo */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('/padronagem_footer.png')",
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}
        />
        {/* Overlay pequeno na base para suavizar transição */}
        <div className="absolute left-0 right-0 bottom-0 h-[4vh] bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Blog Anglo
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Reflexões, ensinamentos e inspirações para fortalecer sua fé e enriquecer sua jornada espiritual
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-10">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-border focus:border-purple transition-colors"
              />
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full font-medium transition-all ${
                    selectedCategory === category 
                      ? "bg-purple text-white hover:bg-purple/90 shadow-elegant" 
                      : "hover:bg-beige hover:shadow-md"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple"></div>
              <p className="text-xl text-muted-foreground mt-4">Carregando artigos...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <motion.div 
              className="text-center py-32 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 flex justify-center"
              >
                <VennDiagram onNavigateHome={handleNavigateHome} />
              </motion.div>
              <motion.h2
                className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Em Breve
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Estamos preparando conteúdos inspiradores e ensinamentos profundos para sua jornada espiritual. Em breve, artigos, reflexões e muito mais estarão disponíveis aqui.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  className="bg-purple hover:bg-purple/90 text-white px-8 py-6 rounded-full font-medium shadow-elegant"
                  onClick={handleNavigateHome}
                >
                  Voltar ao Início
                </Button>
              </motion.div>
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                Nenhum artigo encontrado com os filtros selecionados.
              </p>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.id} variants={item}>
                  <Card className="group overflow-hidden border-2 border-border hover:border-purple/50 transition-all duration-500 hover:shadow-elegant h-full">
                    <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-purple/10 to-blue/10">
                      {post.image ? (
                        <>
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                        </>
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br from-${post.color}/20 to-${post.color}/5 flex items-center justify-center`}>
                          <div className={`w-20 h-20 rounded-full bg-${post.color}/20 flex items-center justify-center`}>
                            <span className="text-3xl">📖</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className={`bg-${post.color} text-white border-0`}>
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col">
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-purple transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4 mt-auto">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="mt-4 w-full group-hover:bg-purple/10 group-hover:text-purple transition-colors"
                        onClick={() => setSelectedPost(post)}
                      >
                        Ler mais
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

      </section>

      {/* Modal do Artigo Completo */}
      <AnimatePresence>
        {selectedPost && (
          <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-2 border-border shadow-2xl">
              <DialogHeader>
                <div className="relative">
                  <Badge className={`bg-purple text-white border-0 mb-4`}>
                    {selectedPost.category}
                  </Badge>
                  <DialogTitle className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 pr-8">
                    {selectedPost.title}
                  </DialogTitle>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedPost.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              
              {selectedPost.image ? (
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-auto rounded-lg mb-6 object-cover"
                />
              ) : (
                <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-purple/10 to-blue/10 rounded-lg mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-blue/5 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-5xl">📖</span>
                    </div>
                  </div>
                </div>
              )}

              <div 
                className="prose prose-lg max-w-none text-foreground blog-article-content"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Blog;
