"use client";

import { motion } from "framer-motion";
import { ImageIcon, ImageOff, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./VideoPlayer";
import { DemoButton } from "./DemoButton";
import { Product } from "@/types/product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-scroll";
import { useState } from "react";

interface ProductContentProps {
  product: Product;
  showImage: boolean;
  onToggleImage: () => void;
  onContact: () => void;
  language: string;
}

export function ProductContent({ 
  product, 
  showImage, 
  onToggleImage, 
  onContact,
  language 
}: ProductContentProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getDetailedDescription = (productTitle: string) => {
    const descriptions: { [key: string]: { es: string; en: string } } = {
      ProcessAI: {
        es: "Con ProcessAI, una plataforma avanzada que automatiza tareas, optimiza procesos y facilita la creación de productos y servicios mediante Inteligencia Artificial de última generación. Al integrar soluciones tecnológicas innovadoras, permite a las empresas reducir costos, mejorar la productividad y facilitar su adaptación a los constantes cambios del mercado. Desde la digitalización de operaciones hasta la optimización de flujos de trabajo, ProcessAI transforma la manera en que las empresas operan, eliminando ineficiencias y potenciando la competitividad. Su capacidad de diseñar soluciones a medida garantiza que cada negocio se mantenga a la vanguardia de la transformación digital, asegurando no solo una mayor rentabilidad, sino también un crecimiento sostenible en la era 4.0.",
        en: "ProcessAI is an advanced platform that automates tasks, optimizes processes, and facilitates the creation of products and services using cutting-edge Artificial Intelligence. By integrating innovative technological solutions, it enables companies to reduce costs, improve productivity, and facilitate their adaptation to constant market changes. From digitizing operations to optimizing workflows, ProcessAI transforms the way companies operate, eliminating inefficiencies and enhancing competitiveness. Its ability to design customized solutions ensures that each business stays at the forefront of digital transformation, ensuring not only greater profitability but also sustainable growth in the 4.0 era."
      },
      MulticonnectAI: {
        es: "Nuestros Asistentes de Inteligencia Artificial transforman la manera en que las empresas se comunican con sus clientes, ofreciendo una interacción fluida, personalizada y eficiente a través de múltiples canales como llamadas de voz, chat en tiempo real y redes sociales. Gracias a su soporte multilingüe, garantizan una experiencia inclusiva y adaptada a audiencias globales. Diseñados para gestionar tareas clave como servicio al cliente, agendamiento, soporte técnico y encuestas, estos asistentes se integran perfectamente con los sistemas empresariales, proporcionando respuestas rápidas y precisas con un tono natural y humano. Su capacidad de adaptabilidad y precisión les permite abordar tanto consultas simples como solicitudes complejas, optimizando procesos y fortaleciendo la relación con los clientes. Al implementar estos asistentes inteligentes, su empresa no solo mejora la eficiencia operativa, sino que también eleva la calidad de cada interacción, diferenciándose con soluciones innovadoras que impulsan el éxito en la era digital.",
        en: "Our Artificial Intelligence Assistants transform the way companies communicate with their customers, offering fluid, personalized, and efficient interaction across multiple channels such as voice calls, real-time chat, and social media. Thanks to their multilingual support, they guarantee an inclusive experience adapted to global audiences. Designed to manage key tasks such as customer service, scheduling, technical support, and surveys, these assistants integrate seamlessly with business systems, providing quick and accurate responses with a natural, human tone. Their adaptability and precision allow them to handle both simple queries and complex requests, optimizing processes and strengthening customer relationships. By implementing these intelligent assistants, your company not only improves operational efficiency but also elevates the quality of each interaction, differentiating itself with innovative solutions that drive success in the digital era."
      },
      SellAI: {
        es: "Nuestros Agentes de Ventas con Inteligencia Artificial están diseñados para transformar sus estrategias comerciales mediante una experiencia de venta personalizada, efectiva y escalable en Múltiples canales, como voz, chat y redes sociales, con soporte multilingüe. Gracias a un enfoque innovador y tecnológico, estos agentes no solo asesoran a los clientes desde el primer contacto hasta la compra o reserva de servicios, sino que también se adaptan a la identidad de su empresa, asegurando una representación auténtica y profesional. Equipados con IA avanzada, utilizan artificial, web scraping y análisis de datos en tiempo real para identificar oportunidades y optimizar cada interacción, aumentando la conversión de ventas. Además, operan bajo un modelo de éxito garantizado, donde el cobro del servicio se basa en un porcentaje de las ventas efectivas, asegurando un enfoque estratégico y orientado a resultados. Con esta solución, cada interacción se convierte en una oportunidad de negocio, impulsando el crecimiento de su empresa y manteniéndola a la vanguardia de la innovación comercial.",
        en: "Our AI Sales Agents are designed to transform your commercial strategies through a personalized, effective, and scalable sales experience across multiple channels, such as voice, chat, and social media, with multilingual support. Thanks to an innovative and technological approach, these agents not only advise customers from first contact to purchase or service booking but also adapt to your company's identity, ensuring authentic and professional representation. Equipped with advanced AI, they use artificial intelligence, web scraping, and real-time data analysis to identify opportunities and optimize each interaction, increasing sales conversion. Additionally, they operate under a guaranteed success model, where service charges are based on a percentage of effective sales, ensuring a strategic and results-oriented approach. With this solution, each interaction becomes a business opportunity, driving your company's growth and keeping it at the forefront of commercial innovation."
      },
      "AI Vision": {
        es: "Nuestro servicio de Visión Artificial convierte datos visuales en información procesable, permitiendo a las empresas optimizar procesos, reducir errores y mejorar la eficiencia operativa. Mediante la automatización avanzada, agiliza tareas como etiquetado, clasificación y conteo, liberando recursos para actividades estratégicas. Además, fortalece el control de calidad, optimiza la gestión de inventarios y minimiza el desperdicio en sectores como retail, fabricación, salud y seguridad. Su capacidad de monitoreo inteligente, con reconocimiento facial y validación en tiempo real, garantiza entornos más seguros y controlados. Aplicable en inspección de productos, análisis de imágenes médicas y supervisión de operaciones, esta solución coloca a su empresa en la vanguardia de la era digital, transformando imágenes en decisiones estratégicas que impulsan la competitividad y el crecimiento.",
        en: "Our Artificial Vision service converts visual data into actionable information, enabling companies to optimize processes, reduce errors, and improve operational efficiency. Through advanced automation, it streamlines tasks such as labeling, classification, and counting, freeing up resources for strategic activities. Additionally, it strengthens quality control, optimizes inventory management, and minimizes waste in sectors such as retail, manufacturing, healthcare, and security. Its intelligent monitoring capability, with facial recognition and real-time validation, ensures safer and more controlled environments. Applicable in product inspection, medical image analysis, and operations supervision, this solution places your company at the forefront of the digital era, transforming images into strategic decisions that drive competitiveness and growth."
      },
      FaceIA: {
        es: "FaceIA redefine la verificación de identidad digital al combinar precisión, velocidad y seguridad mediante reconocimiento facial avanzado con tecnología de detección de vida (liveness). Este sistema no solo identifica rostros con alta exactitud, sino que previene fraudes al garantizar que el usuario es una persona real, evitando suplantaciones con fotos, videos o modelos 3D. Su autenticación segura protege contra intentos de fraude, mientras que su validación ultrarrápida permite operaciones eficientes en entornos de alta demanda. Con una experiencia de usuario fluida y sin fricciones, FaceIA es adaptable a múltiples dispositivos y fácilmente integrable en sistemas existentes. Sus aplicaciones abarcan desde accesos seguros en oficinas y eventos hasta autenticación en banca digital, e-commerce, pagos y servicios gubernamentales y de salud. Cumpliendo con estrictas normativas de privacidad, FaceIA equilibra seguridad y usabilidad, ofreciendo una solución escalable que crece con su negocio. Lleve la verificación de identidad al siguiente nivel con FaceIA, garantizando interacciones seguras, modernas y eficientes.",
        en: "FaceIA redefines digital identity verification by combining precision, speed, and security through advanced facial recognition with liveness detection technology. This system not only identifies faces with high accuracy but also prevents fraud by ensuring the user is a real person, avoiding impersonation with photos, videos, or 3D models. Its secure authentication protects against fraud attempts, while its ultra-fast validation enables efficient operations in high-demand environments. With a smooth and frictionless user experience, FaceIA is adaptable to multiple devices and easily integrable into existing systems. Its applications range from secure access in offices and events to authentication in digital banking, e-commerce, payments, and government and health services. Complying with strict privacy regulations, FaceIA balances security and usability, offering a scalable solution that grows with your business. Take identity verification to the next level with FaceIA, ensuring secure, modern, and efficient interactions."
      },
      MultimediaAI: {
        es: "Multimedia AI es el servicio de generación multimodal que revoluciona la creación de contenidos, permitiendo a las empresas optimizar y sofisticar su producción mediante inteligencia artificial. Desde texto a voz, imágenes y vídeos hasta música y audio profesional, esta innovadora plataforma abre nuevas posibilidades para potenciar productos y servicios. Multimedia AI ofrece imágenes personalizadas, alineadas con la identidad de marca; videos de alto impacto para marketing y capacitación; clonación de voces auténticas, mejorando la conexión emocional con los clientes; composición musical original para campañas publicitarias; y audio profesional, adaptado a cada necesidad. Además, su capacidad de generar modelos exclusivos permite desarrollar soluciones personalizadas, alineadas con la estrategia empresarial. Su enfoque en creatividad ilimitada, optimización de recursos, liderazgo en innovación y escalabilidad posiciona a las marcas como referentes en tecnología y creatividad. Con Multimedia AI, su empresa podrá transformar ideas en experiencias únicas y diferenciarse en el mercado, llevando la creación de contenidos al futuro.",
        en: "Multimedia AI is the multimodal generation service that revolutionizes content creation, enabling companies to optimize and sophisticate their production through artificial intelligence. From text to voice, images, and videos to music and professional audio, this innovative platform opens new possibilities to enhance products and services. Multimedia AI offers customized images aligned with brand identity; high-impact videos for marketing and training; authentic voice cloning, improving emotional connection with customers; original music composition for advertising campaigns; and professional audio adapted to each need. Additionally, its ability to generate exclusive models allows developing customized solutions aligned with business strategy. Its focus on unlimited creativity, resource optimization, innovation leadership, and scalability positions brands as references in technology and creativity. With Multimedia AI, your company can transform ideas into unique experiences and differentiate itself in the market, taking content creation to the future."
      },
      AvAI: {
        es: "AvAI es la solución definitiva en avatares con inteligencia artificial, diseñada para transformar la interacción entre empresas y sus clientes, empleados y audiencias. Gracias a su combinación de realismo, adaptabilidad y tecnología avanzada, AvAI crea experiencias digitales inmersivas y personalizadas, elevando la comunicación a un nivel superior. Con aplicaciones en soporte al cliente, ventas y capacitación, AvAI optimiza la atención personalizada y fortalece la conexión con los usuarios. Su automatización multicanal le permite interactuar a través de correos electrónicos, SMS y llamadas, asegurando una comunicación fluida y eficiente. Además, se integra perfectamente con sistemas empresariales, procesando datos en tiempo real para mejorar la toma de decisiones. Compatible con sitios web, aplicaciones móviles y entornos en tiempo real, AvAI ofrece una interacción multiplataforma, adaptándose a cualquier contexto. Equipado con reconocimiento facial y de voz, detecta emociones y ajusta su respuesta para ser más natural y humana, mientras que sus animaciones realistas refuerzan la conexión emocional con los usuarios. Con capacidad de generar contenido en tiempo real, responder preguntas y adaptarse a múltiples idiomas y culturas, AvAI es la herramienta ideal para empresas que buscan diferenciarse con innovación y personalización. Integre AvAI hoy y transforma cada interacción en una experiencia inolvidable que impulsa su negocio al futuro.",
        en: "AvAI is the ultimate solution in artificial intelligence avatars, designed to transform interaction between companies and their customers, employees, and audiences. Thanks to its combination of realism, adaptability, and advanced technology, AvAI creates immersive and personalized digital experiences, elevating communication to a superior level. With applications in customer support, sales, and training, AvAI optimizes personalized attention and strengthens connection with users. Its multichannel automation allows interaction through emails, SMS, and calls, ensuring fluid and efficient communication. Additionally, it integrates perfectly with business systems, processing real-time data to improve decision-making. Compatible with websites, mobile applications, and real-time environments, AvAI offers cross-platform interaction, adapting to any context. Equipped with facial and voice recognition, it detects emotions and adjusts its response to be more natural and human, while its realistic animations reinforce emotional connection with users. With the ability to generate real-time content, answer questions, and adapt to multiple languages and cultures, AvAI is the ideal tool for companies seeking to differentiate themselves with innovation and personalization. Integrate AvAI today and transform each interaction into an unforgettable experience that drives your business to the future."
      },
      CyberAI: {
        es: "CyberAI es la solución definitiva en ciberseguridad impulsada por inteligencia artificial, diseñada para detectar, prevenir y responder a ciberataques en tiempo real, protegiendo los activos más valiosos de su empresa. Con una detección proactiva de amenazas, analiza continuamente redes y sistemas para identificar actividades sospechosas antes de que representen un riesgo. Su monitoreo 24/7 garantiza una vigilancia ininterrumpida, mientras que el análisis predictivo permite anticiparse a posibles vulnerabilidades con estrategias preventivas. CyberAI actúa con respuesta automatizada, mitigando amenazas en tiempo real y notificando a los responsables mediante comunicación inteligente vía correos, SMS o llamadas. Además, simplifica el cumplimiento normativo, asegurando que su empresa cumpla con las regulaciones de seguridad más exigentes. Al integrar CyberAI, su negocio se beneficia con reacción inmediata, reducción de costos y mayor confianza operacional, proyectando una imagen de solidez y compromiso con la protección digital. CyberAI no solo mitiga riesgos, sino que también impulsa la innovación, manteniendo su empresa un paso adelante frente a amenazas emergentes. ¡Transforme la seguridad digital con CyberAI y convierta las amenazas en oportunidades para fortalecer su infraestructura tecnológica!",
        en: "CyberAI is the ultimate solution in artificial intelligence-driven cybersecurity, designed to detect, prevent, and respond to cyberattacks in real-time, protecting your company's most valuable assets. With proactive threat detection, it continuously analyzes networks and systems to identify suspicious activities before they pose a risk. Its 24/7 monitoring ensures uninterrupted surveillance, while predictive analysis allows anticipating potential vulnerabilities with preventive strategies. CyberAI acts with automated response, mitigating threats in real-time and notifying those responsible through intelligent communication via emails, SMS, or calls. Additionally, it simplifies regulatory compliance, ensuring your company meets the most demanding security regulations. By integrating CyberAI, your business benefits from immediate reaction, cost reduction, and greater operational confidence, projecting an image of solidity and commitment to digital protection. CyberAI not only mitigates risks but also drives innovation, keeping your company one step ahead of emerging threats. Transform digital security with CyberAI and turn threats into opportunities to strengthen your technological infrastructure!"
      },
      TrueSing: {
        es: "TrueSing es la solución definitiva para proteger la autenticidad y propiedad de documentos, imágenes y videos mediante Firmas Digitales impulsadas por Inteligencia Artificial y Embeddings. Diseñado para creadores, empresas y profesionales, TrueSing garantiza que cada contenido firmado sea único, verificable y seguro frente a alteraciones o suplantaciones. Su tecnología de identificación multifactorial utiliza datos únicos como rostro, voz, escritura y datos personales para generar un identificador exclusivo que vincula de manera irrefutable al firmante con su contenido. A través de una firma binaria integrada, esta solución protege archivos sin alterar su calidad, permitiendo verificar la autenticidad y propiedad incluso en el futuro. TrueSing ofrece beneficios clave como seguridad avanzada, detección de alteraciones, compatibilidad con diversos formatos y una mayor protección para la monetización de contenido digital. Ideal para artistas, creadores y empresas, su enfoque innovador garantiza confianza, eficiencia y control total sobre el contenido. TrueSing transforma la manera en que se firman y protegen documentos, imágenes y videos, asegurando su autenticidad y valor en cada paso del camino. ¡El futuro de la seguridad digital y la gestión de derechos de autor comienza aquí!",
        en: "TrueSing is the ultimate solution for protecting the authenticity and ownership of documents, images, and videos through Digital Signatures powered by Artificial Intelligence and Embeddings. Designed for creators, companies, and professionals, TrueSing ensures that each signed content is unique, verifiable, and secure against alterations or impersonations. Its multifactor identification technology uses unique data such as face, voice, writing, and personal data to generate an exclusive identifier that irrefutably links the signer with their content. Through an integrated binary signature, this solution protects files without altering their quality, allowing verification of authenticity and ownership even in the future. TrueSing offers key benefits such as advanced security, alteration detection, compatibility with various formats, and enhanced protection for digital content monetization. Ideal for artists, creators, and companies, its innovative approach ensures trust, efficiency, and total control over content. TrueSing transforms the way documents, images, and videos are signed and protected, ensuring their authenticity and value every step of the way. The future of digital security and copyright management starts here!"
      },
      InfluAI: {
        es: "InfluAI es la solución revolucionaria para transformar su estrategia digital con influencers virtuales impulsados por Inteligencia Artificial, diseñada para conectar marcas con audiencias globales de manera estratégica, innovadora y efectiva. Con una presencia visual única, InfluAI crea personajes personalizados que reflejan la identidad de su empresa, destacándose en redes sociales como Instagram, TikTok y YouTube. Gracias a su capacidad de generar voz y video realistas mediante IA, estos influencers interactúan de manera dinámica y continua, respondiendo preguntas y manteniendo un alto nivel de engagement 24/7. Además, optimiza promociones, segmenta audiencias y mide resultados en tiempo real con análisis de IA, asegurando campañas más efectivas. InfluAI reduce costos, garantiza coherencia en el mensaje y permite una expansión multilingüe, adaptándose a diferentes culturas y regiones. Con esta tecnología, su marca no solo logrará mayor alcance e impacto, sino que también se posicionará como un referente en innovación digital, creando conexiones auténticas y memorables con su público. InfluAI redefine el marketing digital, llevando la creatividad y la interacción a un nivel sin precedentes. ¡El futuro de la influencia digital comienza ahora!",
        en: "InfluAI is the revolutionary solution to transform your digital strategy with AI-powered virtual influencers, designed to connect brands with global audiences in a strategic, innovative, and effective way. With a unique visual presence, InfluAI creates customized characters that reflect your company's identity, standing out on social networks like Instagram, TikTok, and YouTube. Thanks to its ability to generate realistic voice and video through AI, these influencers interact dynamically and continuously, answering questions and maintaining high engagement levels 24/7. Additionally, it optimizes promotions, segments audiences, and measures results in real-time with AI analysis, ensuring more effective campaigns. InfluAI reduces costs, ensures message consistency, and enables multilingual expansion, adapting to different cultures and regions. With this technology, your brand will not only achieve greater reach and impact but also position itself as a reference in digital innovation, creating authentic and memorable connections with your audience. InfluAI redefines digital marketing, taking creativity and interaction to unprecedented levels. The future of digital influence starts now!"
      },
      "db-ai": {
        es: "db-ai revoluciona la gestión empresarial al combinar Bases de Datos Vector (RAG) con Modelos de Lenguaje (LLMs), permitiendo consultas en lenguaje natural para acceder, analizar y visualizar datos textuales, métricos y visuales de manera rápida, segura y eficiente. Con capacidades avanzadas como análisis predictivo, monitoreo en tiempo real y automatización de informes, db-ai optimiza la toma de decisiones estratégicas, agiliza la gestión financiera, el control de inventarios y el análisis de ventas, asegurando confidencialidad total y protección de datos. Su integración intuitiva permite realizar búsquedas complejas sin necesidad de conocimientos técnicos, convirtiendo la información en oportunidades estratégicas para el crecimiento empresarial. ¡Lleve la inteligencia artificial a su negocio con db-ai y transforme la manera en que gestiona sus datos!",
        en: "db-ai revolutionizes business management by combining Vector Databases (RAG) with Language Models (LLMs), enabling natural language queries to access, analyze, and visualize textual, metric, and visual data quickly, securely, and efficiently. With advanced capabilities such as predictive analysis, real-time monitoring, and report automation, db-ai optimizes strategic decision-making, streamlines financial management, inventory control, and sales analysis, ensuring total confidentiality and data protection. Its intuitive integration allows performing complex searches without technical knowledge, turning information into strategic opportunities for business growth. Bring artificial intelligence to your business with db-ai and transform the way you manage your data!"
      },
      TestQAI: {
        es: "TestQAAI revoluciona el aseguramiento de calidad del software con agentes de prueba impulsados por inteligencia artificial, automatizando el ciclo completo de pruebas en aplicaciones web y móviles con velocidad, precisión y eficiencia. Su capacidad para diseñar, ejecutar y analizar pruebas sin intervención manual optimiza el desarrollo, asegurando compatibilidad multiplataforma, detección avanzada de errores y generación de informes detallados. Integrado con DevOps, TestQAAI acelera los ciclos de desarrollo, reduce costos, mejora la cobertura de pruebas y permite una toma de decisiones basada en datos, garantizando un software más confiable y robusto. ¡Transforme su estrategia de QA con TestQAAI y lleve la calidad de su software al siguiente nivel!",
        en: "TestQAAI revolutionizes software quality assurance with AI-powered test agents, automating the complete testing cycle in web and mobile applications with speed, precision, and efficiency. Its ability to design, execute, and analyze tests without manual intervention optimizes development, ensuring cross-platform compatibility, advanced error detection, and detailed report generation. Integrated with DevOps, TestQAAI accelerates development cycles, reduces costs, improves test coverage, and enables data-driven decision-making, ensuring more reliable and robust software. Transform your QA strategy with TestQAAI and take your software quality to the next level!"
      },
      "AI Trainer": {
        es: "AITrainer es la solución definitiva para capacitar a empresas en la adopción y uso estratégico de la inteligencia artificial, brindando formación adaptada a distintos niveles, desde conceptos básicos hasta especializaciones avanzadas. A través de una metodología práctica y enfocada en desafíos reales, AITrainer no solo enseña teoría, sino que prepara a su equipo para aplicar la IA en sus operaciones diarias, impulsando la innovación y la competitividad. Con AITrainer, su empresa adquiere el conocimiento necesario para liderar la transformación digital y aprovechar al máximo el potencial de la inteligencia artificial. ¡Capacite su talento y lidere el futuro con AITrainer!",
        en: "AITrainer is the ultimate solution for training companies in the adoption and strategic use of artificial intelligence, providing training adapted to different levels, from basic concepts to advanced specializations. Through a practical methodology focused on real challenges, AITrainer not only teaches theory but prepares your team to apply AI in their daily operations, driving innovation and competitiveness. With AITrainer, your company acquires the necessary knowledge to lead digital transformation and maximize the potential of artificial intelligence. Train your talent and lead the future with AITrainer!"
      },
      "¡Pa Ya!": {
        es: "¡Pa' Ya! es la plataforma inteligente que revoluciona la gestión de servicios y entregas, optimizando tiempos, precisión y calidad a través de tecnología avanzada. Con tres soluciones principales— Estándar para clientes individuales, Delivery con rutas inteligentes y Business para empresas—¡Pa' Ya! maximiza la eficiencia con algoritmos de optimización, automatización RPA y soporte en tiempo real. Adaptable a sectores como salud, telecomunicaciones y educación, ofrece una experiencia más rápida, inteligente y confiable. Descubre el futuro de las entregas con ¡Pa' Ya! y transforma su forma de trabajar.",
        en: "¡Pa' Ya! is the intelligent platform that revolutionizes service and delivery management, optimizing time, precision, and quality through advanced technology. With three main solutions—Standard for individual clients, Delivery with intelligent routes, and Business for companies—¡Pa' Ya! maximizes efficiency with optimization algorithms, RPA automation, and real-time support. Adaptable to sectors such as healthcare, telecommunications, and education, it offers a faster, smarter, and more reliable experience. Discover the future of deliveries with ¡Pa' Ya! and transform your way of working."
      },
      "Fábrica de Software": {
        es: "Fábrica de Software es el servicio integral de desarrollo a la medida que impulsa la competitividad empresarial con soluciones tecnológicas escalables y de alto rendimiento. Utilizamos tecnologías como PHP, Java y las principales bases de datos del mercado (MySQL, Oracle, SQL Server) para garantizar confiabilidad y eficiencia. Nuestra metodología abarca consultoría, diseño e implementación, con un equipo especializado que optimiza los tiempos de entrega sin comprometer la calidad. Desarrolle software a la medida de su negocio con tecnología avanzada y tiempos reducidos. ¡Contáctenos hoy y transforme su empresa!",
        en: "Software Factory is the comprehensive custom development service that drives business competitiveness with scalable and high-performance technological solutions. We use technologies such as PHP, Java, and the main market databases (MySQL, Oracle, SQL Server) to ensure reliability and efficiency. Our methodology encompasses consulting, design, and implementation, with a specialized team that optimizes delivery times without compromising quality. Develop custom software for your business with advanced technology and reduced times. Contact us today and transform your company!"
      },
      "Analítica Big Data": {
        es: "ANALITICA BIG DATA es la solución definitiva para empresas que buscan extraer valor estratégico de grandes volúmenes de datos mediante modelos avanzados de predicción, clasificación y recomendación basados en inteligencia artificial. Nuestra consultoría e implementación permiten transformar información cruda en insights valiosos, optimizando la toma de decisiones y anticipando tendencias clave. Lo que nos distingue es la combinación de técnicas analíticas tradicionales con innovaciones en IA, garantizando precisión y efectividad. No se quede atrás en la era del Big Data, convierta sus datos en oportunidades con ANALITICA BIG DATA.",
        en: "BIG DATA ANALYTICS is the ultimate solution for companies seeking to extract strategic value from large volumes of data through advanced prediction, classification, and recommendation models based on artificial intelligence. Our consulting and implementation allow transforming raw information into valuable insights, optimizing decision-making and anticipating key trends. What distinguishes us is the combination of traditional analytical techniques with AI innovations, ensuring precision and effectiveness. Don't fall behind in the Big Data era, turn your data into opportunities with BIG DATA ANALYTICS."
      },
      "Virtual Smart Video": {
        es: "Virtual Smart Video es la plataforma inteligente para gestión y análisis de video con IA que revoluciona entrevistas y capacitaciones mediante inteligencia artificial, optimizando procesos y reduciendo costos operativos. Con capacidades avanzadas como el reconocimiento de emociones y el perfil biofísico, esta herramienta disponible 24 horas al día, 7 días a la semana asegura un análisis en tiempo real, proporcionando insights valiosos. Además, su almacenamiento seguro de información garantiza la confidencialidad. Optimice entrevistas, capacite a su equipo y lleve la eficiencia de su empresa al siguiente nivel con Virtual Smart Video. ¡Comience hoy mismo!",
        en: "Virtual Smart Video is the intelligent platform for video management and analysis with AI that revolutionizes interviews and training through artificial intelligence, optimizing processes and reducing operational costs. With advanced capabilities such as emotion recognition and biophysical profiling, this tool available 24 hours a day, 7 days a week ensures real-time analysis, providing valuable insights. Additionally, its secure information storage guarantees confidentiality. Optimize interviews, train your team, and take your company's efficiency to the next level with Virtual Smart Video. Start today!"
      },
      "Virtual Quality Field": {
        es: "VIRTUAL Quality FIELD es la plataforma web y móvil que revoluciona las auditorías y supervisiones remotas en tiempo real, permitiendo la toma de evidencia multimedia para garantizar la calidad del servicio en sectores como telecomunicaciones, energía, gas y medicina. Gracias a su integración con video analítico e inteligencia artificial, facilita la toma de decisiones informadas al instante, optimizando procesos y elevando la satisfacción del cliente. Transforme la supervisión tradicional, impulse la eficiencia y fortalezca la relación con sus clientes con VIRTUAL Quality FIELD",
        en: "VIRTUAL Quality FIELD is the web and mobile platform that revolutionizes real-time remote audits and supervision, enabling multimedia evidence collection to ensure service quality in sectors such as telecommunications, energy, gas, and medicine. Thanks to its integration with video analytics and artificial intelligence, it facilitates instant informed decision-making, optimizing processes and elevating customer satisfaction. Transform traditional supervision, boost efficiency, and strengthen customer relationships with VIRTUAL Quality FIELD"
      },
      "Virtual IPV": {
        es: "VIRTUAL IPV es la solución integral para gestionar actividades en los puntos de venta, diseñada para optimizar las estrategias retail en grandes superficies y pequeñas tiendas. Con dos modos de ejecución, esta plataforma permite gestionar tareas como merchandising, promociones y análisis de competencia de manera eficiente. Su registro fotográfico georreferenciado y módulo móvil brindan la capacidad de tomar decisiones informadas al instante, transformando la gestión en los puntos de venta y fomentando la lealtad de los los clientes. Con VIRTUAL IPV, eleva su negocio y transforma su estrategia retail.",
        en: "VIRTUAL IPV is the comprehensive solution for managing point-of-sale activities, designed to optimize retail strategies in large surfaces and small stores. With two execution modes, this platform allows efficient management of tasks such as merchandising, promotions, and competition analysis. Its georeferenced photographic record and mobile module provide the ability to make informed decisions instantly, transforming point-of-sale management and fostering customer loyalty. With VIRTUAL IPV, elevate your business and transform your retail strategy."
      }
    };

    return descriptions[productTitle]?.[language] || product.description;
  };

  const handleContactClick = () => {
    onContact();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      const event = new CustomEvent("openChatbot");
      window.dispatchEvent(event);
    }, 500);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleImage}
          className="bg-white/5 hover:bg-white/10 text-white border-white/10
                     transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {showImage ? (
            <>
              <ImageOff className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                {language === "es" ? "Ocultar imagen" : "Hide image"}
              </span>
            </>
          ) : (
            <>
              <ImageIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                {language === "es" ? "Mostrar imagen" : "Show image"}
              </span>
            </>
          )}
        </Button>
      </div>

      {showImage && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full overflow-hidden rounded-xl"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover rounded-xl transform hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      )}

      {product.videoUrl && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
            {language === "es" ? "Video Explicativo" : "Explanatory Video"}
          </h3>
          <div className="w-full max-w-5xl mx-auto px-0">
            <VideoPlayer videoUrl={product.videoUrl} title={product.title} />
          </div>
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-500px)] sm:h-auto pr-4">
        <div className="space-y-6 sm:space-y-8 max-w-[80ch] mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {product.description}
              {!showFullDescription && (
                <button
                  onClick={() => setShowFullDescription(true)}
                  className="ml-2 text-[var(--accent-blue)] hover:text-[var(--primary-blue)] transition-colors duration-300"
                >
                  {language === "es" ? "Saber más..." : "Learn more..."}
                </button>
              )}
            </p>

            {showFullDescription && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  {getDetailedDescription(product.title)}
                </p>
                <button
                  onClick={() => setShowFullDescription(false)}
                  className="text-[var(--accent-blue)] hover:text-[var(--primary-blue)] transition-colors duration-300"
                >
                  {language === "es" ? "Mostrar menos" : "Show less"}
                </button>
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
            {product.demoUrl && (
              <DemoButton demoUrl={product.demoUrl} />
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full
                       bg-gradient-to-r from-[var(--primary-blue)] via-[var(--accent-blue)] to-blue-400
                       text-white text-base sm:text-lg font-medium 
                       shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                       transition-all duration-300 w-full sm:w-auto justify-center"
            >
              {language === "es" ? "Contactar" : "Contact Us"}
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}