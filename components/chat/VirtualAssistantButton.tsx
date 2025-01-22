"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface VirtualAssistantButtonProps {
  onClick: () => void;
}

export function VirtualAssistantButton({ onClick }: VirtualAssistantButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 md:bottom-8 md:right-8"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MessageCircle className="h-6 w-6" />
    </motion.button>
  );
}