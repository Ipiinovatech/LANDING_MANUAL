"use client";

import { AnimatePresence } from "framer-motion";
import { useVirtualAssistant } from "@/hooks/useVirtualAssistant";
import { useLanguage } from "@/contexts/LanguageContext";
import { VirtualAssistantButton } from "./VirtualAssistantButton";
import { VirtualAssistantChat } from "./VirtualAssistantChat";
import { VirtualAssistantModal } from "./VirtualAssistantModal";

export function VirtualAssistant() {
  const { language } = useLanguage();
  const {
    isOpen,
    setIsOpen,
    showCaptcha,
    setShowCaptcha,
    isVerified,
    setIsVerified,
    isSubmitting,
    handleSubmit,
    handleVerify
  } = useVirtualAssistant();

  return (
    <>
      <VirtualAssistantButton onClick={() => setIsOpen(true)} />

      <AnimatePresence>
        {isOpen && (
          <VirtualAssistantChat
            onClose={() => setIsOpen(false)}
            language={language}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>

      <VirtualAssistantModal
        isOpen={showCaptcha}
        onClose={() => setShowCaptcha(false)}
        onVerify={handleVerify}
        isVerified={isVerified}
        setIsVerified={setIsVerified}
        isSubmitting={isSubmitting}
        language={language}
      />
    </>
  );
}