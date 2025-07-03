import { Language, Translations } from "../types/language";
import { enTranslations } from "./en/index";
import { thTranslations } from "./th"; 
import { deTranslations } from "./de/index";

// Combine all translations
export const translations: Translations = {
  en: enTranslations,
  th: thTranslations,
  de: deTranslations
};

// Helper function to get translation
export const getTranslation = (language: Language, key: string): string => {
  if (!translations[language]) {
    return key; // Fallback if language is not available
  }
  return translations[language][key] || translations.en[key] || key;
};