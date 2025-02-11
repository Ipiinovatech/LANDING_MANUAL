"use client";

import { X, ArrowLeft, ImageIcon, ImageOff } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductHeaderProps {
  product: Product;
  onClose: () => void;
  onBack: () => void;
  showImage: boolean;
  onToggleImage: () => void;
}

export function ProductHeader({ 
  product, 
  onClose, 
  onBack,
  showImage,
  onToggleImage
}: ProductHeaderProps) {
  const { language } = useLanguage();

  const handleImageClick = () => {
    // Only handle click on mobile
    if (window.innerWidth < 640) {
      onToggleImage();
    }
  };

  return (
    <div className="relative p-10 border-b border-white/10 bg-gradient-to-r from-black via-[#1a1f35] to-black">
      <div className="absolute left-8 top-8">
        <button
          onClick={onBack}
          className="p-3 rounded-full 
                     bg-white/5 hover:bg-white/10 
                     transition-all duration-300 ease-in-out
                     hover:scale-105 active:scale-95"
          aria-label="Back to products"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
      </div>
      
      <button
        onClick={onClose}
        className="absolute right-8 top-8 p-3 rounded-full 
                   bg-white/5 hover:bg-white/10 
                   transition-all duration-300 ease-in-out
                   hover:scale-105 active:scale-95"
      >
        <X className="h-5 w-5 text-white" />
      </button>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
        <div 
          onClick={handleImageClick}
          className="w-20 h-20 rounded-xl bg-gradient-to-br from-[var(--primary-blue)] via-[var(--accent-blue)] to-blue-400 p-[2px] flex-shrink-0
                    shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow duration-300
                    sm:cursor-default cursor-pointer"
        >
          <div className="w-full h-full rounded-xl overflow-hidden bg-black">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white line-clamp-2">
              {product.title}
            </h2>
            
            {/* Hide button on mobile with hidden class */}
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleImage}
              className="hidden sm:inline-flex bg-white/5 hover:bg-white/10 text-white border-white/10
                       transition-all duration-300 hover:scale-105 active:scale-95
                       sm:ml-4 self-start sm:self-center whitespace-nowrap"
            >
              {showImage ? (
                <>
                  <ImageOff className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">
                    {language === "es" ? "Ocultar imagen" : "Hide image"}
                  </span>
                </>
              ) : (
                <>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">
                    {language === "es" ? "Mostrar imagen" : "Show image"}
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}