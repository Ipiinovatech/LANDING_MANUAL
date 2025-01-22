"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { Check } from "lucide-react";
import { Service } from "@/hooks/useServices";

interface ServiceListProps {
  services: Service[];
  selectedServices: string[];
}

export function ServiceList({ services, selectedServices }: ServiceListProps) {
  return (
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
  );
}