"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.title}
          {...product}
          index={index}
        />
      ))}
    </motion.div>
  );
}