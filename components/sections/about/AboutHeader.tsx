"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AboutText } from "./AboutText";
import { AboutImages } from "./AboutImages";

export function AboutHeader() {
  const { language } = useLanguage();
  
  const leftImages = [
    "/Images/Varios/Ai_Avatar.jpg",
    "/Images/Varios/Ai_Cybersecurity.jpg"
  ];

  const rightImages = [
    "/Images/Varios/Ai_innovation_1.jpg",
    "/Images/Varios/Virtual_Quality.jpg"
  ];

  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="section-header">
          {language === "es" ? "Nosotros" : "About Us"}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-8xl mx-auto px-4">
        <div className="md:col-span-3">
          <AboutImages images={leftImages} position="left" />
        </div>
        
        <div className="md:col-span-6 flex items-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <AboutText />
          </div>
        </div>
        
        <div className="md:col-span-3">
          <AboutImages images={rightImages} position="right" />
        </div>
      </div>
    </div>
  );
}