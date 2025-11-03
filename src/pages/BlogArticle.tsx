import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatWidget } from "@/components/ChatWidget";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Calendar, User, ArrowLeft, Share, Copy, WhatsappLogo, InstagramLogo } from "phosphor-react";
import { motion } from "framer-motion";
import { fetchBlogPostBySlug } from "@/lib/supabase/queries";
import type { BlogPost } from "@/lib/supabase/types";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setError("Artigo não encontrado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`🔍 Carregando artigo: ${slug}`);
        const postData = await fetchBlogPostBySlug(slug);
        
        if (!postData) {
          setError("Artigo não encontrado");
          console.error(`❌ Artigo não encontrado: ${slug}`);
        } else {
          setPost(postData);
          console.log(`✅ Artigo carregado: ${postData.title}`);
        }
      } catch (err) {
        console.error("❌ Erro ao carregar artigo:", err);
        setError("Erro ao carregar o artigo");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple mb-4"></div>
            <p className="text-xl text-muted-foreground">Carregando artigo...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Artigo não encontrado - Blog Anglo</title>
          <meta name="description" content="O artigo que você procura não foi encontrado." />
        </Helmet>
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-2xl">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Desculpe, o artigo que você procura não existe ou foi removido.
            </p>
            <Button 
              onClick={() => navigate('/blog')}
              className="bg-purple hover:bg-purple/90 text-white px-8 py-6 rounded-full font-medium"
            >
              Voltar para o Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const postUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareText = `${post.title} - Blog Anglo`;

  const handleShare = () => {
    setShowShareModal(true);
    setCopied(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        {/* Meta Tags Essenciais */}
        <title>{post.title} - Blog Anglo</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, blog, anglo, ${post.title.toLowerCase()}`} />
        <meta name="author" content={post.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph - Redes Sociais */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={postUrl} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="og:site_name" content="Anglo" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.image && <meta name="twitter:image" content={post.image} />}
        
        {/* Article Meta */}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={postUrl} />
        
        {/* Schema Markup - Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": post.title,
            "description": post.excerpt,
            "image": [post.image],
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Anglo",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/logo_principal.png`
              }
            }
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gradient-to-br from-purple/5 via-background to-blue/5 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <button 
              onClick={() => navigate('/blog')}
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Blog
            </button>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <Badge className={`bg-purple text-white border-0 mb-6`}>
              {post.category}
            </Badge>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border pb-6 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.date}>
                  {new Date(`${post.date}T12:00:00Z`).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              {/* Share Button */}
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="ml-auto p-3 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 text-foreground"
                title="Compartilhar artigo"
              >
                <Share className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Compartilhar</span>
              </motion.button>
            </div>

            {/* Featured Image */}
            {post.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 rounded-lg overflow-hidden aspect-video"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-lg shadow-elegant"
                />
              </motion.div>
            )}

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl text-muted-foreground mb-8 italic border-l-4 border-purple pl-6"
            >
              {post.excerpt}
            </motion.p>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <div
                className="blog-article-content text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <Button
                onClick={() => navigate('/blog')}
                variant="outline"
                className="flex items-center gap-2 border-purple hover:bg-purple/10 hover:text-purple"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o Blog
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </article>

      {/* Modal de Compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fundo desfocado */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-7 py-7 w-full max-w-xs flex flex-col items-center border border-gray-100 dark:border-slate-700"
          >
            <h3 className="text-base font-semibold text-primary mb-4">Compartilhar artigo</h3>
            <div className="flex flex-row gap-6 w-full justify-center mb-3">
              <motion.a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title}\n${postUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'tween', duration: 0.38, ease: 'easeInOut' }}
                className="rounded-full bg-white dark:bg-slate-800 text-primary flex items-center justify-center w-12 h-12 shadow border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                title="WhatsApp"
              >
                <WhatsappLogo size={28} weight="thin" className="text-primary" />
              </motion.a>
              <motion.a
                href={`https://www.instagram.com/?url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'tween', duration: 0.38, ease: 'easeInOut' }}
                className="rounded-full bg-white dark:bg-slate-800 text-primary flex items-center justify-center w-12 h-12 shadow border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                title="Instagram"
              >
                <InstagramLogo size={28} weight="thin" className="text-primary" />
              </motion.a>
              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'tween', duration: 0.38, ease: 'easeInOut' }}
                className={`rounded-full bg-muted dark:bg-slate-800 text-primary flex items-center justify-center w-12 h-12 shadow border ${copied ? 'border-primary' : 'border-gray-200 dark:border-slate-600'} relative focus:outline-none focus:ring-2 focus:ring-primary/40`}
                title="Copiar link"
                aria-label="Copiar link"
              >
                <motion.div
                  initial={false}
                  animate={copied ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                >
                  {copied ? (
                    <motion.svg
                      key="check"
                      xmlns="http://www.w3.org/2000/svg"
                      width={26}
                      height={26}
                      viewBox="0 0 256 256"
                      fill="none"
                      className="text-primary"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                    >
                      <motion.path
                        d="M216 72l-104 112-48-48"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      />
                    </motion.svg>
                  ) : (
                    <Copy size={26} weight="regular" className="text-primary" />
                  )}
                </motion.div>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 top-14 text-xs font-medium text-primary bg-white dark:bg-slate-900 rounded-lg px-3 py-1 shadow border border-primary/30"
                  >
                    Copiado!
                  </motion.span>
                )}
              </motion.button>
            </div>
            {/* Link visível abaixo */}
            <div className="w-full flex flex-col items-center mt-2">
              <span className="text-xs text-muted-foreground mb-1">Link do artigo:</span>
              <div className="text-sm font-mono bg-muted dark:bg-slate-800 rounded-lg px-3 py-1 text-primary break-all select-all border border-primary/10 max-w-full" style={{maxWidth:'100%'}}>{postUrl}</div>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
              title="Fechar"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </motion.div>
        </div>
      )}
      <NewsletterSection />

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogArticle;
