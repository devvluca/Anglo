import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getProductByHandle } from '@/lib/shopify/config';

interface ProductPreviewProps {
  handle: string;
}

export function ProductPreview({ handle }: ProductPreviewProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const prod = await getProductByHandle(handle);
      setProduct(prod);
      setLoading(false);
    };
    fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-block mx-1 my-1 p-2 bg-white border border-gray-200 rounded-md shadow-sm max-w-[120px]"
      >
        <div className="animate-pulse">
          <div className="w-full h-16 bg-gray-200 rounded mb-1"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
      </motion.div>
    );
  }

  if (!product) {
    return null;
  }

  const image = product.images?.edges?.[0]?.node;

  return (
    <motion.a
      href={`/produto/${handle}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="inline-block mx-1 my-1 p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow max-w-[120px] cursor-pointer"
    >
      {image && (
        <img
          src={image.url}
          alt={image.altText || product.title}
          className="w-full h-16 object-cover rounded mb-1"
        />
      )}
      <h4 className="font-medium text-xs text-gray-900 line-clamp-2 leading-tight">
        {product.title}
      </h4>
    </motion.a>
  );
}