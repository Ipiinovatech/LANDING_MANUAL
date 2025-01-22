"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export function useVirtualAssistant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setShowCaptcha(true);
  };

  const handleVerify = async () => {
    if (!isVerified) {
      toast({
        title: language === "es" ? "Error" : "Error",
        description: language === "es" 
          ? "Por favor, verifica que no eres un robot" 
          : "Please verify that you're not a robot",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setShowCaptcha(false);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: language === "es" 
        ? "¡Mensaje Enviado!" 
        : "Message Sent!",
      description: language === "es"
        ? "Gracias por tu mensaje. Te responderemos pronto."
        : "Thank you for your message. We'll get back to you soon.",
      className: "bg-white border-2 border-[var(--primary-blue)] shadow-lg",
    });
    
    setIsSubmitting(false);
    setIsVerified(false);
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    showCaptcha,
    setShowCaptcha,
    isVerified,
    setIsVerified,
    isSubmitting,
    setIsSubmitting,
    handleSubmit,
    handleVerify
  };
}