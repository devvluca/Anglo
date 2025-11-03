import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, Download, X, LinkSimple } from 'phosphor-react';
import { unsplashAPI } from '@/lib/unsplash/config';
import { useToast } from '@/hooks/use-toast';

interface UnsplashImage {
  id: string;
  url: string;
  thumb: string;
  title: string;
  author: string;
  authorUrl: string;
  photoUrl: string;
}

interface UnsplashImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

const UnsplashImagePicker = ({ isOpen, onClose, onSelect }: UnsplashImagePickerProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('espiritualidade');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Buscar imagens quando abrir ou mudar página/query
  const loadImages = useCallback(async (pageNum = 1, newQuery = searchQuery) => {
    if (!newQuery.trim()) {
      toast({
        title: 'Erro',
        description: 'Digite um termo de busca',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await unsplashAPI.searchImages(newQuery, pageNum, 12);
      
      if (result.results.length === 0 && pageNum === 1) {
        toast({
          title: 'Nenhuma imagem encontrada',
          description: `Nenhuma imagem encontrada para "${newQuery}"`,
          variant: 'destructive',
        });
        setImages([]);
        setHasMore(false);
      } else {
        if (pageNum === 1) {
          setImages(result.results);
        } else {
          setImages(prev => [...prev, ...result.results]);
        }
        setHasMore(pageNum < (result.total_pages || 1));
        setPage(pageNum);
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao buscar imagens. Verifique sua chave de API do Unsplash.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, toast]);

  // Carregar imagens quando abrir
  useEffect(() => {
    if (isOpen) {
      loadImages(1);
      // Focus no input
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen, loadImages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadImages(1, searchQuery);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadImages(page + 1);
    }
  };

  const handleSelectImage = async (image: UnsplashImage) => {
    setIsDownloading(image.id);
    try {
      // Fazer download da imagem em alta resolução
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Atualizar a imagem
      onSelect(url);
      
      toast({
        title: 'Sucesso!',
        description: `Imagem de ${image.author} selecionada`,
      });

      // Fechar o picker
      setTimeout(() => onClose(), 500);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao fazer download da imagem',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative z-10 w-full md:w-[90%] lg:w-[80%] max-w-2xl bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/30">
            <div>
              <h2 className="text-2xl font-bold text-primary">Buscar no Unsplash</h2>
              <p className="text-sm text-muted-foreground">Milhões de fotos de alta qualidade</p>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            >
              <X size={24} weight="regular" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-border/30 bg-white">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busque por tema... (ex: natureza, ceu, praia)"
                  className="w-full px-4 py-3 pl-10 border border-border/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {isLoading ? 'Buscando...' : 'Buscar'}
              </motion.button>
            </form>
          </div>

          {/* Images Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading && images.length === 0 ? (
              <div className="flex items-center justify-center h-48">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
                />
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhuma imagem encontrada</p>
                <p className="text-sm text-muted-foreground">Tente outro termo de busca</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative overflow-hidden rounded-lg cursor-pointer"
                    >
                      <img
                        src={image.thumb}
                        alt={image.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3"
                      >
                        <motion.button
                          onClick={() => handleSelectImage(image)}
                          disabled={isDownloading === image.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
                        >
                          {isDownloading === image.id ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Carregando...
                            </>
                          ) : (
                            <>
                              <Download size={16} weight="regular" />
                              Usar
                            </>
                          )}
                        </motion.button>

                        <a
                          href={image.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/80 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <LinkSimple size={12} weight="regular" />
                          {image.author}
                        </a>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More */}
                {hasMore && !isLoading && (
                  <motion.button
                    onClick={handleLoadMore}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 border border-border/50 hover:bg-primary/5 text-foreground font-medium rounded-lg transition-colors"
                  >
                    Carregar Mais
                  </motion.button>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border/30 bg-muted/30 text-xs text-muted-foreground">
            Imagens fornecidas por <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Unsplash</a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UnsplashImagePicker;
