import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/ChatWidget";
import { motion } from "framer-motion";
import { ArrowLeft, House } from "phosphor-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.15, duration: 0.6 },
    }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* 404 Hero Section */}
      <section className="flex-1 flex items-center justify-center pt-20 pb-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('/padronagem_footer.png')",
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}
        />

        {/* Gradient Blobs */}
        <div className="absolute top-10 -right-32 w-96 h-96 bg-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-40 w-80 h-80 bg-blue/10 rounded-full blur-3xl"></div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 relative z-10 text-center max-w-3xl"
        >
          {/* Animated Venn Diagram */}
          <motion.div
            variants={itemVariants}
            className="mb-12 flex justify-center"
          >
          </motion.div>

          {/* 404 Text */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="font-serif text-8xl md:text-9xl font-bold text-purple mb-2 select-none">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-purple to-rose mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4"
          >
            Página Perdida
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed"
          >
            Desculpe, a página que você procura não existe. Talvez tenha desviado do caminho em sua jornada. Deixe-nos ajudá-lo a voltar ao caminho certo.
          </motion.p>

          {/* Attempted Route Display */}
          <motion.div
            variants={itemVariants}
            className="mb-8 p-4 bg-purple/5 border border-purple/20 rounded-lg inline-block max-w-sm"
          >
            <p className="text-sm text-muted-foreground font-mono break-all">
              Rota não encontrada: <span className="text-purple font-semibold">{location.pathname}</span>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex items-center gap-2 border-purple text-purple hover:bg-purple/10"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar Atrás
              </Button>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-purple hover:bg-purple/90 text-white shadow-elegant"
              >
                <House className="w-5 h-5" />
                Ir ao Início
              </Button>
            </motion.button>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-4 justify-center"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple/50"></div>
            <span className="text-xs text-muted-foreground font-serif">Editora Anglo</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple/50"></div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default NotFound;
