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
  const [formData, setFormData] = useState<any>(null);

  const handleSubmit = (data: any) => {
    setFormData(data);
    setShowCaptcha(true);
  };

  const handleVerify = async () => {
    if (!isVerified || !formData) {
      toast({
        title: language === "es" ? "Error" : "Error",
        description:
          language === "es"
            ? "Debes llenar el reCAPTCHA y el formulario."
            : "You must complete the reCAPTCHA and fill out the form.",
        variant: "destructive",
        className: "bg-white border-2 border-[var(--primary-blue)] shadow-lg",
      });
      return;
    }

    // Validar correo
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValido) {
      toast({
        title: "Correo inválido",
        description: "Ingresa un correo electrónico válido.",
        variant: "destructive",
        className: "bg-white border-2 border-[var(--primary-blue)] shadow-lg",
      });
      return;
    }

    // Validar teléfono: exactamente 10 dígitos numéricos
    const telefonoLimpio = formData.phone.replace(/\D/g, "");
    if (telefonoLimpio.length !== 10) {
      toast({
        title: "Teléfono inválido",
        description: "El número de teléfono debe tener exactamente 10 dígitos.",
        variant: "destructive",
        className: "bg-white border-2 border-[var(--primary-blue)] shadow-lg",
      });
      return;
    }

    // Formatear número con +57
    const telefonoFormateado = formData.phone.startsWith("+")
      ? formData.phone
      : `+57${telefonoLimpio}`;

    // Calcular fecha límite (24 horas después)
    const fechaLimite = Date.now() + 24 * 60 * 60 * 1000;

    setIsSubmitting(true);
    setShowCaptcha(false);

    try {
      const response = await fetch("/api/conectar_clickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.companyName,
          descripcion: `
          Empresa: ${formData.companyName}
          Correo: ${formData.email}
          Teléfono: ${telefonoFormateado}
          Servicios seleccionados: ${formData.selectedServices?.join(", ")}`,
          prioridad: 2,
          assignees: [132210423],
          due_date: fechaLimite,
          customFields: {
            nombreEmpresa: formData.companyName,
            correo: formData.email,
            telefono: telefonoFormateado,
            servicio: formData.selectedServices?.join(", "),
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error("Error al crear la tarea");

      toast({
        title:
          language === "es"
            ? "Caso creado en ClickUp"
            : "Case created in ClickUp",
        description: `ID: ${result.id || "verifica en ClickUp"}`,
        className: "bg-white border-2 border-[var(--primary-blue)] shadow-lg",
      });

      setFormData(null);
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title:
          language === "es"
            ? "Error al crear el caso"
            : "Error creating case",
        description: error.message,
        variant: "destructive",
        className: "bg-white border-2 border-[var(--primary-blue)] shadow-lg",
      });
    } finally {
      setIsSubmitting(false);
      setIsVerified(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    showCaptcha,
    setShowCaptcha,
    isVerified,
    setIsVerified,
    isSubmitting,
    handleSubmit,
    handleVerify,
  };
}
