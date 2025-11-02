import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash, ArrowRight, Plus, Minus } from 'phosphor-react';
import { useCart } from '@/contexts/CartContext';

export function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, cartItemCount, removeFromCart, getCheckoutUrl, loading } = useCart();
  // Quantidade sempre sincronizada com Shopify
  const { updateQuantity } = useCart();

  const handleQuantityChange = async (lineId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateQuantity(lineId, newQuantity);
    }
  };

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      // Log para debug
      console.log('📤 Enviando para checkout:', {
        checkoutUrl,
        items: cart?.lines?.length,
        total: cart?.cost?.totalAmount?.amount
      });
      window.location.href = checkoutUrl;
    } else {
      console.warn('⚠️ Nenhuma URL de checkout disponível');
    }
  };

  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };


  return (
    <>
      {/* Botão do carrinho */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
        aria-label="Abrir carrinho"
      >
        <ShoppingCart size={20} className="text-foreground" weight="regular" />
        {cartItemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center text-center"
          >
            {cartItemCount > 9 ? '9+' : cartItemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Sidebar do carrinho - Full height on right side */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-background border-l border-border/30 z-50 flex flex-col shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Seu Carrinho</h2>
                  <p className="text-xs text-muted-foreground mt-1">{cartItemCount} {cartItemCount === 1 ? 'item' : 'itens'}</p>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-foreground" weight="regular" />
                </motion.button>
              </div>

              {/* Items - Scrollable */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {cart && cart.lines && cart.lines.length > 0 ? (
                  <div className="p-4 space-y-4">
                    {cart.lines.map((line, index) => {
                      const quantity = line.quantity;
                      return (
                        <motion.div
                          key={line.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex gap-3 p-3 border-b border-gray-200 last:border-b-0 transition-colors group items-center"
                        >
                          {/* Miniatura pequena do produto, sempre tenta pegar do array transformado, fallback seguro */}
                          <motion.div
                            className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0 border border-gray-200 flex items-start justify-center mr-2"
                            style={{ alignSelf: 'flex-start', marginTop: '2px' }}
                            whileHover={{ scale: 1.08 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                          >
                            {Array.isArray(line.merchandise.product?.images) && line.merchandise.product.images.length > 0 && line.merchandise.product.images[0]?.url ? (
                              <img
                                src={line.merchandise.product.images[0].url}
                                alt={line.merchandise.product?.title || 'Produto'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-muted-foreground mt-2" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="4" fill="#f3f3f3" />
                                <path d="M8 15L11 12L14 15L17 12" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="8.5" cy="9" r="1.5" fill="#bbb" />
                              </svg>
                            )}
                          </motion.div>

                          {/* Detalhes */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            <motion.a
                              href={`/produto/${line.merchandise.product?.handle || ''}`}
                              onClick={() => setIsOpen(false)}
                              className="font-medium text-sm text-foreground hover:text-primary transition-colors line-clamp-2"
                              whileHover={{ x: 4 }}
                            >
                              {line.merchandise.product?.title || 'Produto sem título'}
                            </motion.a>
                            {/* Só mostra variante se não for 'Default Title' */}
                            {line.merchandise.title && line.merchandise.title !== 'Default Title' && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {line.merchandise.title}
                              </p>
                            )}
                            {/* Quantity Controls - sempre sincronizado com Shopify */}
                            <div className="flex items-center gap-2 mt-3">
                              <motion.button
                                onClick={() => handleQuantityChange(line.id, quantity - 1)}
                                className="p-1 hover:bg-primary/20 rounded transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={loading || quantity <= 1}
                              >
                                <Minus size={14} className="text-foreground" weight="bold" />
                              </motion.button>
                              <motion.input
                                type="number"
                                value={quantity}
                                min={1}
                                onChange={(e) => handleQuantityChange(line.id, parseInt(e.target.value) || 1)}
                                className="w-8 text-center bg-white border border-gray-300 rounded text-sm text-foreground font-medium [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&]:[-moz-appearance:textfield]"
                                whileFocus={{ scale: 1.05 }}
                                disabled={loading}
                              />
                              <motion.button
                                onClick={() => handleQuantityChange(line.id, quantity + 1)}
                                className="p-1 hover:bg-primary/20 rounded transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={loading}
                              >
                                <Plus size={14} className="text-foreground" weight="bold" />
                              </motion.button>
                              <span className="text-xs text-muted-foreground ml-auto">Quantidade</span>
                            </div>
                            {/* Price and Remove */}
                            <div className="flex items-center justify-between mt-3 pt-3">
                              <p className="font-semibold text-primary">
                                {formatPrice((parseFloat(line.merchandise.price.amount) * quantity).toString())}
                              </p>
                              <motion.button
                                onClick={() => removeFromCart(line.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                className="p-2 hover:bg-rose/20 rounded transition-colors text-muted-foreground hover:text-rose"
                              >
                                <Trash size={16} weight="regular" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ShoppingCart size={48} weight="light" className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">Seu carrinho está vazio</p>
                    <p className="text-xs text-muted-foreground mt-2">Adicione produtos para continuar</p>
                  </div>
                )}
              </div>

              {/* Footer com total e checkout */}
              {cart && cart.lines && cart.lines.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4 bg-white">
                  <div className="space-y-3">
                    <motion.div 
                      className="flex justify-between items-center text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-muted-foreground">Subtotal:</span>
                      <motion.span 
                        className="text-foreground font-medium"
                        key={cart.lines.length}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      >
                        {cart.lines.reduce((total, line) => {
                          const quantity = line.quantity;
                          const lineTotal = parseFloat(line.merchandise.price.amount) * quantity;
                          return total + lineTotal;
                        }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </motion.span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center border-t border-gray-200 pt-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="font-semibold text-foreground">Total:</span>
                      <motion.span 
                        className="text-2xl font-bold text-primary"
                        key={cart.lines.length}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      >
                        {cart.lines.reduce((total, line) => {
                          const quantity = line.quantity;
                          const lineTotal = parseFloat(line.merchandise.price.amount) * quantity;
                          return total + lineTotal;
                        }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </motion.span>
                    </motion.div>
                  </div>
                  <motion.button
                    onClick={handleCheckout}
                    disabled={loading}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary disabled:bg-muted text-primary-foreground font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    <motion.span
                      animate={loading ? { opacity: 0.6 } : { opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {loading ? 'Processando...' : 'Ir para Checkout'}
                    </motion.span>
                    <motion.div
                      animate={loading ? { x: -5 } : { x: 0 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    >
                      <ArrowRight size={18} weight="regular" />
                    </motion.div>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
