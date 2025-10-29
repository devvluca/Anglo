/**
 * Componente de Debug da API Shopify
 * Use para debugar problemas de imagens e dados
 */

import { useEffect, useState } from 'react';
import { shopifyFetch } from '@/lib/shopify/config';

export function ShopifyDebugger() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        const query = `
          query GetProducts($first: Int!) {
            products(first: $first) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        title
                        availableForSale
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const data = await shopifyFetch<any>({
          query,
          variables: { first: 5 },
        });

        console.log('📦 Resposta da API:', data);
        
        if (data?.products?.edges) {
          setProducts(data.products.edges.map(e => e.node));
          setError(null);
        } else {
          setError('Nenhum produto retornado');
        }
      } catch (err) {
        console.error('❌ Erro:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-black text-white rounded-lg p-4 max-h-96 overflow-y-auto z-50 font-mono text-xs">
      <h3 className="font-bold mb-2 text-yellow-400">🔧 DEBUGGER SHOPIFY</h3>
      
      {error && (
        <div className="bg-red-600 p-2 rounded mb-2">
          <p className="font-bold">❌ Erro:</p>
          <p>{error}</p>
        </div>
      )}

      <div className="bg-gray-800 p-2 rounded mb-2">
        <p className="font-bold text-green-400">✅ Produtos carregados: {products.length}</p>
      </div>

      {products.length > 0 && (
        <div className="space-y-2">
          {products.map((product, idx) => (
            <div key={product.id} className="bg-gray-900 p-2 rounded border border-gray-700">
              <p className="font-bold text-blue-300">{idx + 1}. {product.title}</p>
              <p className="text-gray-400">Handle: <span className="text-cyan-300">{product.handle}</span></p>
              <p className="text-gray-400">ID: <span className="text-cyan-300">{product.id}</span></p>
              
              {product.images?.edges?.[0]?.node?.url ? (
                <div className="mt-1">
                  <p className="text-gray-400">Imagem: <span className="text-green-300">✓</span></p>
                  <p className="text-gray-500 break-all text-xs">
                    {product.images.edges[0].node.url.substring(0, 50)}...
                  </p>
                </div>
              ) : (
                <p className="text-red-400">Imagem: ✗ SEM URL</p>
              )}

              {product.variants?.edges?.[0]?.node ? (
                <p className="text-gray-400">Variante: <span className="text-green-300">✓ {product.variants.edges[0].node.id}</span></p>
              ) : (
                <p className="text-red-400">Variante: ✗ SEM VARIANTE</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-gray-700">
        <p className="text-gray-400">Abra o console (F12) para ver mais detalhes</p>
      </div>
    </div>
  );
}
