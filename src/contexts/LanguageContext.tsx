
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
    "fleetStatus": "Fleet Status",
    "vehiclesInService": "vehicles in service",
    "fuelEfficiency": "Fuel Efficiency",
    "betterThanLastMonth": "better than last month",
    "driverStatus": "Driver Status",
    "driversOnDuty": "drivers on duty",
    "available": "available",
    "maintenance": "Maintenance",
    "awaitingMaintenance": "Awaiting maintenance",
    "oilPriceCosts": "Oil Price & Costs",
    "currentOilPriceAndTotal": "Current oil price and total cost",
    "avgConsumption": "Avg. consumption",
    "perVehicle": "per vehicle",
    "fleet": "Fleet",
    "totalCost": "Total cost",
    "vehiclePerformance": "Vehicle Performance",
    "perVehicleText": "Per vehicle",
    "costPerVehicle": "Cost/vehicle",
    "fleetOverview": "Fleet Overview",
    "currentVehicleStatus": "Current vehicle status",
    "recentActivities": "Recent Activities",
    "realTimeFleetUpdates": "Real-time fleet updates",
    "addNewActivity": "Add New Activity",
    "activityType": "Activity Type",
    "selectActivityType": "Select activity type",
    "activityDescription": "Activity Description",
    "enterActivityDescription": "Enter activity description",
    "addActivity": "Add Activity",
    "vehicleArrival": "Vehicle Arrival",
    "maintenanceRequest": "Maintenance Request",
    "fuelWarning": "Fuel Warning",
    "driverUpdate": "Driver Update",
    "routeUpdate": "Route Update",
    "justNow": "Just now",
    "minutesAgo": "minutes ago",
    "hourAgo": "hour ago",
    "hoursAgo": "hours ago",
    "welcomeBack": "Welcome back! Here is an overview of your fleet",
    
    // Inspections
    "newInspection": "New Inspection",
    "cancel": "Cancel",
    
    // Account Management
    "accountManagement": "Account Management",
    "searchAccounts": "Search accounts...",
    "createAccount": "Create Account",
    "activeAccounts": "Active Accounts",
    "pendingApprovals": "Pending Approvals",
    "userAccounts": "User Accounts",
    "pendingAccounts": "Pending Accounts",
    "requiresApproval": "Requires approval",
    
    // Driver Form
    "licenseQualification": "License & Qualification",
    "medicalExaminations": "Medical Examinations",
    "addDriver": "Add Driver",
    "driverInfoSaved": "Driver information saved",
    "driverAddedSuccess": "The driver has been added successfully",
    
    // Train Status
    "trainStatus": "Train Status",
    "ratioOfTrains": "Ratio of trains by status (Running / Maintenance / Idle)",
    
    // Login Activities
    "loginActivities": "Login Activities",
    "allUserLoginActivities": "All user login activities",
    "loginActivitiesForDrivers": "Login activities for drivers",
    "loginActivitiesForMechanics": "Login activities for mechanics",
    "yourLoginActivities": "Your login activities",
    "user": "User",
    "role": "Role",
    "time": "Time",
    "noLoginActivities": "No login activities yet",
    "logInToSeeActivity": "Log in to see activity records",
    
    // Register Form
    "name": "Name",
    "confirmPassword": "Confirm Password",
    "createAccountButton": "Create Account",
    
    // Vehicle Status
    "active": "Active",
    "maintenance": "Maintenance",
    "idle": "Idle",
    "running": "Running",
    
    // Statuses and activities
    "vehicleArrived": "Vehicle B-FR 323 has arrived at destination",
    "newMaintenanceRequest": "New maintenance request for B-FR 423",
    "lowFuel": "Low fuel in B-FR 123",
    "driverStartedShift": "Driver M. Schmidt started shift",
    "routeUpdated": "Route updated for B-FR 223"
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
    "fleetStatus": "สถานะกองยานพาหนะ",
    "vehiclesInService": "รถกำลังให้บริการ",
    "fuelEfficiency": "ประสิทธิภาพการใช้เชื้อเพลิง",
    "betterThanLastMonth": "ดีขึ้นจากเดือนที่แล้ว",
    "driverStatus": "สถานะคนขับ",
    "driversOnDuty": "คนขับกำลังปฏิบัติงาน",
    "available": "ความพร้อม",
    "maintenance": "การบำรุงรักษา",
    "awaitingMaintenance": "รอการบำรุงรักษา",
    "oilPriceCosts": "น้ำมันและต้นทุน",
    "currentOilPriceAndTotal": "ราคาน้ำมันและต้นทุนรวม",
    "avgConsumption": "การบริโภคเฉลี่ย",
    "perVehicle": "ต่อยานพาหนะ",
    "fleet": "กองรถ",
    "totalCost": "ต้นทุนรวม",
    "vehiclePerformance": "ประสิทธิภาพของยานพาหนะ",
    "perVehicleText": "ต่อคัน",
    "costPerVehicle": "ต้นทุน/คัน",
    "fleetOverview": "ภาพรวมกองยานพาหนะ",
    "currentVehicleStatus": "สถานะรถปัจจุบัน",
    "recentActivities": "กิจกรรมล่าสุด",
    "realTimeFleetUpdates": "การอัพเดตกองยานพาหนะแบบเรียลไทม์",
    "addNewActivity": "เพิ่มกิจกรรมใหม่",
    "activityType": "ประเภทกิจกรรม",
    "selectActivityType": "เลือกประเภทกิจกรรม",
    "activityDescription": "รายละเอียดกิจกรรม",
    "enterActivityDescription": "ป้อนรายละเอียดกิจกรรม",
    "addActivity": "เพิ่มกิจกรรม",
    "vehicleArrival": "การมาถึงของยานพาหนะ",
    "maintenanceRequest": "คำขอบำรุงรักษา",
    "fuelWarning": "คำเตือนน้ำมัน",
    "driverUpdate": "อัปเดตคนขับ",
    "routeUpdate": "อัปเดตเส้นทาง",
    "justNow": "เมื่อสักครู่",
    "minutesAgo": "นาทีที่แล้ว",
    "hourAgo": "ชั่วโมงที่แล้ว",
    "hoursAgo": "ชั่วโมงที่แล้ว",
    "welcomeBack": "ยินดีต้อนรับกลับ นี่คือภาพรวมของกองยานพาหนะของคุณ",
    
    // Inspections
    "newInspection": "การตรวจสอบใหม่",
    "cancel": "ยกเลิก",
    
    // Account Management
    "accountManagement": "การจัดการบัญชี",
    "searchAccounts": "ค้นหาบัญชี...",
    "createAccount": "สร้างบัญชี",
    "activeAccounts": "บัญชีที่ใช้งาน",
    "pendingApprovals": "รออนุมัติ",
    "userAccounts": "บัญชีผู้ใช้",
    "pendingAccounts": "บัญชีรออนุมัติ",
    "requiresApproval": "ต้องการการอนุมัติ",
    
    // Driver Form
    "licenseQualification": "ใบอนุญาตและคุณสมบัติ",
    "medicalExaminations": "การตรวจสุขภาพ",
    "addDriver": "เพิ่มคนขับ",
    "driverInfoSaved": "บันทึกข้อมูลคนขับแล้ว",
    "driverAddedSuccess": "เพิ่มคนขับเรียบร้อยแล้ว",
    
    // Train Status
    "trainStatus": "สถานะขบวนรถไฟ",
    "ratioOfTrains": "สัดส่วนสถานะของขบวนรถไฟแต่ละประเภท",
    
    // Login Activities
    "loginActivities": "กิจกรรมการเข้าสู่ระบบ",
    "allUserLoginActivities": "กิจกรรมการเข้าสู่ระบบของผู้ใช้ทั้งหมด",
    "loginActivitiesForDrivers": "กิจกรรมการเข้าสู่ระบบของคนขับ",
    "loginActivitiesForMechanics": "กิจกรรมการเข้าสู่ระบบของช่างซ่อม",
    "yourLoginActivities": "กิจกรรมการเข้าสู่ระบบของคุณ",
    "user": "ผู้ใช้",
    "role": "บทบาท",
    "time": "เวลา",
    "noLoginActivities": "ยังไม่มีกิจกรรมการเข้าสู่ระบบ",
    "logInToSeeActivity": "เข้าสู่ระบบเพื่อดูบันทึกกิจกรรม",
    
    // Register Form
    "name": "ชื่อ",
    "confirmPassword": "ยืนยันรหัสผ่าน",
    "createAccountButton": "สร้างบัญชี",
    
    // Vehicle Status
    "active": "กำลังใช้งาน",
    "maintenance": "อยู่ระหว่างซ่อมบำรุง",
    "idle": "จอดพัก",
    "running": "วิ่ง",
    
    // Statuses and activities
    "vehicleArrived": "รถทะเบียน B-FR 323 ถึงจุดหมายแล้ว",
    "newMaintenanceRequest": "คำขอบำรุงรักษาใหม่สำหรับ B-FR 423",
    "lowFuel": "น้ำมันเหลือน้อยใน B-FR 123",
    "driverStartedShift": "คนขับ M. Schmidt เริ่มกะ",
    "routeUpdated": "อัปเดตเส้นทางสำหรับ B-FR 223"
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
    "fleetStatus": "Flottenstatus",
    "vehiclesInService": "Fahrzeuge im Einsatz",
    "fuelEfficiency": "Kraftstoffeffizienz",
    "betterThanLastMonth": "besser als im letzten Monat",
    "driverStatus": "Fahrerstatus",
    "driversOnDuty": "Fahrer im Dienst",
    "available": "verfügbar",
    "maintenance": "Wartung",
    "awaitingMaintenance": "Wartung ausstehend",
    "oilPriceCosts": "Ölpreis & Kosten",
    "currentOilPriceAndTotal": "Aktueller Ölpreis und Gesamtkosten",
    "avgConsumption": "Durchschn. Verbrauch",
    "perVehicle": "pro Fahrzeug",
    "fleet": "Flotte",
    "totalCost": "Gesamtkosten",
    "vehiclePerformance": "Fahrzeugleistung",
    "perVehicleText": "Pro Fahrzeug",
    "costPerVehicle": "Kosten/Fahrzeug",
    "fleetOverview": "Flottenübersicht",
    "currentVehicleStatus": "Aktueller Fahrzeugstatus",
    "recentActivities": "Neueste Aktivitäten",
    "realTimeFleetUpdates": "Echtzeit-Flottenaktualisierungen",
    "addNewActivity": "Neue Aktivität hinzufügen",
    "activityType": "Aktivitätstyp",
    "selectActivityType": "Aktivitätstyp auswählen",
    "activityDescription": "Aktivitätsbeschreibung",
    "enterActivityDescription": "Aktivitätsbeschreibung eingeben",
    "addActivity": "Aktivität hinzufügen",
    "vehicleArrival": "Fahrzeugankunft",
    "maintenanceRequest": "Wartungsanfrage",
    "fuelWarning": "Kraftstoffwarnung",
    "driverUpdate": "Fahreraktualisierung",
    "routeUpdate": "Routenaktualisierung",
    "justNow": "Gerade eben",
    "minutesAgo": "Minuten",
    "hourAgo": "Stunde",
    "hoursAgo": "Stunden",
    "welcomeBack": "Willkommen zurück! Hier ist ein Überblick über Ihre Flotte",
    
    // Inspections
    "newInspection": "Neue Inspektion",
    "cancel": "Abbrechen",
    
    // Account Management
    "accountManagement": "Kontoverwaltung",
    "searchAccounts": "Konten suchen...",
    "createAccount": "Konto erstellen",
    "activeAccounts": "Aktive Konten",
    "pendingApprovals": "Ausstehende Genehmigungen",
    "userAccounts": "Benutzerkonten",
    "pendingAccounts": "Ausstehende Konten",
    "requiresApproval": "Genehmigung erforderlich",
    
    // Driver Form
    "licenseQualification": "Lizenz & Qualifikation",
    "medicalExaminations": "Medizinische Untersuchungen",
    "addDriver": "Fahrer hinzufügen",
    "driverInfoSaved": "Fahrerinformationen gespeichert",
    "driverAddedSuccess": "Der Fahrer wurde erfolgreich hinzugefügt",
    
    // Train Status
    "trainStatus": "Zugstatus",
    "ratioOfTrains": "Verhältnis der Züge nach Status (In Betrieb / Wartung / Stillstehend)",
    
    // Login Activities
    "loginActivities": "Anmeldeaktivitäten",
    "allUserLoginActivities": "Alle Benutzeranmeldeaktivitäten",
    "loginActivitiesForDrivers": "Anmeldeaktivitäten für Fahrer",
    "loginActivitiesForMechanics": "Anmeldeaktivitäten für Mechaniker",
    "yourLoginActivities": "Ihre Anmeldeaktivitäten",
    "user": "Benutzer",
    "role": "Rolle",
    "time": "Zeit",
    "noLoginActivities": "Noch keine Anmeldeaktivitäten",
    "logInToSeeActivity": "Melden Sie sich an, um Aktivitätsaufzeichnungen zu sehen",
    
    // Register Form
    "name": "Name",
    "confirmPassword": "Passwort bestätigen",
    "createAccountButton": "Konto erstellen",
    
    // Vehicle Status
    "active": "Aktiv",
    "maintenance": "Wartung",
    "idle": "Inaktiv",
    "running": "In Betrieb",
    
    // Statuses and activities
    "vehicleArrived": "Fahrzeug B-FR 323 ist am Ziel angekommen",
    "newMaintenanceRequest": "Neue Wartungsanfrage für B-FR 423",
    "lowFuel": "Niedriger Kraftstoffstand in B-FR 123",
    "driverStartedShift": "Fahrer M. Schmidt hat Schicht begonnen",
    "routeUpdated": "Route für B-FR 223 aktualisiert"
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
