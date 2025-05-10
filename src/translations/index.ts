
import { Language, Translations } from "../types/language";
import { enTranslations } from "./en";
import { thTranslations } from "./th"; // Updated import will point to the new structure
import { deTranslations } from "./de";

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
