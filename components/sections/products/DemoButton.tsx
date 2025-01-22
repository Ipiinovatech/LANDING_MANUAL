"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DemoButtonProps {
  demoUrl: string;
  className?: string;
}

export function DemoButton({ demoUrl, className }: DemoButtonProps) {
  const { language } = useLanguage();

  return (
    <motion.a
      href={demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-lg font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 ${className}`}
    >
      <Play className="h-5 w-5" />
      {language === "es" ? "Ver Demo" : "View Demo"}
    </motion.a>
  );
}