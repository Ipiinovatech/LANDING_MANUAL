"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { ProductList } from "./products/ProductList";
import { ProductFilters } from "./products/ProductFilters";
import { useProducts } from "@/hooks/useProducts";

export function ProductsSection() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'varios' | 'todos'>('todos');
  const { products } = useProducts();

  const filteredProducts = products.filter(product => {
    if (filter === 'todos') return true;
    if (filter === 'all') return !product.isVarios;
    if (filter === 'varios') return product.isVarios;
    return true;
  });

  return (
    <section id="products" className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EEF2FF] via-[#F8FAFC] to-[#EEF2FF] opacity-95" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 pt-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] bg-clip-text text-transparent">
            {language === "es" ? "Nuestros Productos" : "Our Products"}
          </h2>
          <p className="text-2xl font-medium text-gray-700 max-w-3xl mx-auto mb-12">
            {language === "es"
              ? "Soluciones innovadoras impulsadas por IA para transformar su negocio"
              : "Innovative AI-driven solutions to transform your business"}
          </p>

          <ProductFilters 
            currentFilter={filter} 
            onFilterChange={setFilter} 
          />
        </motion.div>

        <ProductList products={filteredProducts} />
      </div>
    </section>
  );
}