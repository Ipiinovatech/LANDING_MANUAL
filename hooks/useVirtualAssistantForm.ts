"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  companyName: string;
  email: string;
  phone: string;
  selectedServices: string[];
}

export function useVirtualAssistantForm(onSubmit: () => void) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    phone: "",
    selectedServices: []
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.email || !formData.phone || formData.selectedServices.length === 0) {
      toast({
        title: language === "es" ? "Error" : "Error",
        description: language === "es" 
          ? "Por favor, completa todos los campos y selecciona al menos un servicio" 
          : "Please fill in all fields and select at least one service",
        variant: "destructive",
      });
      return;
    }

    onSubmit();
  };

  return {
    formData,
    handleInputChange,
    handleServiceToggle,
    handleSubmit
  };
}