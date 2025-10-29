import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { useProducts } from '@/hooks/useProducts';

export function ProductsSection() {
  const { products, loading, error, hasNextPage, loadMore } = useProducts(12);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
            Nossos Produtos
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Explore nossa seleção de livros espirituais e materiais de formação cristã
          </p>
        </motion.div>

        {/* Grid de produtos */}
        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-red-50 rounded-lg border border-red-200"
          >
            <p className="text-red-800 font-medium mb-2">Erro ao carregar produtos</p>
            <p className="text-red-600 text-sm">{error.message}</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Loading state */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
                <p className="text-gray-600 mt-4">Carregando produtos...</p>
              </motion.div>
            )}

            {/* Load more button */}
            {hasNextPage && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <motion.button
                  onClick={loadMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
                >
                  Carregar mais produtos
                </motion.button>
              </motion.div>
            )}

            {/* Empty state */}
            {products.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="text-gray-600 font-medium">Nenhum produto encontrado</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
