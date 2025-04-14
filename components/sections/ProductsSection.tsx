"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { ProductList } from "./products/ProductList";
import { ProductFilters } from "./products/ProductFilters";
import { useProducts } from "@/hooks/useProducts";
import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

export function ProductsSection() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'varios' | 'todos'>('todos');
  const { products } = useProducts();
  const { width } = useWindowSize();
  const isMobile = width ? width < 640 : false;
  const [showDescription, setShowDescription] = useState(false);

  const handleImageClick = () => {
    if (isMobile) {
      setShowDescription(!showDescription);
    }
  };

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

          {/* AI Connect Section */}
          <div className="max-w-4xl mx-auto px-6 space-y-8 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleImageClick}
              className="inline-block cursor-pointer relative px-4"
            >
              <Image
                src="/Images/Nosotros_Eng/AICONNECT.png"
                alt="AI Connect"
                width={400}
                height={100}
                className="object-contain w-auto h-auto max-w-[90%] sm:max-w-[400px] mx-auto"
                priority
              />
              {isMobile && (
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  {language === "es" 
                    ? (showDescription ? "Clic para ocultar" : "Clic para más información")
                    : (showDescription ? "Click to hide" : "Click for more information")}
                </p>
              )}
            </motion.div>

            <AnimatePresence>
              {(!isMobile || showDescription) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-gray-700 text-justify space-y-4 sm:space-y-6">
                    {language === "es" ? (
                      <>
                        <p className="text-sm sm:text-base leading-relaxed">
                          En un mundo donde la tecnología avanza a una velocidad sin precedentes, la Inteligencia Artificial se ha convertido en el pilar fundamental de la innovación y el crecimiento empresarial.
                          <Image
                            src="/Images/Nosotros_Eng/AICONNECT AZUL.png"
                            alt="AI Connect Logo"
                            width={100}
                            height={25}
                            className="inline-block mx-2 align-middle w-[80px] sm:w-[100px]"
                          />
                          es la plataforma multiservicios de IA diseñada para transformar negocios, optimizar procesos y potenciar la competitividad.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed">
                          Con un enfoque AI-as-a-Service (AaaS), brindamos acceso inmediato a potentes herramientas de IA sin costosos desarrollos internos, permitiendo a cualquier empresa integrar soluciones inteligentes en tiempo real.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed">
                          Desde automatización y análisis avanzado hasta generación de contenido y seguridad con IA,
                          <Image
                            src="/Images/Nosotros_Eng/AICONNECT AZUL.png"
                            alt="AI Connect Logo"
                            width={100}
                            height={25}
                            className="inline-block mx-2 align-middle w-[80px] sm:w-[100px]"
                          />
                          es la clave para desbloquear nuevas oportunidades y garantizar el éxito futuro.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm sm:text-base leading-relaxed">
                          In a world of rapid technological advancement, AI has become the cornerstone of innovation and business growth.
                          <Image
                            src="/Images/Nosotros_Eng/AICONNECT AZUL.png"
                            alt="AI Connect Logo"
                            width={100}
                            height={25}
                            className="inline-block mx-2 align-middle w-[80px] sm:w-[100px]"
                          />
                          is the AI multiservice platform designed to transform businesses and enhance competitiveness.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed">
                          With our AI-as-a-Service (AaaS) approach, we provide immediate access to powerful AI tools without costly internal development, enabling any company to integrate intelligent solutions in real-time.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed">
                          From automation and analytics to content generation and security,
                          <Image
                            src="/Images/Nosotros_Eng/AICONNECT AZUL.png"
                            alt="AI Connect Logo"
                            width={100}
                            height={25}
                            className="inline-block mx-2 align-middle w-[80px] sm:w-[100px]"
                          />
                          is your key to unlocking new opportunities and ensuring future success.
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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