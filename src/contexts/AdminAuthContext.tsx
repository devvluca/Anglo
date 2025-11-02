import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/config';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se já está autenticado ao carregar
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin_authenticated_anglo_2025') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      // Busca as senhas ativas do banco de dados
      const { data, error } = await supabase
        .from('admin_passwords')
        .select('password')
        .eq('is_active', true);

      if (error) {
        console.error('Erro ao buscar senhas:', error);
        return false;
      }

      // Verifica se a senha fornecida está entre as senhas ativas
      if (data && data.length > 0) {
        const senhaCorreta = data.some(item => item.password === password);
        
        if (senhaCorreta) {
          localStorage.setItem('adminToken', 'admin_authenticated_anglo_2025');
          setIsAuthenticated(true);
          return true;
        }
      }

      return false;
    } catch (err) {
      console.error('Erro na autenticação:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
