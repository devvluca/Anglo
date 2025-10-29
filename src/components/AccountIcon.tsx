import { motion } from 'framer-motion';
import { User } from 'phosphor-react';

export function AccountIcon() {
  const handleLogin = () => {
    const storeUrl = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
    window.location.href = `https://${storeUrl}/account/login`;
  };

  return (
    <motion.button
      onClick={handleLogin}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 hover:bg-secondary/30 rounded-full transition-all duration-300"
      aria-label="Conta do usuário"
    >
      <User size={20} className="text-foreground" weight="regular" />
    </motion.button>
  );
}
