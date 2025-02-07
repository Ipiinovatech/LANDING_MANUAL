"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export function AboutText() {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const texts = {
    es: {
      intro: "IPINNOVATECH es una compañía de tecnología desde el 2007 en el mercado Corporativo, con presencia nacional en Colombia, y en otros países como Perú, Ecuador y Estados Unidos.",
      readMore: "Clic para leer más...",
      showLess: "Mostrar menos",
      expanded: {
        p1: "Enfocada en soluciones de TIC'S con IA, creamos servicios y productos INNOVADORES con tecnología de última generación para todos los sectores Corporativos, Gobierno y mercado Masivo.",
        p2: "Utilizamos metodología",
        p3: "que nos permite crear plataformas y servicios de manera ágil y con calidad, generando valor y convirtiéndonos en su mejor aliado.",
        p4: "Ofrecemos productos y servicios en modalidades",
        p5: "Nuestra infraestructura está soportada en",
        p6: "más grandes del mundo,",
        p7: "permitiendo crecer fácilmente, garantizar disponibilidad y trabajar con tecnologías de",
        p8: "como"
      }
    },
    en: {
      intro: "IPINNOVATECH is a technology company in the Corporate market since 2007, with a national presence in Colombia, and in other countries such as Peru, Ecuador, and the United States.",
      readMore: "Click to read more...",
      showLess: "Show less",
      expanded: {
        p1: "Focused on ICT solutions with AI, we create INNOVATIVE services and products with cutting-edge technology for all Corporate sectors, Government, and Mass market.",
        p2: "We use methodology",
        p3: "that allows us to create platforms and services efficiently and with quality, generating value and becoming your best ally.",
        p4: "We offer products and services in modalities",
        p5: "Our infrastructure is supported by one of the",
        p6: "largest in the world,",
        p7: "allowing easy growth, ensuring availability and working with",
        p8: "technologies such as"
      }
    }
  };

  return (
    <div className="w-full max-w-[98%] sm:max-w-[85%] mx-auto px-2 sm:px-0">
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl">
        {/* Main text container with improved mobile margins */}
        <div className="w-[94%] sm:w-[90%] mx-auto">
          <p className="text-sm sm:text-lg text-gray-700 leading-relaxed font-medium text-justify break-words hyphens-none tracking-tight sm:tracking-normal">
            {texts[language].intro}
            {!isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="ml-2 text-[var(--primary-blue)] hover:text-[var(--accent-blue)] transition-colors duration-300 font-semibold text-sm sm:text-base"
              >
                {texts[language].readMore}
              </button>
            )}
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 space-y-6"
              >
                <p className="text-sm sm:text-lg text-gray-700 leading-relaxed text-justify break-words hyphens-none tracking-tight sm:tracking-normal">
                  {texts[language].expanded.p1}
                </p>

                <p className="text-sm sm:text-lg text-gray-700 leading-relaxed text-justify break-words hyphens-none tracking-tight sm:tracking-normal">
                  {texts[language].expanded.p2}
                  <span className="inline-block align-middle mx-2">
                    <Image
                      src="/Images/Brochure/Logo_infinito.png"
                      alt="Metodología"
                      width={80}
                      height={20}
                      className="object-contain sm:w-[100px] w-[60px]"
                      priority
                    />
                  </span>
                  {texts[language].expanded.p3}
                </p>
                
                <p className="text-sm sm:text-lg text-gray-700 leading-relaxed text-justify break-words hyphens-none tracking-tight sm:tracking-normal">
                  {texts[language].expanded.p4} <span className="font-semibold text-[var(--primary-blue)]">SaaS</span> ("Software como servicio"), <span className="font-semibold text-[var(--primary-blue)]">IaaS</span> ("Infraestructura como servicio"), y <span className="font-semibold text-[var(--primary-blue)]">PaaS</span> ("Plataforma como servicio").
                </p>
                
                <p className="text-sm sm:text-lg text-gray-700 leading-relaxed text-justify break-words hyphens-none tracking-tight sm:tracking-normal">
                  {texts[language].expanded.p5} <span className="font-semibold text-[var(--primary-blue)]">CLOUD COMPUTING</span> {texts[language].expanded.p6} <span className="font-semibold text-[var(--primary-blue)]">AWS</span> ("Amazon Web Services"), {texts[language].expanded.p7} <span className="font-semibold text-[var(--primary-blue)]">IA (LLM)</span> {texts[language].expanded.p8} <span className="font-semibold text-[var(--primary-blue)]">Open IA</span>.
                </p>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[var(--primary-blue)] hover:text-[var(--accent-blue)] transition-colors duration-300 font-semibold text-sm sm:text-base"
                >
                  {texts[language].showLess}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}