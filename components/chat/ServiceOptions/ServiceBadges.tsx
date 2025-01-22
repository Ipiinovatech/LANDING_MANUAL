"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Service } from "@/hooks/useServices";

interface ServiceBadgesProps {
  selectedServices: string[];
  services: Service[];
  onToggle: (serviceId: string) => void;
}

export function ServiceBadges({ selectedServices, services, onToggle }: ServiceBadgesProps) {
  if (selectedServices.length === 0) return null;

  return (
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
  );
}