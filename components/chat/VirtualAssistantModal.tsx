"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";

interface VirtualAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
  isSubmitting: boolean;
  language: string;
}

export function VirtualAssistantModal({
  isOpen,
  onClose,
  onVerify,
  isVerified,
  setIsVerified,
  isSubmitting,
  language
}: VirtualAssistantModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-2 border-[var(--primary-blue)] shadow-xl max-w-md">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {language === "es" 
              ? "Verificación de Seguridad" 
              : "Security Verification"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6 px-4 bg-white">
          <p className="text-base text-gray-700 text-center font-medium">
            {language === "es" 
              ? "Por favor, completa la verificación para enviar tu mensaje"
              : "Please complete the verification to send your message"}
          </p>
          <div className="transform hover:scale-[1.01] transition-transform bg-white p-4 rounded-lg shadow-sm">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={(value) => setIsVerified(!!value)}
              theme="light"
              size="normal"
            />
          </div>
          <Button
            onClick={onVerify}
            className={`w-full transition-all duration-300 ${
              isVerified 
                ? "bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] hover:opacity-90" 
                : "bg-gray-400"
            } text-white py-2 px-4 rounded-lg text-base font-medium`}
            disabled={!isVerified || isSubmitting}
          >
            {language === "es" ? "Confirmar y Enviar" : "Confirm and Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}