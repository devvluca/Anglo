import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, X, Lightning } from 'phosphor-react';
import { useSearch } from '@/hooks/useSearch';
import { ProductCard } from './ProductCard';

interface SearchBarProps {
  onClose?: () => void;
}

const recentSearches = ['Livros', 'Devocional', 'Bíblia', 'Margens Invisíveis'];
const suggestedCategories = ['Todos', 'Livros', 'Revistas', 'Desvocional'];

export function SearchBar({ onClose }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { searchResults, search, clearSearch, loading } = useSearch();

  const handleSearch = async (value: string) => {
    setSearchInput(value);
    if (value.trim()) {
      await search(value);
    } else {
      clearSearch();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    clearSearch();
    setSearchInput('');
    onClose?.();
  };

  const handleQuickSearch = (term: string) => {
    setSearchInput(term);
    handleSearch(term);
  };

  return (
    <>
      {/* Botão de busca */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 hover:bg-secondary/30 rounded-full transition-all duration-300"
        aria-label="Abrir busca"
      >
        <MagnifyingGlass size={20} className="text-foreground" weight="regular" />
      </motion.button>

      {/* Modal de busca */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay com gradiente sutil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/10 z-40 backdrop-blur-sm"
            />

            {/* Conteúdo de busca */}
            <motion.div
              initial={{ opacity: 0, y: -30, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -30, scaleY: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-20 left-0 right-0 z-50 bg-background border-b border-border/30"
            >
              <div className="container mx-auto px-4 md:px-8 py-6">
                {/* Barra de entrada */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple/10 to-rose/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    <MagnifyingGlass
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300"
                      weight="regular"
                    />
                    <input
                      type="text"
                      placeholder="O que você procura?"
                      value={searchInput}
                      onChange={e => handleSearch(e.target.value)}
                      autoFocus
                      className="w-full pl-12 pr-4 py-3 border border-border/50 bg-card text-foreground placeholder:text-muted-foreground rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-base"
                    />
                  </div>
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.05, backgroundColor: 'hsl(33 100% 90%)' }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 hover:bg-secondary/30 rounded-lg transition-colors duration-300"
                  >
                    <X size={20} className="text-foreground" />
                  </motion.button>
                </div>

                {/* Resultados */}
                <div className="mt-2 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="inline-flex flex-col items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="h-10 w-10 border-3 border-primary/20 border-t-primary rounded-full"
                        ></motion.div>
                        <p className="text-muted-foreground text-sm font-medium">Buscando...</p>
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
                      {searchResults.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04 }}
                          onClick={handleClose}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </div>
                  ) : searchInput.trim() ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="text-4xl mb-4">🔍</div>
                      <p className="text-foreground font-medium">Nenhum produto encontrado</p>
                      <p className="text-muted-foreground text-sm mt-1">Tente outro termo de busca</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-8"
                    >
                      {/* Buscas recentes */}
                      {recentSearches.length > 0 && (
                        <div className="mb-8">
                          <div className="flex items-center gap-2 mb-4">
                            <Lightning size={16} className="text-primary" weight="fill" />
                            <h3 className="text-sm font-semibold text-foreground">Buscas recentes</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((term, index) => (
                              <motion.button
                                key={index}
                                onClick={() => handleQuickSearch(term)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-full text-sm font-medium transition-colors duration-300"
                              >
                                {term}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Categorias sugeridas */}
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Categorias populares</h3>
                        <div className="flex flex-wrap gap-2">
                          {suggestedCategories.map((category, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleQuickSearch(category === 'Todos' ? '' : category)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 border border-border/30 hover:border-primary/50 hover:bg-primary/5 text-foreground rounded-full text-sm font-medium transition-all duration-300"
                            >
                              {category}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
