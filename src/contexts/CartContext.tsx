import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { shopifyFetch } from '@/lib/shopify/config';
import { transformCart } from '@/lib/shopify/transformers';
import {
  CREATE_CART_QUERY,
  ADD_TO_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION,
  GET_CART_QUERY,
} from '@/lib/shopify/queries';
import type { ShopifyCart, CartItem } from '@/lib/shopify/types';

export interface CartContextType {
  cart: ShopifyCart | null;
  loading: boolean;
  error: Error | null;
  cartItemCount: number;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  getCheckoutUrl: () => string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Inicializar carrinho ao montar o componente
  useEffect(() => {
    const initializeCart = async () => {
      try {
        const cartId = localStorage.getItem('shopify_cart_id');

        if (cartId) {
          // Buscar carrinho existente
          const data = await shopifyFetch<any>({
            query: GET_CART_QUERY,
            variables: { cartId },
          });
          const transformedCart = transformCart(data.cart);
          setCart(transformedCart);
        } else {
          // Criar novo carrinho
          const data = await shopifyFetch<any>({
            query: CREATE_CART_QUERY,
          });
          const transformedCart = transformCart(data.cartCreate.cart);
          localStorage.setItem('shopify_cart_id', transformedCart.id);
          setCart(transformedCart);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize cart'));
      }
    };

    initializeCart();
  }, []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number) => {
      if (!cart) return;

      setLoading(true);
      setError(null);

      try {
        const data = await shopifyFetch<any>({
          query: ADD_TO_CART_MUTATION,
          variables: {
            cartId: cart.id,
            lines: [
              {
                merchandiseId: variantId,
                quantity,
              },
            ],
          },
        });

        const transformedCart = transformCart(data.cartLinesAdd.cart);
        setCart(transformedCart);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to add to cart');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cart) return;

      setLoading(true);
      setError(null);

      try {
        const data = await shopifyFetch<any>({
          query: REMOVE_FROM_CART_MUTATION,
          variables: {
            cartId: cart.id,
            lineIds: [lineId],
          },
        });

        const transformedCart = transformCart(data.cartLinesRemove.cart);
        setCart(transformedCart);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to remove from cart');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;

      setLoading(true);
      setError(null);

      try {
        const data = await shopifyFetch<any>({
          query: UPDATE_CART_MUTATION,
          variables: {
            cartId: cart.id,
            lines: [
              {
                id: lineId,
                quantity,
              },
            ],
          },
        });

        const transformedCart = transformCart(data.cartLinesUpdate.cart);
        setCart(transformedCart);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update quantity');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const clearCart = useCallback(() => {
    setCart(null);
    localStorage.removeItem('shopify_cart_id');
  }, []);

  const getCheckoutUrl = useCallback(() => {
    return cart?.checkoutUrl || null;
  }, [cart]);

  const cartItemCount = 
    cart && Array.isArray(cart.lines)
      ? cart.lines.reduce((sum, line) => sum + line.quantity, 0)
      : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        cartItemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCheckoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
