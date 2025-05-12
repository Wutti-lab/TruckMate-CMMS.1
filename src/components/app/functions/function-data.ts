
import { 
  Truck, Users, Map, ClipboardCheck, QrCode,
  UserCog, Building2, Tag, PanelLeft 
} from "lucide-react";
import { UserRole } from "@/lib/types/user-roles";
import { AppFunction } from "./types";

export const appFunctions: AppFunction[] = [
  {
    title: {
      en: "Vehicle Management",
      de: "Fahrzeugverwaltung",
      th: "การจัดการยานพาหนะ",
    },
    description: {
      en: "Manage your fleet vehicles, track maintenance and view status. Includes vehicle registration, service history, fuel consumption tracking, and lifecycle management.",
      de: "Verwalten Sie Ihre Flottenfahrzeuge, verfolgen Sie die Wartung und sehen Sie den Status. Beinhaltet Fahrzeugregistrierung, Wartungshistorie, Kraftstoffverbrauchsverfolgung und Lebenszyklus-Management.",
      th: "จัดการยานพาหนะในกองยานพาหนะของคุณ ติดตามการบำรุงรักษา และดูสถานะ รวมถึงการลงทะเบียนยานพาหนะ ประวัติการบริการ การติดตามการใช้เชื้อเพลิง และการจัดการวงจรชีวิต",
    },
    icon: Truck,
    path: "/vehicles",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN, UserRole.FLEET_MANAGER]
  },
  {
    title: {
      en: "Driver Management",
      de: "Fahrerverwaltung",
      th: "การจัดการคนขับ",
    },
    description: {
      en: "Manage drivers, assign vehicles and track performance. Includes driver documentation, license management, working hours tracking, and performance analytics.",
      de: "Verwalten Sie Fahrer, weisen Sie Fahrzeuge zu und verfolgen Sie die Leistung. Beinhaltet Fahrerdokumentation, Lizenzverwaltung, Arbeitszeiterfassung und Leistungsanalysen.",
      th: "จัดการคนขับ มอบหมายยานพาหนะ และติดตามประสิทธิภาพ รวมถึงเอกสารของคนขับ การจัดการใบอนุญาต การติดตามชั่วโมงทำงาน และการวิเคราะห์ประสิทธิภาพ",
    },
    icon: Users,
    path: "/drivers",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN, UserRole.FLEET_MANAGER]
  },
  {
    title: {
      en: "Live Tracking Map",
      de: "Live-Tracking-Karte",
      th: "แผนที่ติดตามแบบเรียลไทม์",
    },
    description: {
      en: "View real-time location of all vehicles on interactive map. Features include route planning, geo-fencing alerts, historical route data, and traffic integration.",
      de: "Sehen Sie den Echtzeit-Standort aller Fahrzeuge auf interaktiver Karte. Funktionen umfassen Routenplanung, Geo-Fencing-Alarme, historische Routendaten und Verkehrsintegration.",
      th: "ดูตำแหน่งแบบเรียลไทม์ของยานพาหนะทั้งหมดบนแผนที่แบบอินเทอร์แอ็กทีฟ คุณสมบัติรวมถึงการวางแผนเส้นทาง การแจ้งเตือนการกำหนดพื้นที่ทางภูมิศาสตร์ ข้อมูลเส้นทางในอดีต และการรวมการจราจร",
    },
    icon: Map,
    path: "/map",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN, UserRole.FLEET_MANAGER, UserRole.DISPATCHER]
  },
  {
    title: {
      en: "Inspections",
      de: "Inspektionen",
      th: "การตรวจสอบ",
    },
    description: {
      en: "Schedule and track vehicle inspections and maintenance tasks. Includes customizable inspection checklists, maintenance scheduling, defect reporting, and repair tracking.",
      de: "Planen und verfolgen Sie Fahrzeuginspektionen und Wartungsaufgaben. Beinhaltet anpassbare Inspektions-Checklisten, Wartungsplanung, Defektmeldungen und Reparaturverfolgung.",
      th: "กำหนดเวลาและติดตามการตรวจสอบยานพาหนะและงานบำรุงรักษา รวมถึงรายการตรวจสอบที่ปรับแต่งได้ การกำหนดการบำรุงรักษา การรายงานข้อบกพร่อง และการติดตามการซ่อมแซม",
    },
    icon: ClipboardCheck,
    path: "/inspections",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN, UserRole.FLEET_MANAGER, UserRole.MECHANIC, UserRole.DRIVER]
  },
  {
    title: {
      en: "QR Scanner",
      de: "QR-Scanner",
      th: "เครื่องสแกน QR",
    },
    description: {
      en: "Scan vehicle QR codes to quickly access information. Access vehicle details, maintenance history, inspection reports, and perform quick actions directly from the field.",
      de: "Scannen Sie Fahrzeug-QR-Codes für schnellen Informationszugriff. Greifen Sie auf Fahrzeugdetails, Wartungshistorie und Inspektionsberichte zu und führen Sie schnelle Aktionen direkt vor Ort durch.",
      th: "สแกน QR โค้ดของยานพาหนะเพื่อเข้าถึงข้อมูลอย่างรวดเร็ว เข้าถึงรายละเอียดยานพาหนะ ประวัติการบำรุงรักษา รายงานการตรวจสอบ และดำเนินการอย่างรวดเร็วโดยตรงจากภาคสนาม",
    },
    icon: QrCode,
    path: "/qr-scanner",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN, UserRole.DRIVER, UserRole.FLEET_MANAGER]
  },
  {
    title: {
      en: "Account Management",
      de: "Kontoverwaltung",
      th: "การจัดการบัญชี",
    },
    description: {
      en: "Manage user accounts, roles and permissions. Create new users, assign roles, set access levels, and monitor account activity and security logs.",
      de: "Verwalten Sie Benutzerkonten, Rollen und Berechtigungen. Erstellen Sie neue Benutzer, weisen Sie Rollen zu, legen Sie Zugriffsebenen fest und überwachen Sie Kontoaktivitäten und Sicherheitsprotokolle.",
      th: "จัดการบัญชีผู้ใช้ บทบาท และสิทธิ์การเข้าถึง สร้างผู้ใช้ใหม่ กำหนดบทบาท กำหนดระดับการเข้าถึง และตรวจสอบกิจกรรมบัญชีและบันทึกความปลอดภัย",
    },
    icon: UserCog,
    path: "/accounts",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN]
  },
  {
    title: {
      en: "Customer Management",
      de: "Kundenverwaltung",
      th: "การจัดการลูกค้า",
    },
    description: {
      en: "Manage software customers and licenses. Track customer information, manage subscription status, generate license keys, and view usage analytics.",
      de: "Verwalten Sie Softwarekunden und Lizenzen. Verfolgen Sie Kundeninformationen, verwalten Sie den Abonnementstatus, generieren Sie Lizenzschlüssel und sehen Sie Nutzungsanalysen ein.",
      th: "จัดการลูกค้าซอฟต์แวร์และใบอนุญาต ติดตามข้อมูลลูกค้า จัดการสถานะการสมัครสมาชิก สร้างคีย์ใบอนุญาต และดูการวิเคราะห์การใช้งาน",
    },
    icon: Building2,
    path: "/customers",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN, UserRole.FLEET_MANAGER]
  },
  {
    title: {
      en: "Pricing Plans",
      de: "Preispläne",
      th: "แผนราคา",
    },
    description: {
      en: "View and purchase subscription plans. Compare feature sets across different tiers, manage billing information, view payment history, and upgrade or downgrade subscriptions.",
      de: "Sehen und kaufen Sie Abonnementpläne. Vergleichen Sie Funktionsumfänge verschiedener Stufen, verwalten Sie Zahlungsinformationen, sehen Sie den Zahlungsverlauf ein und führen Sie Upgrades oder Downgrades durch.",
      th: "ดูและซื้อแผนการสมัครสมาชิก เปรียบเทียบชุดคุณสมบัติในระดับต่างๆ จัดการข้อมูลการเรียกเก็บเงิน ดูประวัติการชำระเงิน และอัปเกรดหรือดาวน์เกรดการสมัครสมาชิก",
    },
    icon: Tag,
    path: "/pricing",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN, UserRole.FLEET_MANAGER, UserRole.DRIVER, UserRole.MECHANIC, UserRole.DISPATCHER]
  },
  {
    title: {
      en: "Advertisement Management",
      de: "Werbeverwaltung",
      th: "การจัดการโฆษณา",
    },
    description: {
      en: "Manage in-app advertisements and promotions. Create and schedule campaigns, target specific user segments, view impression and click analytics, and manage ad content.",
      de: "Verwalten Sie In-App-Werbung und Promotionen. Erstellen und planen Sie Kampagnen, zielen Sie auf bestimmte Benutzersegmente ab, sehen Sie Impressions- und Klickanalysen ein und verwalten Sie Werbeinhalte.",
      th: "จัดการโฆษณาและโปรโมชันในแอป สร้างและกำหนดเวลาแคมเปญ กำหนดเป้าหมายเฉพาะกลุ่มผู้ใช้ ดูการวิเคราะห์การแสดงผลและการคลิก และจัดการเนื้อหาโฆษณา",
    },
    icon: PanelLeft,
    path: "/advertisements",
    roles: [UserRole.ADMIN, UserRole.DEV_ADMIN]
  }
];
