"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VirtualAssistantForm } from "./VirtualAssistantForm";

interface VirtualAssistantChatProps {
  onClose: () => void;
  language: string;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function VirtualAssistantChat({
  onClose,
  language,
  isSubmitting,
  onSubmit
}: VirtualAssistantChatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 
                 sm:bottom-24 sm:right-6 sm:w-[450px] sm:max-h-[80vh]
                 bottom-0 right-0 w-full h-[90vh] sm:h-auto"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white rounded-t-2xl">
        <h3 className="text-lg font-semibold">
          {language === "es" ? "Asistente Virtual" : "Virtual Assistant"}
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <ScrollArea className="h-[calc(90vh-64px)] sm:h-[calc(80vh-64px)]">
        <div className="p-6">
          <VirtualAssistantForm 
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </ScrollArea>
    </motion.div>
  );
}