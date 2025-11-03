import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatWidget } from "@/components/ChatWidget";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Calendar, User, ArrowLeft, Share } from "phosphor-react";
import { motion } from "framer-motion";
import { fetchBlogPostBySlug } from "@/lib/supabase/queries";
import type { BlogPost } from "@/lib/supabase/types";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: postUrl
                    });
                  } else {
                    // Fallback: copiar URL
                    navigator.clipboard.writeText(postUrl);
                    alert('Link copiado!');
                  }
                }}
                className="ml-auto flex items-center gap-2 hover:text-purple transition-colors"
                title="Compartilhar artigo"
              >
                <Share className="w-5 h-5" />
                <span className="hidden sm:inline">Compartilhar</span>
              </button>
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

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogArticle;
