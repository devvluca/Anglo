import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeSlash, WarningCircle, ArrowLeft } from 'phosphor-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const isValid = await login(password);
      if (isValid) {
        navigate('/admin/panel');
      } else {
        setError('Senha incorreta');
        setPassword('');
      }
    } catch (err) {
      setError('Erro ao autenticar. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-elegant">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft size={18} weight="regular" className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Voltar</span>
            </motion.button>
            <img
              src="/horizontal_navbar.png"
              alt="Logo Editora Anglo"
              className="w-40 h-auto object-contain"
            />
            <div className="w-16" />
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-elegant border border-border/30 p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 20, stiffness: 300 }}
                className="mb-6 flex justify-center"
              >
                <img
                  src="/logo_principal.png"
                  alt="Logo Anglo"
                  className="h-20 w-auto object-contain"
                />
              </motion.div>
              <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                Painel Admin
              </h1>
              <p className="text-muted-foreground text-sm font-medium">
                Área restrita para administradores
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Erro */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3"
                >
                  <WarningCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" weight="regular" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Campo de Senha */}
              <div className="space-y-3">
                <label htmlFor="password" className="text-sm font-medium text-foreground block">
                  Senha de Acesso
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple/10 to-beige/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
                      disabled={isLoading}
                      autoFocus
                      className="w-full px-4 py-3 pr-12 border border-border/50 bg-white text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-4 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                    >
                      {showPassword ? (
                        <EyeSlash size={18} weight="regular" />
                      ) : (
                        <Eye size={18} weight="regular" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Botão Submit */}
              <motion.button
                type="submit"
                disabled={isLoading || !password.trim()}
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
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <span>Entrar no Painel</span>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-muted-foreground">Informações</span>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3 text-xs text-muted-foreground">
              <p className="flex gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Área administrativa protegida da Editora Anglo</span>
              </p>
              <p className="flex gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Acesso restrito apenas para administradores autorizados</span>
              </p>
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Voltar à página inicial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
