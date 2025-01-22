"use client";

import { motion } from "framer-motion";

interface AboutImagesProps {
  images: string[];
  position: "left" | "right";
}

export function AboutImages({ images, position }: AboutImagesProps) {
  return (
    <div className="hidden md:flex flex-col gap-6 justify-center h-full">
      {images.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: position === "left" ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative aspect-[4/3] rounded-xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <img
            src={src}
            alt={`About section image ${index + 1}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      ))}
    </div>
  );
}