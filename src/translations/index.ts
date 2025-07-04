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
  
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found in current language
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if not found in any language
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};