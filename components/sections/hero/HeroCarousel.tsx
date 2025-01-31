"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useLanguage } from "@/contexts/LanguageContext";

const desktopImages = {
  es: [
    {
      src: "/Images/Home/HOME 3.0.jpg",
      alt: "Home Image 1"
    },
    {
      src: "/Images/Home/HOME PRUEBA 6.jpg",
      alt: "Home Image 2"
    },
    {
      src: "/Images/Home/HOME 5.0.jpg",
      alt: "Home Image 3"
    }
  ],
  en: [
    {
      src: "/Images/Home_Eng/HOME 3.0 (INGLES).png",
      alt: "Home Image 1"
    },
    {
      src: "/Images/Home_Eng/HOME PRUEBA 6 (INGLES).png",
      alt: "Home Image 2"
    },
    {
      src: "/Images/Home_Eng/HOME 5.0 (INGLES).png",
      alt: "Home Image 3"
    }
  ]
};

const mobileImages = {
  es: [
    {
      src: "/Images/Home/MOVIL 1.png",
      alt: "Mobile Home Image 1"
    },
    {
      src: "/Images/Home/MOVIL 2.png",
      alt: "Mobile Home Image 2"
    },
    {
      src: "/Images/Home/MOVIL 3.png",
      alt: "Mobile Home Image 3"
    }
  ],
  en: [
    {
      src: "/Images/Home_Eng/MOVIL 1 INGLES.png",
      alt: "Mobile Home Image 1"
    },
    {
      src: "/Images/Home_Eng/MOVIL 2 INGLES.png",
      alt: "Mobile Home Image 2"
    },
    {
      src: "/Images/Home_Eng/MOVIL 3 INGLES.png",
      alt: "Mobile Home Image 3"
    }
  ]
};

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { width } = useWindowSize();
  const { language } = useLanguage();
  const isMobile = width ? width < 768 : false;
  const images = isMobile ? mobileImages[language] : desktopImages[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              priority
              className={`object-cover ${isMobile ? 'object-contain bg-black' : ''}`}
              sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, 100vw"}
              quality={100}
            />
            <motion.div 
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 z-20 backdrop-blur-sm"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 z-20 backdrop-blur-sm"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "w-8 bg-white" 
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}