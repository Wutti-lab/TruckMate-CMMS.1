
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'th' | 'de';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object type
export type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Translations for all languages
const translations: Translations = {
  en: {
    // Login page
    "login": "Login",
    "email": "Email",
    "password": "Password",
    "rememberMe": "Remember me",
    "forgotPassword": "Forgot password?",
    "loginButton": "Log in",
    "loggingIn": "Logging in...",
    "testAccounts": "Test Accounts:",
    "passwordForAll": "Password for all:",
    "viewPricingPlans": "View pricing plans",
    "enterCredentials": "Enter your credentials to access your account",
    "easyVehicleManagement": "Easy vehicle management system",
    
    // Dashboard
    "dashboard": "Dashboard",
    "vehicles": "Vehicles",
    "drivers": "Drivers",
    "map": "Map",
    "inspections": "Inspections",
    "qrScanner": "QR Scanner",
    "accounts": "Accounts",
    "advertisements": "Advertisements",
    
    // Notifications
    "loginSuccessful": "Login successful",
    "welcomeTo": "Welcome to TruckMate CMMS",
    "loginFailed": "Login failed",
    "invalidCredentials": "Invalid email or password. Please try again."
  },
  th: {
    // Login page
    "login": "เข้าสู่ระบบ",
    "email": "อีเมล",
    "password": "รหัสผ่าน",
    "rememberMe": "จดจำฉัน",
    "forgotPassword": "ลืมรหัสผ่าน?",
    "loginButton": "เข้าสู่ระบบ",
    "loggingIn": "กำลังเข้าสู่ระบบ...",
    "testAccounts": "บัญชีทดสอบ:",
    "passwordForAll": "รหัสผ่านทั้งหมด:",
    "viewPricingPlans": "ดูแผนราคา",
    "enterCredentials": "ป้อนข้อมูลประจำตัวของคุณเพื่อเข้าถึงบัญชีของคุณ",
    "easyVehicleManagement": "ระบบจัดการยานพาหนะที่ง่ายดาย",
    
    // Dashboard
    "dashboard": "แดชบอร์ด",
    "vehicles": "ยานพาหนะ",
    "drivers": "คนขับรถ",
    "map": "แผนที่",
    "inspections": "การตรวจสอบ",
    "qrScanner": "เครื่องสแกน QR",
    "accounts": "บัญชี",
    "advertisements": "โฆษณา",
    
    // Notifications
    "loginSuccessful": "เข้าสู่ระบบสำเร็จ",
    "welcomeTo": "ยินดีต้อนรับสู่ TruckMate CMMS",
    "loginFailed": "เข้าสู่ระบบล้มเหลว",
    "invalidCredentials": "อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง"
  },
  de: {
    // Login page
    "login": "Anmelden",
    "email": "E-Mail",
    "password": "Passwort",
    "rememberMe": "Angemeldet bleiben",
    "forgotPassword": "Passwort vergessen?",
    "loginButton": "Anmelden",
    "loggingIn": "Anmeldung läuft...",
    "testAccounts": "Testkonten:",
    "passwordForAll": "Passwort für alle:",
    "viewPricingPlans": "Preispläne anzeigen",
    "enterCredentials": "Geben Sie Ihre Anmeldedaten ein, um auf Ihr Konto zuzugreifen",
    "easyVehicleManagement": "Einfaches Fahrzeugmanagementsystem",
    
    // Dashboard
    "dashboard": "Dashboard",
    "vehicles": "Fahrzeuge",
    "drivers": "Fahrer",
    "map": "Karte",
    "inspections": "Inspektionen",
    "qrScanner": "QR-Scanner",
    "accounts": "Konten",
    "advertisements": "Werbung",
    
    // Notifications
    "loginSuccessful": "Anmeldung erfolgreich",
    "welcomeTo": "Willkommen bei TruckMate CMMS",
    "loginFailed": "Anmeldung fehlgeschlagen",
    "invalidCredentials": "Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut."
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
    if (!translations[language]) {
      return key; // Fallback if language is not available
    }
    return translations[language][key] || translations.en[key] || key;
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
