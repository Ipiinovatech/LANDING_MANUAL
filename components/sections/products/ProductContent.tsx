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
  const isMulticonnect = product.title === "MulticonnectAI";

  const handleContactClick = () => {
    // 1. Cierra el modal (si es necesario)
    onContact();
    
    // 2. Desplázate a la sección de contacto
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 3. Abre el asistente virtual después de un pequeño retraso para permitir la animación de scroll
    setTimeout(() => {
      const event = new CustomEvent("openChatbot");
      window.dispatchEvent(event);
    }, 500); // Retraso de 500ms para que el scroll termine antes de abrir el asistente
  };

  return (
    <div className="p-3 sm:p-8 space-y-4 sm:space-y-8">
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
        <div className="space-y-3 sm:space-y-4 flex flex-col items-center">
          <h3 className={`font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white
                         ${isMulticonnect ? 'text-lg sm:text-2xl' : 'text-lg sm:text-xl'}`}>
            {language === "es" ? "Video Explicativo" : "Explanatory Video"}
          </h3>
          <div className="w-full rounded-xl overflow-hidden shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
            <VideoPlayer videoUrl={product.videoUrl} title={product.title} />
          </div>
        </div>
      )}

      <ScrollArea className={`pr-4 ${isMulticonnect ? 'h-auto max-h-[50vh] sm:max-h-none' : 'h-[calc(100vh-500px)] sm:h-auto'}`}>
        <div className="space-y-4 sm:space-y-6 max-w-[80ch] mx-auto">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h3: ({ children }) => (
                  <h3 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 
                                 mt-3 sm:mt-6 mb-2 sm:mb-3 text-center
                                 ${isMulticonnect ? 'text-lg sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                    {children}
                  </h3>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-gray-300">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className={`text-gray-300 ${isMulticonnect ? 'text-sm sm:text-lg' : 'text-sm sm:text-base'}`}>
                    {children}
                  </li>
                ),
                p: ({ children }) => (
                  <p className={`text-gray-300 leading-relaxed mb-3 sm:mb-4 text-center
                                ${isMulticonnect ? 'text-sm sm:text-lg' : 'text-sm sm:text-base'}`}>
                    {children}
                  </p>
                ),
              }}
            >
              {product.description}
            </ReactMarkdown>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            {product.demoUrl && (
              <DemoButton demoUrl={product.demoUrl} className="w-full sm:w-auto" />
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContactClick}  // Usa la función handleContactClick
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 
                         px-4 sm:px-6 py-2 sm:py-3 rounded-full
                         bg-gradient-to-r from-[var(--primary-blue)] via-[var(--accent-blue)] to-blue-400
                         text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                         transition-all duration-300
                         ${isMulticonnect ? 'text-sm sm:text-lg font-semibold' : 'text-sm sm:text-base font-medium'}`}
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