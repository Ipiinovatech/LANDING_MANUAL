"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white p-6 rounded-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6 text-justify">
          <p className="text-lg text-gray-800 leading-relaxed">
            Enfocada en soluciones de TIC'S con IA, y nos caracterizamos por ser una empresa que crea servicios y productos 
            INNOVADORES proyectos de ultima tecnología, creando soluciones innovadoras para nuestros clientes en todos los 
            sectores Corporativos, Gobierno y próximamente en el mercado Masivo.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-800 leading-relaxed">
              Utilizamos metodología
            </p>
            <div className="relative w-40 h-10">
              <Image
                src="/Images/Brochure/Logo_infinito.png"
                alt="Metodología"
                fill
                className="object-contain"
                priority
                sizes="160px"
              />
            </div>
            <p className="text-lg text-gray-800 leading-relaxed">
              que nos permite crear plataformas y servicios de manera ágil y con calidad, 
              generando valor a nuestros clientes, y convirtiéndonos en su mejor aliado.
            </p>
          </div>

          <p className="text-lg text-gray-800 leading-relaxed">
            Ofrecemos productos y servicios en modalidades <span className="font-semibold text-[var(--primary-blue)]">SaaS</span> ("Software como un servicio"), 
            <span className="font-semibold text-[var(--primary-blue)]"> IaaS</span> ("Infraestructura como un servicio"), y 
            <span className="font-semibold text-[var(--primary-blue)]"> PaaS</span> ("Plataforma como un servicio").
          </p>

          <p className="text-lg text-gray-800 leading-relaxed">
            Toda nuestra infraestructura está soportada en uno de los <span className="font-semibold text-[var(--primary-blue)]">CLOUD COMPUTING</span> más grandes del mundo, 
            <span className="font-semibold text-[var(--primary-blue)]"> AWS</span> ("Amazon Web Services"), el cual nos permite crecer la infraestructura de los servicios fácilmente, 
            garantizar la disponibilidad, y dar continuidad de los mismos y trabajamos con una de las mas grandes tecnologías de 
            <span className="font-semibold text-[var(--primary-blue)]"> IA (LLM)</span> como <span className="font-semibold text-[var(--primary-blue)]">Open IA</span>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}