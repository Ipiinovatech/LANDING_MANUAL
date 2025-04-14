"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BrochureSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-[var(--primary-blue)] mb-8">
            BROCHURE 2025
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <a
              href="https://get-qr.com/content/JEf3Au"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/Images/Home/BROCHURE_IPINNOVATECH_2025-4096.png"
                alt="IPINNOVATECH Brochure"
                width={300}
                height={300}
                className="object-contain"
                priority
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}