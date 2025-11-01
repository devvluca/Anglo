export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  color: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}
