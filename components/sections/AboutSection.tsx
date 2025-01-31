"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { AboutText } from "./about/AboutText";
import { useWindowSize } from "@/hooks/useWindowSize";

export function AboutSection() {
  const { language } = useLanguage();
  const { width } = useWindowSize();
  const showBackground = width ? width > 768 : true;

  return (
    <section id="about" className="relative min-h-screen w-full overflow-hidden bg-[#F8FAFC]">
      {/* Background Image */}
      {showBackground && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 max-w-[1800px] mx-auto transition-opacity duration-300"
        >
          <Image
            src="/Images/Varios/Nosotros_Seccion.png"
            alt="Nosotros Background"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1800px) 100vw, 1800px"
            quality={100}
          />
        </motion.div>
      )}

      <div className="relative z-10 section-container section-padding flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl"
        >
          <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] bg-clip-text text-transparent text-center">
            {language === "es" ? "Nosotros" : "About Us"}
          </h2>
          
          <div className={`${!showBackground ? 'bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg' : ''}`}>
            <AboutText />
          </div>
        </motion.div>
      </div>
    </section>
  );
}