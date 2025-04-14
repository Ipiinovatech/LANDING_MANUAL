"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const { language } = useLanguage();

  const handleContactClick = () => {
    const event = new CustomEvent("openChatbot");
    window.dispatchEvent(event);
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] bg-clip-text text-transparent">
            {language === "es" ? "Contacto" : "Contact"}
          </h2>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="modern-card flex flex-col items-center justify-center gap-6 p-8 mb-8"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-[var(--primary-blue)]">
                  {language === "es" ? "Correo Electrónico" : "Email"}
                </h3>
                <a
                  href="mailto:Info@ipinnovatech.co"
                  className="text-gray-600 hover:text-[var(--accent-blue)] transition-colors duration-300"
                >
                  Info@ipinnovatech.co
                </a>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button
                onClick={handleContactClick}
                className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white px-8 py-6 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
              >
                {language === "es" ? "Contáctanos Ahora" : "Contact Us Now"}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}