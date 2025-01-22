"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceOptions } from "./ServiceOptions";
import { toast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";
import { useVirtualAssistantForm } from "@/hooks/useVirtualAssistantForm";

interface VirtualAssistantFormProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function VirtualAssistantForm({ onSubmit, isSubmitting }: VirtualAssistantFormProps) {
  const { language } = useLanguage();
  const { formData, handleInputChange, handleServiceToggle, handleSubmit } = useVirtualAssistantForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={formData.companyName}
        onChange={(e) => handleInputChange("companyName", e.target.value)}
        placeholder={language === "es" ? "Nombre de la empresa" : "Company name"}
        className="bg-gray-50"
        required
      />
      
      <Input
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        type="email"
        placeholder={language === "es" ? "Correo electrónico" : "Email"}
        className="bg-gray-50"
        required
      />
      
      <Input
        value={formData.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
        placeholder={language === "es" ? "Número de contacto" : "Contact number"}
        className="bg-gray-50"
        required
      />

      <ServiceOptions 
        selectedServices={formData.selectedServices}
        onToggle={handleServiceToggle}
      />

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white"
        disabled={isSubmitting}
      >
        <Send className="h-4 w-4 mr-2" />
        {isSubmitting 
          ? (language === "es" ? "Enviando..." : "Sending...") 
          : (language === "es" ? "Enviar Mensaje" : "Send Message")}
      </Button>
    </form>
  );
}