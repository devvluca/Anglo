import { motion } from 'framer-motion';
import { ShoppingCart } from 'phosphor-react';
import { useCart } from '@/contexts/CartContext';
import type { ShopifyProduct } from '@/lib/shopify/types';
import { useState } from 'react';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, loading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const firstImage = product.images?.[0];
  const firstVariant = product.variants?.[0];
  const minPrice = product.priceRange?.minVariantPrice?.amount || '0';
  const maxPrice = product.priceRange?.maxVariantPrice?.amount || '0';

  const handleAddToCart = async () => {
    if (!firstVariant) {
      console.log('❌ Nenhuma variante disponível');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(firstVariant.id, 1);
    } catch (error) {
      console.error('❌ Erro ao adicionar:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Imagem do produto - Clicável */}
      <motion.a
        href={`/produto/${product.handle}`}
        className="relative bg-gray-100 aspect-square overflow-hidden block"
      >
        {firstImage?.url ? (
          <motion.img
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Sem imagem</span>
          </div>
        )}

        {/* Badge de disponibilidade */}
        {firstVariant && (
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                firstVariant.availableForSale
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {firstVariant.availableForSale ? 'Disponível' : 'Indisponível'}
            </span>
          </div>
        )}
      </motion.a>

      {/* Conteúdo do card */}
      <div className="p-4 flex flex-col h-full">
        {/* Título - Clicável */}
        <motion.a
          href={`/produto/${product.handle}`}
          className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors"
        >
          {product.title}
        </motion.a>

        {/* Descrição resumida */}
        {product.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Preço - Apenas o menor preço */}
        <div className="mb-4 flex-grow">
          <p className="text-lg font-bold text-primary">
            {formatPrice(minPrice)}
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <motion.button
            onClick={handleAddToCart}
            disabled={!firstVariant?.availableForSale || isAdding || loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            {isAdding || loading ? 'Adicionando...' : 'Adicionar'}
          </motion.button>

          <motion.a
            href={`/produto/${product.handle}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 border border-primary text-primary hover:bg-primary/5 py-2 rounded-md font-medium transition-colors text-center"
          >
            Ver Detalhes
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
