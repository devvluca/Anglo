// Configuração do Unsplash API
// Você precisa criar uma conta em https://unsplash.com/developers
// e gerar uma Access Key

export const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

export const unsplashAPI = {
  baseUrl: 'https://api.unsplash.com',
  
  // Buscar imagens
  async searchImages(query: string, page = 1, perPage = 20) {
    if (!UNSPLASH_ACCESS_KEY) {
      console.error('VITE_UNSPLASH_ACCESS_KEY não configurada');
      return { results: [], total: 0, total_pages: 0 };
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
      );

      if (!response.ok) {
        console.error('Erro ao buscar imagens do Unsplash:', response.statusText);
        return { results: [], total: 0, total_pages: 0 };
      }

      const data = await response.json();
      return {
        results: data.results.map((img: any) => ({
          id: img.id,
          url: img.urls.regular,
          thumb: img.urls.thumb,
          title: img.alt_description || 'Sem descrição',
          author: img.user.name,
          authorUrl: img.user.links.html,
          photoUrl: img.links.html,
        })),
        total: data.total,
        total_pages: data.total_pages,
      };
    } catch (error) {
      console.error('Erro na requisição do Unsplash:', error);
      return { results: [], total: 0, total_pages: 0 };
    }
  },

  // Buscar imagens aleatórias
  async getRandomImages(count = 20, query?: string) {
    if (!UNSPLASH_ACCESS_KEY) {
      console.error('VITE_UNSPLASH_ACCESS_KEY não configurada');
      return [];
    }

    try {
      const url = query
        ? `${this.baseUrl}/search/photos?query=${encodeURIComponent(query)}&count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
        : `${this.baseUrl}/photos/random?count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        console.error('Erro ao buscar imagens aleatórias:', response.statusText);
        return [];
      }

      const data = await response.json();
      const images = query ? data.results : data;

      return (Array.isArray(images) ? images : [images]).map((img: any) => ({
        id: img.id,
        url: img.urls.regular,
        thumb: img.urls.thumb,
        title: img.alt_description || 'Sem descrição',
        author: img.user.name,
        authorUrl: img.user.links.html,
        photoUrl: img.links.html,
      }));
    } catch (error) {
      console.error('Erro na requisição do Unsplash:', error);
      return [];
    }
  },
};
