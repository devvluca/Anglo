import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignOut, Plus, Upload, X, Trash, PencilSimple, Eye, Image } from 'phosphor-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase/config';
import { uploadBlogImage } from '@/lib/supabase/storage';
import { useToast } from '@/hooks/use-toast';
import UnsplashImagePicker from '@/components/UnsplashImagePicker';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  color: string;
  image: string | null;
  slug: string;
  created_at: string;
}

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  color: string;
  image: string;
}

const initialFormData: BlogFormData = {
  title: '',
  excerpt: '',
  content: '',
  category: 'Espiritualidade',
  author: 'Editora Anglo',
  date: new Date().toISOString().split('T')[0],
  color: 'purple',
  image: '',
};

const categories = ['Espiritualidade', 'Educação', 'Liturgia', 'Devoção', 'Outros'];
const colors = ['purple', 'beige', 'rose', 'blue', 'green'];

export default function AdminPanel() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [showUnsplash, setShowUnsplash] = useState(false);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[ç]/g, 'c')
      .replace(/[ã]/g, 'a')
      .replace(/[á]/g, 'a')
      .replace(/[â]/g, 'a')
      .replace(/[é]/g, 'e')
      .replace(/[í]/g, 'i')
      .replace(/[ó]/g, 'o')
      .replace(/[ô]/g, 'o')
      .replace(/[õ]/g, 'o')
      .replace(/[ú]/g, 'u')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  };

  // Carrega posts ao montar o componente
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Erro',
          description: 'Erro ao carregar posts',
          variant: 'destructive',
        });
      } else {
        setPosts(data || []);
      }
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação de tipo
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione uma imagem válida',
        variant: 'destructive',
      });
      return;
    }

    // Validação de tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Erro',
        description: 'A imagem deve ter no máximo 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploadingImage(true);

    try {
      // Cria preview local
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Faz upload
      const imageUrl = await uploadBlogImage(file);
      if (imageUrl) {
        setFormData(prev => ({
          ...prev,
          image: imageUrl,
        }));
        toast({
          title: 'Sucesso!',
          description: 'Imagem enviada com sucesso',
        });
      } else {
        toast({
          title: 'Erro',
          description: 'Falha ao fazer upload da imagem',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao processar a imagem',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingImage(false);
      // Limpa o input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: '',
    }));
    setImagePreview('');
  };

  const handleUnsplashSelect = async (imageUrl: string) => {
    setIsUploadingImage(true);
    try {
      // Converter blob URL para URL remota usando Unsplash
      // Se for um blob, fazer upload normalmente
      if (imageUrl.startsWith('blob:')) {
        // Fetch do blob e converter para file
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'unsplash-image.jpg', { type: 'image/jpeg' });
        const uploadedUrl = await uploadBlogImage(file);
        if (uploadedUrl) {
          setFormData(prev => ({
            ...prev,
            image: uploadedUrl,
          }));
          setImagePreview(uploadedUrl);
          toast({
            title: 'Sucesso!',
            description: 'Imagem do Unsplash adicionada com sucesso',
          });
        }
      } else {
        setFormData(prev => ({
          ...prev,
          image: imageUrl,
        }));
        setImagePreview(imageUrl);
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao processar imagem do Unsplash',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingImage(false);
      setShowUnsplash(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      date: post.date,
      color: post.color,
      image: post.image || '',
    });
    setImagePreview(post.image || '');
    setEditingPostId(post.id);
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePost = async (postId: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este artigo?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        toast({
          title: 'Erro',
          description: 'Erro ao deletar artigo',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Sucesso!',
          description: 'Artigo deletado com sucesso',
        });
        loadPosts();
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar artigo',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação
      if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
        toast({
          title: 'Erro',
          description: 'Por favor, preencha todos os campos obrigatórios',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const slug = generateSlug(formData.title);

      // Converter a data para ISO string corretamente (evita problemas com timezone)
      // Pega a data selecionada e adiciona hora 12:00:00 UTC para evitar deslocamento de fuso
      const dateObj = new Date(`${formData.date}T12:00:00Z`);
      const isoDate = dateObj.toISOString().split('T')[0]; // volta a ser apenas a data

      if (editingPostId) {
        // Atualizar post existente
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: formData.title,
            slug: slug,
            excerpt: formData.excerpt,
            content: formData.content,
            category: formData.category,
            author: formData.author,
            date: isoDate,
            color: formData.color,
            image: formData.image || null,
            published: true,
          })
          .eq('id', editingPostId);

        if (error) {
          toast({
            title: 'Erro ao atualizar',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Sucesso!',
            description: 'Artigo atualizado com sucesso',
          });
          setFormData(initialFormData);
          setImagePreview('');
          setEditingPostId(null);
          loadPosts();
        }
      } else {
        // Criar novo post
        const { error } = await supabase
          .from('blog_posts')
          .insert([
            {
              title: formData.title,
              slug: slug,
              excerpt: formData.excerpt,
              content: formData.content,
              category: formData.category,
              author: formData.author,
              date: isoDate,
              color: formData.color,
              image: formData.image || null,
              published: true,
            },
          ])
          .select();

        if (error) {
          toast({
            title: 'Erro ao salvar',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Sucesso!',
            description: 'Artigo publicado com sucesso',
          });
          setFormData(initialFormData);
          setImagePreview('');
          loadPosts();
        }
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Algo deu errado ao salvar o artigo',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* UnsplashImagePicker Modal */}
      <UnsplashImagePicker
        isOpen={showUnsplash}
        onClose={() => setShowUnsplash(false)}
        onSelect={handleUnsplashSelect}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <img
                src="/horizontal_navbar.png"
                alt="Logo Editora Anglo"
                className="w-40 h-auto object-contain"
              />
            </div>
            <h1 className="text-lg font-serif font-bold text-primary">
              Painel Admin
            </h1>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              <SignOut size={18} weight="regular" />
              <span>Sair</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="fixed top-20 left-0 right-0 z-30 bg-background border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-1">
            <motion.button
              onClick={() => {
                setActiveTab('create');
                setEditingPostId(null);
                setFormData(initialFormData);
                setImagePreview('');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-all ${
                activeTab === 'create'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Plus size={16} weight="regular" />
                Novo Artigo
              </div>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('list')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-all ${
                activeTab === 'list'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye size={16} weight="regular" />
                Todos os Artigos ({posts.length})
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="pt-40 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            {activeTab === 'create' ? (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Formulário */}
                <motion.div
                  className="lg:col-span-2"
                >
                  <div className="bg-white rounded-2xl shadow-elegant border border-border/30 p-8">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                      {editingPostId ? 'Editar Artigo' : 'Novo Artigo'}
                    </h2>
                    {editingPostId && (
                      <button
                        onClick={() => {
                          setEditingPostId(null);
                          setFormData(initialFormData);
                          setImagePreview('');
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground mb-6"
                      >
                        ← Voltar para criar novo
                      </button>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Título */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground block">
                          Título *
                        </label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Digite o título do artigo"
                          disabled={isLoading}
                          className="border-border/50"
                        />
                      </div>

                      {/* Resumo */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground block">
                          Resumo *
                        </label>
                        <Textarea
                          name="excerpt"
                          value={formData.excerpt}
                          onChange={handleInputChange}
                          placeholder="Digite um resumo breve do artigo"
                          disabled={isLoading}
                          rows={3}
                          className="border-border/50"
                        />
                      </div>

                      {/* Conteúdo */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground block">
                          Conteúdo *
                        </label>
                        <Textarea
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          placeholder="Digite o conteúdo completo do artigo (suporta HTML)"
                          disabled={isLoading}
                          rows={8}
                          className="border-border/50 font-mono text-xs"
                        />
                        <p className="text-xs text-muted-foreground">
                          Dica: Você pode usar HTML básico para formatar o conteúdo
                        </p>
                      </div>

                      {/* Upload de Imagem */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground block">
                          Imagem de Capa
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isLoading || isUploadingImage}
                          className="hidden"
                        />
                        
                        {!formData.image ? (
                          <motion.button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading || isUploadingImage}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full border-2 border-dashed border-border/50 rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {isUploadingImage ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full"
                                />
                                <span className="text-xs text-muted-foreground">Enviando...</span>
                              </>
                            ) : (
                              <>
                                <Upload size={20} weight="regular" className="text-primary" />
                                <div className="text-center">
                                  <p className="text-sm font-medium text-foreground">Clique para selecionar</p>
                                  <p className="text-xs text-muted-foreground">ou arraste uma imagem aqui</p>
                                </div>
                              </>
                            )}
                          </motion.button>
                        ) : (
                          <div className="space-y-3">
                            <div className="relative rounded-lg overflow-hidden border border-border/50 bg-muted">
                              <img 
                                src={imagePreview || formData.image} 
                                alt="Preview" 
                                className="w-full h-48 object-cover"
                              />
                              <motion.button
                                type="button"
                                onClick={handleRemoveImage}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                              >
                                <X size={16} weight="regular" />
                              </motion.button>
                            </div>
                            <motion.button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isLoading || isUploadingImage}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full border border-border/50 rounded-lg py-2 text-sm font-medium text-foreground hover:bg-primary/5 transition-all disabled:opacity-50"
                            >
                              Trocar imagem
                            </motion.button>
                          </div>
                        )}
                      </div>

                      {/* Botão Unsplash */}
                      {!formData.image && (
                        <motion.button
                          type="button"
                          onClick={() => setShowUnsplash(true)}
                          disabled={isLoading || isUploadingImage}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full border-2 border-dashed border-primary/50 rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Image size={20} weight="regular" className="text-primary" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-primary">Ou buscar no Unsplash</p>
                            <p className="text-xs text-muted-foreground">Milhões de imagens de alta qualidade</p>
                          </div>
                        </motion.button>
                      )}

                      {/* Grid 2x2 */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Categoria */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground block">
                            Categoria
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-border/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground text-sm bg-white"
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        {/* Cor */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground block">
                            Cor
                          </label>
                          <select
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-border/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground text-sm bg-white"
                          >
                            {colors.map(color => (
                              <option key={color} value={color}>
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Autor */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground block">
                            Autor
                          </label>
                          <Input
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="Nome do autor"
                            disabled={isLoading}
                            className="border-border/50"
                          />
                        </div>

                        {/* Data */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground block">
                            Data
                          </label>
                          <Input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className="border-border/50"
                          />
                        </div>
                      </div>

                      {/* Botão Submit */}
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary disabled:bg-muted text-primary-foreground font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-elegant disabled:shadow-none"
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Processando...</span>
                          </>
                        ) : (
                          <>
                            <Plus size={18} weight="regular" />
                            <span>{editingPostId ? 'Atualizar Artigo' : 'Publicar Artigo'}</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </motion.div>

                {/* Info Card */}
                <motion.div className="space-y-4">
                  <div className="bg-white rounded-2xl shadow-elegant border border-border/30 p-6">
                    <h3 className="text-lg font-bold text-primary mb-4">
                      Dicas Importantes
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-primary font-bold flex-shrink-0">•</span>
                        <span>Todos os campos com * são obrigatórios</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold flex-shrink-0">•</span>
                        <span>O resumo aparecerá na listagem do blog</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold flex-shrink-0">•</span>
                        <span>Use HTML básico no conteúdo para formatar</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold flex-shrink-0">•</span>
                        <span>Clique em "Editar" para redimensionar a imagem</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-primary/5 to-beige/5 rounded-2xl border border-primary/20 p-6">
                    <h3 className="text-lg font-bold text-primary mb-4">
                      Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total de artigos</span>
                        <span className="text-2xl font-bold text-primary">{posts.length}</span>
                      </div>
                      <div className="h-px bg-border/30" />
                      <div className="text-xs text-muted-foreground">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLoadingPosts ? (
                  <div className="flex justify-center items-center py-20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
                    />
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground mb-4">Nenhum artigo publicado ainda</p>
                    <motion.button
                      onClick={() => setActiveTab('create')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Plus size={18} weight="regular" />
                      Criar Primeiro Artigo
                    </motion.button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-elegant border border-border/30 overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        {/* Imagem */}
                        {post.image && (
                          <div className="relative w-full h-40 bg-muted overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-${post.color}-500`}>
                              {post.category}
                            </div>
                          </div>
                        )}

                        {/* Conteúdo */}
                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-bold text-foreground line-clamp-2 mb-1">
                              {post.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>Autor: <span className="font-medium">{post.author}</span></p>
                            <p>Data: <span className="font-medium">{new Date(`${post.date}T12:00:00Z`).toLocaleDateString('pt-BR')}</span></p>
                          </div>

                          {/* Ações */}
                          <div className="flex gap-2 pt-3 border-t border-border/30">
                            <motion.button
                              onClick={() => handleEditPost(post)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium text-sm transition-colors"
                            >
                              <PencilSimple size={14} weight="regular" />
                              Editar
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeletePost(post.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium text-sm transition-colors"
                            >
                              <Trash size={14} weight="regular" />
                              Deletar
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
