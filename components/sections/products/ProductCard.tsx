"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play, Video } from "lucide-react";
import { useState } from "react";
import { ProductModal } from "./ProductModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/product";

interface ProductCardProps extends Product {
  index: number;
}

export function ProductCard({
  index,
  ...product
}: ProductCardProps) {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImageFromClick, setShowImageFromClick] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageClick = () => {
    if (window.innerWidth < 640) {
      setShowImageFromClick(true);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowImageFromClick(false);
  };

  // Determine if we need special handling for mobile
  const needsSpecialHandling = [
    "TestQAI",
    "¡Pa Ya!"
  ].includes(product.title);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group h-full"
      >
        <Card className="relative h-full bg-gradient-to-br from-gray-900/90 to-black border-gray-800 hover:border-[var(--primary-blue)] transition-all duration-500 overflow-hidden">
          {/* Image Header */}
          <div 
            className="relative h-48 overflow-hidden cursor-pointer sm:cursor-default"
            onClick={handleImageClick}
          >
            {/* Loading placeholder */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}

            {product.image && (
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-full transition-all duration-500 
                    ${needsSpecialHandling 
                      ? 'sm:object-cover max-sm:object-contain max-sm:bg-gradient-to-br max-sm:from-gray-100 max-sm:to-gray-200 max-sm:p-4'
                      : 'object-cover'
                    } 
                    ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsImageLoaded(true)}
                  loading="lazy"
                />
              </div>
            )}
            
            <div className={`absolute inset-0 bg-gradient-to-b ${
              needsSpecialHandling 
                ? 'sm:from-transparent sm:to-black/60 max-sm:from-transparent max-sm:to-black/40'
                : 'from-transparent to-black/60'
            }`} />
            
            {/* Video & Demo Indicators */}
            <div className="absolute top-4 right-4 flex gap-2">
              {product.videoUrl && (
                <div className="bg-black/60 p-2 rounded-full">
                  <Video className="h-4 w-4 text-white" />
                </div>
              )}
              {product.demoUrl && (
                <div className="bg-emerald-500/80 p-2 rounded-full">
                  <Play className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-3 
                         group-hover:text-[var(--accent-blue)] transition-colors duration-300 
                         line-clamp-2 min-h-[3rem]
                         break-words hyphens-auto">
              {product.title}
            </h3>

            <p className="text-sm text-gray-400 line-clamp-4 mb-6">
              {product.description}
            </p>

            <button 
              onClick={() => {
                setShowImageFromClick(false);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center text-[var(--primary-blue)] hover:text-[var(--accent-blue)] transition-colors duration-300 group/btn"
            >
              <span className="mr-2">
                {language === "es" ? "Saber más" : "Learn more"}
              </span>
              <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </Card>
      </motion.div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={product}
        showImageOnMobile={showImageFromClick}
      />
    </>
  );
}