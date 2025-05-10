
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageContextType } from '@/types/language';
import { getTranslation } from '@/translations';

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to extract the current language from bilingual text
export const extractLanguageText = (text: string, language: Language): string => {
  if (!text.includes(' | ')) {
    return text; // Return original if no separator found
  }

  // Split by the separator
  const parts = text.split(' | ');

  switch (language) {
    case 'en':
      return parts[0]; // English is typically first
    case 'th':
      return parts.length > 1 ? parts[1] : parts[0]; // Thai is typically second
    case 'de':
      return parts.length > 0 ? parts[0] : text; // German replaces English position
    default:
      return parts[0]; // Default to first part
  }
};

// Provider component for the language context
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Update language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Re-export types for convenience - FIX: use 'export type' for re-exporting types
export type { Language } from '@/types/language';
