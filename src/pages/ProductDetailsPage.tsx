import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share,
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isRelatedExpanded, setIsRelatedExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

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
                <motion.button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 hover:bg-secondary/30 rounded-full transition-colors flex-shrink-0"
                >
                  <Heart
                    size={20}
                    weight={isWishlisted ? 'fill' : 'regular'}
                    className={isWishlisted ? 'text-rose' : 'text-foreground'}
                  />
                </motion.button>
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
                >
                  <Share size={18} weight="regular" className="text-foreground" />
                </motion.button>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale || isAddingToCart || cartLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart size={20} weight="regular" />
                {isAddingToCart || cartLoading 
                  ? 'Adicionando...' 
                  : selectedVariant?.availableForSale 
                  ? 'Adicionar ao Carrinho' 
                  : 'Indisponível'}
              </motion.button>
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

        {/* Produtos Relacionados */}
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
        </div>
      </div>
      <ChatWidget />
      <Footer />
    </div>
  );
}
