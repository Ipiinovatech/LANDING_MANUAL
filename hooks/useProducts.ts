"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/product";

export function useProducts() {
  const { language } = useLanguage();

  const products: Product[] = [
    {
      icon: null,
      title: "ProcessAI",
      description: language === "es"
        ? "Automatización inteligente de procesos empresariales utilizando IA avanzada para optimizar operaciones y reducir costos."
        : "Intelligent automation of business processes using advanced AI to optimize operations and reduce costs.",
      image: "/Images/Productos/ProcessAI.jpg",
      category: "AI Innovation",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/ProcessAI/1. Optimizacin y Automatizacin de Procesos_1080p.mp4",
        en: "/Videos/ProcessAI/1. Process Optimization and Automation_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "MulticonnectAI",
      description: language === "es"
        ? "Plataforma de conectividad múltiple que integra diferentes canales de comunicación con inteligencia artificial."
        : "Multi-connectivity platform that integrates different communication channels with artificial intelligence.",
      image: "/Images/Productos/MulticonnectAI.jpg",
      category: "AI Communication",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/MulticonnectAI/2. Agentes Inteligentes Multicanal (ESPAOL)_1080p.mp4",
        en: "/Videos/MulticonnectAI/2. Multichannel Intelligent Agents (INGLES)_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "SellAI",
      description: language === "es"
        ? "Sistema de ventas potenciado por IA para optimizar procesos comerciales y aumentar conversiones."
        : "AI-powered sales system to optimize commercial processes and increase conversions.",
      image: "/Images/Productos/SellAI.jpg",
      category: "AI Sales",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/SellAI/3. Agente IA de Ventas Multicanal_1080p.mp4",
        en: "/Videos/SellAI/3. Multichannel Sales AI Agent_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "AI Vision",
      description: language === "es"
        ? "Sistema de visión artificial para análisis y procesamiento de imágenes en tiempo real."
        : "Artificial vision system for real-time image analysis and processing.",
      image: "/Images/Productos/AIVision.jpg",
      category: "AI Security",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/AI Vision/4. Servicios de Visin Artificial_1080p.mp4",
        en: "/Videos/AI Vision/4. Artificial Vision Services (INGLES)_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "FaceIA",
      description: language === "es"
        ? "Reconocimiento facial avanzado con detección de vida para autenticación segura."
        : "Advanced facial recognition with liveness detection for secure authentication.",
      image: "/Images/Productos/FaceIA.jpg",
      category: "AI Security",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/FaceIA/5. Servicio de Reconocimiento Facial_1080p.mp4",
        en: "/Videos/FaceIA/5. Facial Recognition Service_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "MultimediaAI",
      description: language === "es"
        ? "Gestión y procesamiento inteligente de contenido multimedia con IA."
        : "Intelligent management and processing of multimedia content with AI.",
      image: "/Images/Productos/MultimediaAI.jpg",
      category: "AI Media",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/Multimedia AI/6. Generacion Multimodal con IA_1080p.mp4",
        en: "/Videos/Multimedia AI/6. Multimodal Generation with AI_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "AvAI",
      description: language === "es"
        ? "Avatares virtuales inteligentes para interacción y atención al cliente."
        : "Intelligent virtual avatars for interaction and customer service.",
      image: "/Images/Productos/avAI.jpg",
      category: "AI Avatar",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/AvAI/7. Avatares de IA_1080p.mp4",
        en: "/Videos/AvAI/7. Avatars with AI_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "CyberAI",
      description: language === "es"
        ? "Soluciones de ciberseguridad potenciadas por inteligencia artificial."
        : "AI-powered cybersecurity solutions.",
      image: "/Images/Productos/CyberAI.jpg",
      category: "AI Security",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/CyberAI/8. Ciberseguridad Potenciada con IA_1080p.mp4",
        en: "/Videos/CyberAI/8. AIPowered Cybersecurity_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "TrueSing",
      description: language === "es"
        ? "Verificación de firmas digitales mediante IA para autenticación segura."
        : "Digital signature verification using AI for secure authentication.",
      image: "/Images/Productos/TrueSing.jpg",
      category: "AI Security",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/TrueSing/9. Firmas Digitales con IA_1080p.mp4",
        en: "/Videos/TrueSing/9. Digital Signatures with AI_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "InfluAI",
      description: language === "es"
        ? "Creación y gestión de influencers virtuales impulsados por IA."
        : "Creation and management of AI-driven virtual influencers.",
      image: "/Images/Productos/InfluAI.jpg",
      category: "AI Social",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/InfluAI/10. Influencers de IA para Redes Sociales_1080p.mp4",
        en: "/Videos/InfluAI/10. AI Influencers for Social Media_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "db-ai",
      description: language === "es"
        ? "Gestión inteligente de bases de datos con capacidades de IA."
        : "Intelligent database management with AI capabilities.",
      image: "/Images/Productos/db-ai.jpg",
      category: "AI Data",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/db-ai/11. Bases de Datos Vectoriales(RAG) con Inteligencia Artificial_1080p.mp4",
        en: "/Videos/db-ai/11. Vector Databases (RAG) with Artificial Intelligence_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "TestQAI",
      description: language === "es"
        ? "Pruebas y control de calidad automatizado con inteligencia artificial."
        : "Automated testing and quality control with artificial intelligence.",
      image: "/Images/Productos/TestQAI.jpg",
      category: "AI Testing",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/TestQAAI/12. Agentes de QA testing con IA_1080p.mp4",
        en: "/Videos/TestQAAI/12. QA testing agents with AI_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "AI Trainer",
      description: language === "es"
        ? "Plataforma de entrenamiento y capacitación potenciada por IA."
        : "AI-powered training and education platform.",
      image: "/Images/Productos/AITrainer.jpg",
      category: "AI Training",
      isMultiservice: true,
      isVarios: false,
      videoUrl: {
        es: "/Videos/AI Trainer/13. Capacitacin en Inteligencia Artificial_1080p.mp4",
        en: "/Videos/AI Trainer/13. Artificial Intelligence Training_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "Fábrica de Software",
      description: language === "es"
        ? "Desarrollo de software personalizado con metodologías ágiles e integración de IA."
        : "Custom software development with agile methodologies and AI integration.",
      image: "/Images/Productos/Fabrica_software.jpg",
      category: "Development",
      isMultiservice: false,
      isVarios: true,
      videoUrl: {
        es: "/Videos/FABRICA DE SOFTWARE/15. FABRICA DE SOFTWARE_1080p.mp4",
        en: "/Videos/FABRICA DE SOFTWARE/15. SOFTWARE FACTORY_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "Analítica Big Data",
      description: language === "es"
        ? "Análisis avanzado de grandes volúmenes de datos con técnicas de IA."
        : "Advanced analysis of large data volumes with AI techniques.",
      image: "/Images/Productos/ANALITICA BIG DATA.png",
      category: "Analytics",
      isMultiservice: false,
      isVarios: true,
      videoUrl: {
        es: "/Videos/ANALITICA BIG DATA/19. ANALITICA BIG DATA_1080p.mp4",
        en: "/Videos/ANALITICA BIG DATA/19. BIG DATA ANALYTICS_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "Virtual Smart Video",
      description: language === "es"
        ? "Plataforma inteligente para gestión y análisis de video con IA."
        : "Intelligent platform for video management and analysis with AI.",
      image: "/Images/Varios/Virtual_SmartVideo.jpg",
      category: "Video",
      isMultiservice: false,
      isVarios: true,
      videoUrl: {
        es: "/Videos/VIRTUAL SMART VIDEO/16. VIRTUAL SMART VIDEO_1080p.mp4",
        en: "/Videos/VIRTUAL SMART VIDEO/16. VIRTUAL SMART VIDEO INGLES_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "Virtual Quality Field",
      description: language === "es"
        ? "Sistema de control de calidad y auditoría en campo con IA."
        : "Quality control and field audit system with AI.",
      image: "/Images/Varios/Virtual_Quality.jpg",
      category: "Quality",
      isMultiservice: false,
      isVarios: true,
      videoUrl: {
        es: "/Videos/VIRTUAL QUALITY FIELD/18. VIRTUAL QUALITY FIELD_1080p.mp4",
        en: "/Videos/VIRTUAL QUALITY FIELD/18. VIRTUAL QUALITY FIELD INGLES_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "Virtual IPV",
      description: language === "es"
        ? "Plataforma virtual integral para gestión empresarial con IA."
        : "Comprehensive virtual platform for business management with AI.",
      image: "/Images/Varios/Virtual_Ipv.jpg",
      category: "Virtual Platform",
      isMultiservice: false,
      isVarios: true,
      videoUrl: {
        es: "/Videos/VIRTUAL IPV/17. VIRTUAL IPV_1080p.mp4",
        en: "/Videos/VIRTUAL IPV/17. VIRTUAL IPV INGLES_1080p.mp4"
      }
    },
    {
      icon: null,
      title: "¡Pa Ya!",
      description: language === "es"
        ? "Plataforma de pagos digitales con integración de IA para transacciones seguras."
        : "Digital payment platform with AI integration for secure transactions.",
      image: "/Images/Varios/Pa_Ya.jpg",
      category: "Payments",
      isMultiservice: false,
      isVarios: true,
      videoUrl: {
        es: "/Videos/!PA YA!/14. !PAYA!_1080p.mp4",
        en: "/Videos/!PA YA!/14. !PAYA! INGLES_1080p.mp4"
      }
    }
  ];

  return { products };
}