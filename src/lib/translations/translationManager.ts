
import { translations } from '@/translations';
import { Language } from '@/types/language';

export type TranslationKey = keyof typeof translations.en;

export class TranslationManager {
  private static instance: TranslationManager;
  private currentLanguage: Language = 'en';

  private constructor() {}

  public static getInstance(): TranslationManager {
    if (!TranslationManager.instance) {
      TranslationManager.instance = new TranslationManager();
    }
    return TranslationManager.instance;
  }

  public setLanguage(language: Language): void {
    this.currentLanguage = language;
  }

  public getLanguage(): Language {
    return this.currentLanguage;
  }

  public translate(key: TranslationKey): string {
    const languageTranslations = translations[this.currentLanguage];
    if (!languageTranslations) {
      console.warn(`Translation not found for language: ${this.currentLanguage}`);
      const fallbackValue = translations.en[key];
      return typeof fallbackValue === 'string' ? fallbackValue : String(key);
    }

    const translatedValue = languageTranslations[key];
    if (translatedValue) {
      return typeof translatedValue === 'string' ? translatedValue : String(translatedValue);
    }
    
    const fallbackValue = translations.en[key];
    return typeof fallbackValue === 'string' ? fallbackValue : String(key);
  }

  public translateWithFallback(text: string, language?: Language): string {
    const lang = language || this.currentLanguage;
    
    // Check if text contains language separators
    if (text.includes(' | ')) {
      const parts = text.split(' | ');
      switch (lang) {
        case 'de':
          return parts[2] || parts[0];
        case 'th':
          return parts[1] || parts[0];
        default:
          return parts[0];
      }
    }
    
    return text;
  }
}

export const translationManager = TranslationManager.getInstance();
