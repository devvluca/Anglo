import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share,
  Copy,
  WhatsappLogo,
  InstagramLogo,
  Minus,
  Plus,
  Camera,
  Package,
  Lock,
  ArrowCounterClockwise,
  Headphones,
  CaretDown,
  ArrowRight,
} from 'phosphor-react';
import { shopifyFetch } from '@/lib/shopify/config';
import { GET_PRODUCT_DETAILS_QUERY } from '@/lib/shopify/queries';
import { transformProduct } from '@/lib/shopify/transformers';
import { useCart } from '@/contexts/CartContext';
import type { ShopifyProduct } from '@/lib/shopify/types';
import { motion, Variants } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';

export default function ProductDetailsPage() {
  const [buyNowHovered, setBuyNowHovered] = useState(false);
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addToCart, loading: cartLoading, cart } = useCart();
  
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const [isRelatedExpanded, setIsRelatedExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Compartilhar produto - modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = () => {
    setShowShareModal(true);
    setCopied(false);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopied(true);
        })
        .catch(() => {
          setCopied(false);
        });
    } else {
      // Fallback para navegadores antigos
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (err) {
        setCopied(false);
      }
      document.body.removeChild(textArea);
    }
  };
  useEffect(() => {
    if (!handle) {
      setError('Produto não encontrado');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await shopifyFetch<any>({
          query: GET_PRODUCT_DETAILS_QUERY,
          variables: { handle },
        });

        if (data?.productByHandle) {
          const transformedProduct = transformProduct(data.productByHandle);
          setProduct(transformedProduct);
        } else {
          setError('Produto não encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product?.variants?.[selectedVariantIndex]) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart(product.variants[selectedVariantIndex].id, quantity);
      setQuantity(1);
    } catch (error) {
      console.error('Erro ao adicionar:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 border-3 border-primary/20 border-t-primary rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Package size={48} weight="light" className="text-muted-foreground mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
          >
            <ArrowLeft size={18} weight="regular" />
            Voltar à loja
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const selectedImage = product.images?.[selectedImageIndex];
  const selectedVariant = product.variants?.[selectedVariantIndex];
  const minPrice = product.priceRange?.minVariantPrice?.amount || '0';
  const maxPrice = product.priceRange?.maxVariantPrice?.amount || '0';
  const currentPrice = selectedVariant?.price?.amount || minPrice;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', damping: 25, stiffness: 300 } as any
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Breadcrumb/Voltar */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={18} weight="regular" className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar para loja</span>
          </motion.button>

          {/* Conteúdo principal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20"
          >
          {/* Galeria de Imagens */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Imagem Principal - Com Zoom Preview */}
            <div 
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-300 group shadow-sm" 
              ref={imageRef}
              onMouseMove={(e) => {
                if (imageRef.current) {
                  const rect = imageRef.current.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  setMousePos({ x, y });
                  setShowZoom(true);
                }
              }}
              onMouseLeave={() => setShowZoom(false)}
            >
              {selectedImage?.url ? (
                <>
                  {/* Main Image */}
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={selectedImage.url}
                    alt={selectedImage.altText || product.title}
                    className="w-full h-full object-cover cursor-crosshair"
                  />
                  
                  {/* Zoom Preview Box */}
                  {showZoom && selectedImage?.url && (
                    <div
                      className="absolute z-20 border-2 border-primary/80 bg-white shadow-lg overflow-hidden rounded-xl"
                      style={{
                        width: '280px',
                        height: '280px',
                        right: '20px',
                        top: '20px',
                        backgroundImage: `url(${selectedImage.url})`,
                        backgroundSize: '350%',
                        backgroundPosition: `${(mousePos.x / (imageRef.current?.clientWidth || 1)) * 100}% ${(mousePos.y / (imageRef.current?.clientHeight || 1)) * 100}%`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )}
                  
                  {/* Zoom Preview Square Indicator */}
                  {showZoom && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute border-2 border-primary/60 bg-white/5 pointer-events-none z-10 rounded-lg"
                      style={{
                        width: '112px',
                        height: '112px',
                        left: `${Math.max(0, Math.min(mousePos.x - 56, (imageRef.current?.clientWidth || 0) - 112))}px`,
                        top: `${Math.max(0, Math.min(mousePos.y - 56, (imageRef.current?.clientHeight || 0) - 112))}px`,
                      }}
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                  <div className="text-center">
                    <div className="text-5xl mb-2">📷</div>
                    <p className="text-muted-foreground text-sm">Sem imagem</p>
                  </div>
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? 'border-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 ring-2 ring-primary ring-offset-2 ring-offset-background"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Informações do Produto */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Título e Heart */}
            <div>
              <motion.div variants={itemVariants} className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {product.title}
                </h1>
                {/* Botão de coração removido */}
              </motion.div>
            </div>

            {/* Preço */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">Preço</p>
              <motion.div 
                key={currentPrice}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="flex items-baseline gap-2"
              >
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(currentPrice)}
                </p>
              </motion.div>
              {selectedVariant && selectedVariant.availableForSale && (
                <p className="text-xs text-green-600 font-medium">✓ Em estoque</p>
              )}
            </motion.div>

            {/* Descrição */}
            {product.description && (
              <motion.div variants={itemVariants} className="space-y-3 pb-4 border-b border-gray-200">
                <p className="text-muted-foreground text-sm font-medium">Descrição</p>
                <p className="text-foreground leading-relaxed text-sm">
                  {product.description}
                </p>
              </motion.div>
            )}

            {/* Variantes */}
            {product.variants && product.variants.length > 1 && (
              <motion.div variants={itemVariants} className="space-y-3 pb-4 border-b border-gray-200">
                <p className="text-muted-foreground text-sm font-medium">Opções</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <motion.button
                      key={variant.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                        selectedVariantIndex === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white border border-gray-300 text-foreground hover:border-gray-400'
                      } ${!variant.availableForSale && 'opacity-50 cursor-not-allowed'}`}
                      disabled={!variant.availableForSale}
                    >
                      {variant.title}
                      {!variant.availableForSale && ' (Indisponível)'}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantidade e Add to Cart */}
            <motion.div variants={itemVariants} className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity === 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                  >
                    <Minus size={16} weight="regular" className="text-foreground" />
                  </motion.button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center bg-transparent text-foreground font-medium border-0 outline-none"
                    min="1"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} weight="regular" className="text-foreground" />
                  </motion.button>
                </div>

                {/* Share */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={handleShare}
                  title="Compartilhar produto"
                >
                  <Share size={18} weight="regular" className="text-foreground" />
                </motion.button>
      {/* Modal de Compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fundo desfocado */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          />
          {/* Modal minimalista horizontal com ícones Phosphor e cores do tema */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="relative z-10 bg-white rounded-2xl shadow-xl px-7 py-7 w-full max-w-xs flex flex-col items-center border border-gray-100"
          >
            <h3 className="text-base font-semibold text-primary mb-4">Compartilhar produto</h3>
            <div className="flex flex-row gap-6 w-full justify-center mb-3">
              <motion.a
                href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'tween', duration: 0.38, ease: 'easeInOut' }}
                className="rounded-full bg-white text-primary flex items-center justify-center w-12 h-12 shadow border border-primary/30 group focus:outline-none focus:ring-2 focus:ring-primary/40"
                title="WhatsApp"
              >
                <WhatsappLogo size={28} weight="thin" className="text-primary" />
              </motion.a>
              <motion.a
                href={`https://www.instagram.com/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'tween', duration: 0.38, ease: 'easeInOut' }}
                className="rounded-full bg-white text-primary flex items-center justify-center w-12 h-12 shadow border border-primary/30 group focus:outline-none focus:ring-2 focus:ring-primary/40"
                title="Instagram"
              >
                <InstagramLogo size={28} weight="thin" className="text-primary" />
              </motion.a>
              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'tween', duration: 0.38, ease: 'easeInOut' }}
                className={`rounded-full bg-muted text-primary flex items-center justify-center w-12 h-12 shadow border ${copied ? 'border-primary' : 'border-gray-200'} relative group focus:outline-none focus:ring-2 focus:ring-primary/40`}
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
                        stroke="#7c3aed"
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
                    className="absolute left-1/2 -translate-x-1/2 top-14 text-xs font-medium text-primary bg-white/90 rounded-lg px-3 py-1 shadow border border-primary/30"
                  >Copiado!</motion.span>
                )}
              </motion.button>
            </div>
            {/* Link visível abaixo */}
            <div className="w-full flex flex-col items-center mt-2">
              <span className="text-xs text-muted-foreground mb-1">Link do produto:</span>
              <div className="text-sm font-mono bg-muted/60 rounded-lg px-3 py-1 text-primary break-all select-all border border-primary/10 max-w-full" style={{maxWidth:'100%'}}>{url}</div>
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
              </div>

              {/* Add to Cart Button */}
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale || isAddingToCart || cartLoading}
                  whileHover={{ scale: 1.005, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="w-full md:w-auto flex-1 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  <ShoppingCart size={20} weight="regular" />
                  {isAddingToCart || cartLoading 
                    ? 'Adicionando...' 
                    : selectedVariant?.availableForSale 
                    ? 'Adicionar ao Carrinho' 
                    : 'Indisponível'}
                </motion.button>
                <motion.button
                  onClick={async () => {
                    if (selectedVariant?.id && selectedVariant?.availableForSale) {
                      await addToCart(selectedVariant.id, quantity);
                      setTimeout(() => {
                        if (typeof cart?.checkoutUrl === 'string') {
                          window.open(cart.checkoutUrl, '_blank');
                        }
                      }, 400);
                    }
                  }}
                  disabled={!selectedVariant?.availableForSale}
                  whileHover={{ scale: 1.008 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setBuyNowHovered(true)}
                  onMouseLeave={() => setBuyNowHovered(false)}
                  className="w-full md:w-auto flex-1 py-4 bg-white border border-primary text-primary font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg hover:bg-primary/5 disabled:bg-muted disabled:cursor-not-allowed group"
                >
                  <motion.span
                    animate={buyNowHovered ? { x: [0, 4, 0] } : { x: 0 }}
                    transition={buyNowHovered ? { duration: 0.7, ease: 'easeInOut' } : { duration: 0.3, ease: 'easeInOut' }}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight size={20} weight="bold" />
                  </motion.span>
                  Compre já
                </motion.button>
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 pt-6">
              <div 
                className="text-center flex flex-col items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <div
                  className="text-primary"
                >
                  <ShoppingCart size={32} weight="light" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">Frete rápido</p>
              </div>
              
              <div 
                className="text-center flex flex-col items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <div
                  className="text-primary"
                >
                  <Lock size={32} weight="light" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">Compra segura</p>
              </div>
              
              <div 
                className="text-center flex flex-col items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <div
                  className="text-primary"
                >
                  <ArrowCounterClockwise size={32} weight="light" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">Devoluções</p>
              </div>
              
              <div 
                className="text-center flex flex-col items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <div
                  className="text-primary"
                >
                  <Headphones size={32} weight="light" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">Suporte 24/7</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Produtos Relacionados - comentado temporariamente */}
        {/**
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <motion.button
            onClick={() => setIsRelatedExpanded(!isRelatedExpanded)}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 mb-6 group"
          >
            <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              Produtos relacionados
            </h2>
            <motion.div
              animate={{ rotate: isRelatedExpanded ? 180 : 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <CaretDown size={20} className="text-primary" weight="bold" />
            </motion.div>
          </motion.button>

          <motion.div
            initial={false}
            animate={{
              height: isRelatedExpanded ? 'auto' : 0,
              opacity: isRelatedExpanded ? 1 : 0,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-64 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors font-medium">
                      Produtos relacionados serão exibidos aqui
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        */}
        </div>
      </div>
      <ChatWidget />
      <Footer />
    </div>
  );
}
