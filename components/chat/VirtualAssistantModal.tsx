"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ReCAPTCHA from "react-google-recaptcha";

interface VirtualAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
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
  language,
}: VirtualAssistantModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] text-center bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">
          {language === "es" ? "Verificación" : "Verification"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {language === "es"
            ? "Por favor confirma que no eres un robot"
            : "Please confirm you're not a robot"}
        </p>

        <div className="flex justify-center items-center min-h-[100px] mb-4">
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={(value) => setIsVerified(!!value)}
            theme="light"
            size="normal"
          />
        </div>

        <Button
          onClick={onVerify}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white"
        >
          {language === "es"
            ? isSubmitting
              ? "Enviando..."
              : "Confirmar y Enviar"
            : isSubmitting
              ? "Sending..."
              : "Confirm and Send"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
