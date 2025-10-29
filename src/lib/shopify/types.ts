/**
 * Types para Shopify Storefront API
 */

export interface ShopifyImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  quantityAvailable?: number;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: ShopifyImage[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  variants: ShopifyProductVariant[];
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: ShopifyProductVariant & {
    product: Omit<ShopifyProduct, 'description' | 'priceRange'>;
  };
}

export interface ShopifyCart {
  id: string;
  lines: ShopifyCartLine[];
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
  };
  checkoutUrl: string;
}

export interface CartItem {
  variantId: string;
  quantity: number;
}

export interface SearchResult {
  products: ShopifyProduct[];
}
