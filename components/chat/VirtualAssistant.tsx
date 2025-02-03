"use client";

import { AnimatePresence } from "framer-motion";
import { useVirtualAssistant } from "@/hooks/useVirtualAssistant";
import { useLanguage } from "@/contexts/LanguageContext";
import { VirtualAssistantButton } from "./VirtualAssistantButton";
import { VirtualAssistantChat } from "./VirtualAssistantChat";
import { VirtualAssistantModal } from "./VirtualAssistantModal";
import { useEffect } from "react";

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

  // Handle browser back button
  useEffect(() => {
    if (isOpen) {
      // Push a new state when assistant opens
      window.history.pushState({ assistant: true }, "");
    }

    // Handle popstate (back button)
    const handlePopState = (event: PopStateEvent) => {
      if (isOpen) {
        setIsOpen(false);
        
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, setIsOpen]);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
      // Push state when opening assistant
      window.history.pushState({ assistant: true }, "");
    };

    window.addEventListener('openChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot);
  }, [setIsOpen]);

  return (
    <>
      <VirtualAssistantButton onClick={() => {
        setIsOpen(true);
        // Push state when opening assistant
        window.history.pushState({ assistant: true }, "");
      }} />

      <AnimatePresence>
        {isOpen && (
          <VirtualAssistantChat
            onClose={() => {
              setIsOpen(false);
              // Go back in history when closing
              if (window.history.state?.assistant) {
                window.history.back();
              }
            }}
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