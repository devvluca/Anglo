/**
 * Shopify Storefront API Configuration
 */

export const SHOPIFY_CONFIG = {
  STORE_DOMAIN: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'nwrgu5-5i.myshopify.com',
  STOREFRONT_ACCESS_TOKEN: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '5de003a3c06c6dde686ba4b9e974ab63',
  API_VERSION: import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10',
  get GRAPHQL_ENDPOINT() {
    return `https://${this.STORE_DOMAIN}/api/${this.API_VERSION}/graphql.json`;
  },
};

export const SHOPIFY_HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.STOREFRONT_ACCESS_TOKEN,
};

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  try {
    const response = await fetch(SHOPIFY_CONFIG.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: SHOPIFY_HEADERS,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const responseData = await response.json();

    const { data, errors } = responseData;

    if (errors && errors.length > 0) {
      console.error('❌ GraphQL errors:', errors);
      throw new Error(errors[0].message || 'GraphQL error');
    }

    return data as T;
  } catch (error) {
    console.error('❌ Shopify fetch error:', error);
    throw error;
  }
}

import { GET_PRODUCT_BY_HANDLE_QUERY } from './queries';

export async function getProductByHandle(handle: string) {
  try {
    const data = await shopifyFetch<{
      product: any;
    }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    return data.product;
  } catch (error) {
    console.error('❌ Error fetching product by handle:', error);
    return null;
  }
}
