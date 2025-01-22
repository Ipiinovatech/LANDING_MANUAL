"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useServices } from "@/hooks/useServices";
import { ServiceList } from "./ServiceList";
import { ServiceBadges } from "./ServiceBadges";

interface ServiceOptionsProps {
  selectedServices: string[];
  onToggle: (service: string) => void;
}

export function ServiceOptions({ selectedServices, onToggle }: ServiceOptionsProps) {
  const { language } = useLanguage();
  const { services } = useServices();

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700 mb-3">
        {language === "es" 
          ? "Selecciona los servicios de tu interés"
          : "Select services of interest"}
      </p>
      <Select onValueChange={onToggle}>
        <SelectTrigger className="bg-gray-50">
          <SelectValue 
            placeholder={language === "es" ? "Seleccionar servicios" : "Select services"}
          />
        </SelectTrigger>
        <ServiceList 
          services={services} 
          selectedServices={selectedServices} 
        />
      </Select>
      
      <ServiceBadges
        selectedServices={selectedServices}
        services={services}
        onToggle={onToggle}
      />
    </div>
  );
}

export * from "./ServiceList";
export * from "./ServiceBadges";