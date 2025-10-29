import { useState, useCallback } from 'react';
import { shopifyFetch } from '@/lib/shopify/config';
import { SEARCH_PRODUCTS_QUERY } from '@/lib/shopify/queries';
import { transformProducts } from '@/lib/shopify/transformers';
import type { ShopifyProduct } from '@/lib/shopify/types';

interface SearchResponse {
  search: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export function useSearch() {
  const [searchResults, setSearchResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState('');

  const search = useCallback(async (searchQuery: string, limit: number = 10) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setQuery('');
      return;
    }

    setLoading(true);
    setError(null);
    setQuery(searchQuery);

    try {
      const data = await shopifyFetch<SearchResponse>({
        query: SEARCH_PRODUCTS_QUERY,
        variables: {
          query: searchQuery,
          first: limit,
        },
      });

      const products = transformProducts((data.search.edges as any[]).map((edge: any) => edge.node));

      setSearchResults(products);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to search products');
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setQuery('');
    setError(null);
  }, []);

  return {
    searchResults,
    loading,
    error,
    query,
    search,
    clearSearch,
  };
}
