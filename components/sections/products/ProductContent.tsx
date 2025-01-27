"use client";

import { motion } from "framer-motion";
import { ImageIcon, ImageOff, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./VideoPlayer";
import { DemoButton } from "./DemoButton";
import { Product } from "@/types/product";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductContentProps {
  product: Product;
  showImage: boolean;
  onToggleImage: () => void;
  onContact: () => void;
  language: string;
}

export function ProductContent({ 
  product, 
  showImage, 
  onToggleImage, 
  onContact,
  language 
}: ProductContentProps) {
  return (
    <div className="p-4 sm:p-8 space-y-4 sm:space-y-8">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleImage}
          className="bg-white/5 hover:bg-white/10 text-white border-white/10"
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

      {showImage && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full overflow-hidden rounded-xl"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover rounded-xl"
          />
        </motion.div>
      )}

      {product.videoUrl && (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
            {language === "es" ? "Video Explicativo" : "Explanatory Video"}
          </h3>
          <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden
                        shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 
                        transition-all duration-300">
            <VideoPlayer videoUrl={product.videoUrl} title={product.title} />
          </div>
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-500px)] sm:h-auto pr-4">
        <div className="space-y-4 sm:space-y-6 max-w-[80ch] mx-auto">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 mt-4 sm:mt-6 mb-2 sm:mb-3">{children}</h3>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-gray-300">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300 text-sm sm:text-base">{children}</li>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">{children}</p>
                ),
              }}
            >
              {product.description}
            </ReactMarkdown>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {product.demoUrl && (
              <DemoButton demoUrl={product.demoUrl} className="w-full sm:w-auto" />
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full
                       bg-gradient-to-r from-[var(--primary-blue)] via-[var(--accent-blue)] to-blue-400
                       text-white text-sm sm:text-base font-medium 
                       shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                       transition-all duration-300"
            >
              {language === "es" ? "Contactar" : "Contact Us"}
              <ExternalLink className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}