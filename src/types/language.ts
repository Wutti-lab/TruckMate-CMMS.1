
// Define available languages
export type Language = 'en' | 'th' | 'de';

// Translation object type
export type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Define the context type
export type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};
