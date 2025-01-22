"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useServices } from "@/hooks/useServices";

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
      <Select
        onValueChange={onToggle}
      >
        <SelectTrigger className="bg-gray-50">
          <SelectValue 
            placeholder={language === "es" ? "Seleccionar servicios" : "Select services"}
          />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          <ScrollArea className="h-[200px]">
            {services.map((service) => (
              <SelectItem
                key={service.id}
                value={service.id}
                className="relative cursor-pointer py-3 px-4 hover:bg-gray-50 bg-white border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-700 flex-1 [&[data-highlighted]]:pl-4 transition-all duration-200">
                    {service.label}
                  </span>
                  {selectedServices.includes(service.id) && (
                    <Check className="h-4 w-4 text-[var(--primary-blue)] flex-shrink-0 ml-2" />
                  )}
                </div>
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      
      {/* Selected services preview */}
      {selectedServices.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedServices.map((serviceId) => {
            const service = services.find(s => s.id === serviceId);
            return service && (
              <Badge
                key={serviceId}
                variant="secondary"
                className="bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/20"
              >
                <span className="mr-2">{service.label}</span>
                <button
                  type="button"
                  onClick={() => onToggle(serviceId)}
                  className="hover:text-[var(--accent-blue)] inline-flex items-center"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}