"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ServiceOptions } from "./ServiceOptions";

interface VirtualAssistantFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function VirtualAssistantForm({
  onSubmit,
  isSubmitting,
}: VirtualAssistantFormProps) {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    selectedServices: [] as string[],
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedServices.includes(service);
      return {
        ...prev,
        selectedServices: alreadySelected
          ? prev.selectedServices.filter((s) => s !== service)
          : [...prev.selectedServices, service],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // <-- Esto lo enviará al VirtualAssistant para abrir el captcha
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <Input
        value={formData.companyName}
        onChange={(e) => handleChange("companyName", e.target.value)}
        placeholder={language === "es" ? "Nombre de la empresa" : "Company name"}
        required
        className="bg-gray-50"
      />
      <Input
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder={language === "es" ? "Correo electrónico" : "Email"}
        type="email"
        required
        className="bg-gray-50"
      />
      <Input
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        placeholder={language === "es" ? "Número de contacto" : "Phone number"}
        required
        className="bg-gray-50"
      />

      <ServiceOptions
        selectedServices={formData.selectedServices}
        onToggle={handleServiceToggle}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white"
      >
        <Send className="w-4 h-4 mr-2" />
        {isSubmitting
          ? language === "es"
            ? "Enviando..."
            : "Sending..."
          : language === "es"
            ? "Enviar Mensaje"
            : "Send Message"}
      </Button>
    </form>
  );
}
