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
      intro: "IPINNOVATECH es una compañía de tecnología desde el 2007 estamos en el mercado Corporativo, con presencia nacional en Colombia, y en otros países como Perú, Ecuador y Estados Unidos.",
      readMore: "Clic para leer más...",
      showLess: "Mostrar menos",
      expanded: {
        p1: "Enfocada en soluciones de TIC'S con IA, y nos caracterizamos por ser una empresa que crea servicios y productos INNOVADORES proyectos de ultima tecnología, creando soluciones innovadoras para nuestros clientes en todos los sectores Corporativos, Gobierno y próximamente en el mercado Masivo.",
        p2: "Utilizamos metodología",
        p3: "que nos permite crear plataformas y servicios de manera ágil y con calidad, generando valor a nuestros clientes, y convirtiéndonos en su mejor aliado.",
        p4: "Ofrecemos productos y servicios en modalidades",
        p5: "Toda nuestra infraestructura está soportada en uno de los",
        p6: "más grandes del mundo,",
        p7: "el cual nos permite crecer la infraestructura de los servicios fácilmente, garantizar la disponibilidad, y dar continuidad de los mismos y trabajamos con una de las mas grandes tecnologías de",
        p8: "como"
      }
    },
    en: {
      intro: "IPINNOVATECH is a technology company that has been in the Corporate market since 2007, with a national presence in Colombia, and in other countries such as Peru, Ecuador, and the United States.",
      readMore: "Click to read more...",
      showLess: "Show less",
      expanded: {
        p1: "Focused on ICT solutions with AI, we are characterized by being a company that creates INNOVATIVE services and products with cutting-edge technology projects, creating innovative solutions for our clients in all Corporate sectors, Government, and soon in the Mass market.",
        p2: "Utilizamos metodología",
        p3: "that allows us to create platforms and services in an agile way and with quality, generating value for our clients, and becoming their best ally.",
        p4: "We offer products and services in modalities",
        p5: "All our infrastructure is supported by one of the",
        p6: "largest in the world,",
        p7: "which allows us to easily grow the infrastructure of services, guarantee availability, and give continuity to them and we work with one of the largest",
        p8: "technologies such as"
      }
    }
  };

  return (
    <div className="text-justify w-full max-w-[85%] mx-auto">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
        <p className="text-lg text-gray-700 leading-relaxed font-medium">
          {texts[language].intro}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="ml-2 text-[var(--primary-blue)] hover:text-[var(--accent-blue)] transition-colors duration-300 font-semibold"
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
              <p className="text-lg text-gray-700 leading-relaxed">
                {texts[language].expanded.p1}
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                {texts[language].expanded.p2}
                <span className="inline-block align-middle mx-1">
                  <Image
                    src="/Images/Brochure/Logo_infinito.png"
                    alt="Metodología"
                    width={100}
                    height={25}
                    className="object-contain"
                    priority
                  />
                </span>
                {texts[language].expanded.p3}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {texts[language].expanded.p4} <span className="font-semibold text-[var(--primary-blue)]">SaaS</span> ("Software como un servicio"), <span className="font-semibold text-[var(--primary-blue)]">IaaS</span> ("Infraestructura como un servicio"), y <span className="font-semibold text-[var(--primary-blue)]">PaaS</span> ("Plataforma como un servicio").
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {texts[language].expanded.p5} <span className="font-semibold text-[var(--primary-blue)]">CLOUD COMPUTING</span> {texts[language].expanded.p6} <span className="font-semibold text-[var(--primary-blue)]">AWS</span> ("Amazon Web Services"), {texts[language].expanded.p7} <span className="font-semibold text-[var(--primary-blue)]">IA (LLM)</span> {texts[language].expanded.p8} <span className="font-semibold text-[var(--primary-blue)]">Open IA</span>.
              </p>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-[var(--primary-blue)] hover:text-[var(--accent-blue)] transition-colors duration-300 font-semibold"
              >
                {texts[language].showLess}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}