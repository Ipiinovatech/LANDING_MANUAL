"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageZoomProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  alt: string;
}

export function ImageZoom({ isOpen, onClose, image, alt }: ImageZoomProps) {
  // Check if the image is the organizational structure
  const isOrgStructure = image.includes('Estructura_Organizacional');
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className={`absolute -top-4 -right-4 p-2 rounded-full transition-colors z-50 
                ${isOrgStructure 
                  ? 'bg-[var(--primary-blue)] text-white hover:bg-[var(--accent-blue)]' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'}`}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={image}
                alt={alt}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}