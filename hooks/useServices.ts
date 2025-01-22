"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export interface Service {
  id: string;
  label: string;
}

export function useServices() {
  const { language } = useLanguage();

  const services: Service[] = [
    {
      id: "custom-software",
      label: language === "es" 
        ? "Servicios de desarrollo de software a medida" 
        : "Custom software development services"
    },
    {
      id: "ai-apps",
      label: language === "es"
        ? "Aplicaciones con inteligencia artificial"
        : "Artificial intelligence applications"
    },
    {
      id: "tech-consulting",
      label: language === "es"
        ? "Consultoría tecnológica"
        : "Technology consulting"
    },
    {
      id: "maintenance",
      label: language === "es"
        ? "Mantenimiento y soporte de software"
        : "Software maintenance and support"
    },
    {
      id: "automation",
      label: language === "es"
        ? "Soluciones de automatización empresarial"
        : "Business automation solutions"
    },
    {
      id: "mobile-apps",
      label: language === "es"
        ? "Desarrollo de aplicaciones móviles"
        : "Mobile application development"
    },
    {
      id: "integration",
      label: language === "es"
        ? "Integración de sistemas"
        : "System integration"
    },
    {
      id: "data-analytics",
      label: language === "es"
        ? "Análisis y ciencia de datos"
        : "Data analysis and science"
    },
    {
      id: "cybersecurity",
      label: language === "es"
        ? "Ciberseguridad"
        : "Cybersecurity"
    },
    {
      id: "training",
      label: language === "es"
        ? "Capacitación y formación tecnológica"
        : "Technology training and education"
    }
  ];

  return { services };
}