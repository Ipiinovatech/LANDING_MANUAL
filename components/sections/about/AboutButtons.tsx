"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AboutCarousel } from "./AboutCarousel";

export function AboutButtons() {
  const { language } = useLanguage();

  return (
    <section className="relative w-full bg-[#F8FAFC] py-12 sm:py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] bg-clip-text text-transparent px-4">
            {language === "es" ? "Conoce Más Sobre Nosotros" : "Learn More About Us"}
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            {language === "es"
              ? "Explora nuestra misión, visión y forma de trabajo"
              : "Explore our mission, vision and how we work"}
          </p>
        </motion.div>

        <AboutCarousel />
      </div>
    </section>
  );
}