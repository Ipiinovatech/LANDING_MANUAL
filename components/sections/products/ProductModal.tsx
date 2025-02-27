"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { ProductHeader } from "./ProductHeader";
import { ProductContent } from "./ProductContent";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { language } = useLanguage();
  const [showImage, setShowImage] = useState(false);

  // Handle browser back button
  useEffect(() => {
    if (isOpen) {
      // Push a new state when modal opens
      window.history.pushState({ modal: true }, "");
    }

    // Handle popstate (back button)
    const handlePopState = (event: PopStateEvent) => {
      if (isOpen) {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

  const handleContactClick = () => {
    onClose();
    const event = new CustomEvent("openChatbot");
    window.dispatchEvent(event);
  };

  const handleBackToProducts = () => {
    onClose();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        // If modal is closing, go back in history
        if (window.history.state?.modal) {
          window.history.back();
        }
        onClose();
      }
    }}>
      <DialogContent 
        className="max-w-[95vw] w-[1400px] max-h-[95vh] p-0 overflow-hidden
                   bg-gradient-to-br from-gray-900 via-[#1a1f35] to-black
                   border border-white/10 shadow-2xl shadow-blue-500/10
                   backdrop-blur-xl rounded-2xl
                   transition-all duration-300 ease-in-out" 
        closeButton={false}
      >
        <ProductHeader 
          product={product} 
          onClose={onClose}
          onBack={handleBackToProducts}
          showImage={showImage}
          onToggleImage={() => setShowImage(!showImage)}
        />

        <ScrollArea 
          className="max-h-[calc(95vh-140px)] overflow-auto
                     scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 pointer-events-none" />
            
            <ProductContent
              product={product}
              showImage={showImage}
              onToggleImage={() => setShowImage(!showImage)}
              onContact={handleContactClick}
              language={language}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}