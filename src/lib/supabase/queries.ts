import { supabase } from './config';
import type { BlogPost, BlogCategory } from './types';

/**
 * Busca todos os artigos publicados do blog
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar posts do blog:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca um artigo específico pelo slug
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Erro ao buscar post do blog:', error);
    return null;
  }

  return data;
}

/**
 * Busca artigos por categoria
 */
export async function fetchBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar posts por categoria:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca todas as categorias
 */
export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }

  return data || [];
}

/**
 * Busca artigos com filtro de texto
 */
export async function searchBlogPosts(searchTerm: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }

  return data || [];
}
