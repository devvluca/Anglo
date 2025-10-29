/**
 * Transformadores para converter respostas da API Shopify
 * de formato edges/node para arrays simples
 */

/**
 * Transforma array de edges/node em array simples
 */
export function transformEdgesToArray<T>(edges: any[] | undefined): T[] {
  if (!edges || !Array.isArray(edges)) {
    return [];
  }
  return edges.map((edge: any) => edge.node);
}

/**
 * Transforma um objeto com edges em objeto com array simples
 */
export function transformConnectionToArray<T>(connection: any): T[] {
  if (!connection || !connection.edges) {
    return [];
  }
  return transformEdgesToArray<T>(connection.edges);
}

/**
 * Transforma um produto retornado pela API
 */
export function transformProduct(rawProduct: any) {
  return {
    ...rawProduct,
    images: transformEdgesToArray(rawProduct.images?.edges),
    variants: transformEdgesToArray(rawProduct.variants?.edges),
  };
}

/**
 * Transforma múltiplos produtos
 */
export function transformProducts(rawProducts: any[]) {
  return rawProducts.map(transformProduct);
}

/**
 * Transforma um carrinho retornado pela API
 */
export function transformCart(rawCart: any) {
  return {
    ...rawCart,
    lines: transformEdgesToArray(rawCart.lines?.edges).map((line: any) => {
      // Garante que merchandise.product seja transformado corretamente
      if (line.merchandise && line.merchandise.product) {
        return {
          ...line,
          merchandise: {
            ...line.merchandise,
            product: line.merchandise.product.images
              ? {
                  ...line.merchandise.product,
                  images: transformEdgesToArray(line.merchandise.product.images?.edges),
                }
              : line.merchandise.product,
          },
        };
      }
      return line;
    }),
  };
}

/**
 * Transforma resultados de busca
 */
export function transformSearchResults(rawResults: any[]) {
  return rawResults.map((item: any) => {
    // Se é um produto
    if (item.product) {
      return transformProduct(item);
    }
    return transformProduct(item);
  });
}
