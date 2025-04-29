"use client";

import { useState, useEffect } from "react"; // Añade useEffect
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
] as const;

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, version } = useLanguage(); // Añade version

  // Nueva función: fuerza recarga de imágenes
  const reloadImages = () => {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
      const src = img.getAttribute("src");
      if (src) {
        img.setAttribute("src", src.split("?")[0] + `?lang=${language}&v=${version}`);
      }
    });
  };

  const handleLanguageChange = (langCode: "en" | "es") => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  // Efecto que se dispara al cambiar idioma/versión
  useEffect(() => {
    reloadImages();
  }, [language, version]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white hover:bg-black/40 transition-colors duration-200"
      >
        <Globe className="h-4 w-4" />
        <span>{languages.find(lang => lang.code === language)?.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 rounded-lg border border-white/10 bg-black/90 backdrop-blur-md shadow-lg md:right-0 md:left-auto md:w-40"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors duration-200 ${
                    language === lang.code
                      ? "text-[var(--primary-blue)]"
                      : "text-white"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}