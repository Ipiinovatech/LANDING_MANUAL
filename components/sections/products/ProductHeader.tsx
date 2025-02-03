"use client";

import { X, ArrowLeft } from "lucide-react";
import { Product } from "@/types/product";

interface ProductHeaderProps {
  product: Product;
  onClose: () => void;
}

export function ProductHeader({ product, onClose }: ProductHeaderProps) {
  const isSpecialProduct = product.title === "MulticonnectAI" || product.title === "MultimediaAI";

  return (
    <div className="relative p-10 border-b border-white/10 bg-gradient-to-r from-black via-[#1a1f35] to-black">
      <div className="flex items-center gap-2">
        <button
          onClick={onClose}
          className="p-3 rounded-full 
                   bg-white/5 hover:bg-white/10 
                   transition-all duration-300 ease-in-out
                   hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={onClose}
          className="absolute right-8 top-8 p-3 rounded-full 
                   bg-white/5 hover:bg-white/10 
                   transition-all duration-300 ease-in-out
                   hover:scale-105 active:scale-95"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="flex items-center gap-8 mt-4">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[var(--primary-blue)] via-[var(--accent-blue)] to-blue-400 p-[2px] flex-shrink-0
                      shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow duration-300">
          <div className="w-full h-full rounded-xl overflow-hidden bg-black">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <h2 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white
                        ${isSpecialProduct ? 'text-[clamp(1.5rem,4vw,2.5rem)] leading-tight break-words max-w-[calc(100%-120px)]' : ''}`}>
          {product.title}
        </h2>
      </div>
    </div>
  );
}