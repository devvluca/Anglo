import { useState, useEffect } from 'react';
import { fetchBlogPosts, fetchBlogCategories } from '@/lib/supabase/queries';
import type { BlogPost, BlogCategory } from '@/lib/supabase/types';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        console.log('🔄 Iniciando carregamento de posts...');
        
        const [postsData, categoriesData] = await Promise.all([
          fetchBlogPosts(),
          fetchBlogCategories()
        ]);
        
        console.log('📊 Posts carregados:', postsData.length);
        console.log('📋 Categorias carregadas:', categoriesData.length);
        console.log('📌 Dados dos posts:', postsData);
        
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('❌ Erro ao carregar dados do blog:', err);
        setError('Erro ao carregar os artigos');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { posts, categories, loading, error };
}
