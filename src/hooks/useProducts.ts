import { useState, useCallback, useEffect } from 'react';
import { shopifyFetch } from '@/lib/shopify/config';
import { GET_PRODUCTS_QUERY } from '@/lib/shopify/queries';
import { transformProducts } from '@/lib/shopify/transformers';
import type { ShopifyProduct } from '@/lib/shopify/types';

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
      cursor: string;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export function useProducts(initialLimit: number = 12) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const fetchProducts = useCallback(
    async (limit: number = initialLimit, after?: string) => {
      setLoading(true);
      setError(null);

      try {
        const data = await shopifyFetch<ProductsResponse>({
          query: GET_PRODUCTS_QUERY,
          variables: {
            first: limit,
            after: after || null,
          },
        });

        const productEdges = data.products.edges;
        const newProducts = transformProducts(productEdges.map(edge => edge.node));

        if (after) {
          setProducts(prev => [...prev, ...newProducts]);
        } else {
          setProducts(newProducts);
        }

        setHasNextPage(data.products.pageInfo.hasNextPage);
        setEndCursor(data.products.pageInfo.endCursor);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch products');
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [initialLimit]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && endCursor) {
      fetchProducts(initialLimit, endCursor);
    }
  }, [hasNextPage, endCursor, fetchProducts, initialLimit]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    hasNextPage,
    loadMore,
    refetch: fetchProducts,
  };
}
