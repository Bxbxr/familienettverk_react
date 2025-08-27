// src/context/LanguageContext.tsx
"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import noMessages from "../../messages/no.json";
import arMessages from "../../messages/ar.json";

// Define the shape of our context
interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  messages: any;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// This is our provider component that will wrap the application
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("no"); // Default language is Norwegian

  // On initial load, check for a saved language in localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const setAndStoreLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale); // Save the choice
  };

  const messages = locale === "ar" ? arMessages : noMessages;

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale: setAndStoreLocale, messages }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// This is a custom hook to make using the context easier
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
