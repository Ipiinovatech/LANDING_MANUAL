"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { translations } from "@/lib/translations";

type Language = "en" | "es";

// ✅ Este tipo acepta cualquier idioma de `translations` (en o es)
type TranslationType = (typeof translations)[keyof typeof translations];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
  version: number;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>("es");
  const [version, setVersion] = useState(0);

  const setLanguage = (lang: Language) => {
    setLang(lang);
    setVersion(v => v + 1);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language], // ✅ Esto ya no causa error
    version,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
