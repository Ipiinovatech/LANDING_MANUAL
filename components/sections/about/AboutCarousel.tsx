"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImageZoom } from "./ImageZoom";
import { Link } from "react-scroll";

const slides = {
  es: [
    {
      id: "mission-vision",
      image: "/Images/Brochure/Mision_Vision.png",
      title: "MISIÓN Y VISIÓN"
    },
    {
      id: "how-we-work",
      image: "/Images/Brochure/Como_Trabajamos.png",
      title: "CÓMO TRABAJAMOS"
    },
    {
      id: "org-structure",
      image: "/Images/Brochure/Estructura_Organizacional.jpg",
      title: "ESTRUCTURA ORGANIZACIONAL"
    }
  ],
  en: [
    {
      id: "mission-vision",
      image: "/Images/Nosotros_Eng/VISION VISION INGLES.png",
      title: "MISSION AND VISION"
    },
    {
      id: "how-we-work",
      image: "/Images/Nosotros_Eng/COMO TRABAJAMOS INGLES.png",
      title: "HOW WE WORK"
    },
    {
      id: "org-structure",
      image: "/Images/Nosotros_Eng/ORGANIGRAMA INGLES.png",
      title: "ORGANIZATIONAL STRUCTURE"
    }
  ]
};

export function AboutCarousel() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentSlides = slides[language];

  const handleButtonClick = (index: number) => {
    setCurrentIndex(index);
    setShowImage(true);
  };

  const handleDoubleClick = () => {
    setIsZoomed(true);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto space-y-6">
      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {currentSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleButtonClick(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${index === currentIndex && showImage
                ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200'
              }`}
          >
            {slide.title}
          </button>
        ))}
      </div>

      {/* Image Display */}
      <AnimatePresence mode="wait">
        {showImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[16/7] overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm">
              <motion.img
                key={currentIndex}
                src={currentSlides[currentIndex].image}
                alt={currentSlides[currentIndex].title}
                className="w-full h-full object-contain cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onDoubleClick={handleDoubleClick}
              />

              {/* Close Button - Updated to use Link */}
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-64}
                duration={500}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 z-10 cursor-pointer"
                onClick={() => setShowImage(false)}
              >
                <X className="w-5 h-5 text-gray-800" />
              </Link>

              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length)}
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % currentSlides.length)}
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Modal */}
      <ImageZoom
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
        image={currentSlides[currentIndex].image}
        alt={currentSlides[currentIndex].title}
      />
    </div>
  );
}