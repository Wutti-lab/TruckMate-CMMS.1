
import React from "react";
import { Link } from "react-router-dom";
import { 
  Truck, Users, Map, ClipboardCheck, QrCode,
  UserCog, Building2, Tag, PanelLeft 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";

type AppFunction = {
  title: {
    en: string;
    de: string;
    th: string;
  };
  description: {
    en: string;
    de: string;
    th: string;
  };
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
};

export function FunctionList() {
  const { language } = useLanguage();
  const { hasRole } = useAuth();
  
  const functions: AppFunction[] = [
    {
      title: {
        en: "Vehicle Management",
        de: "Fahrzeugverwaltung",
        th: "การจัดการยานพาหนะ",
      },
      description: {
        en: "Manage your fleet vehicles, track maintenance and view status",
        de: "Verwalten Sie Ihre Flottenfahrzeuge, verfolgen Sie die Wartung und sehen Sie den Status",
        th: "จัดการยานพาหนะในกองยานพาหนะของคุณ ติดตามการบำรุงรักษา และดูสถานะ",
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
        en: "Manage drivers, assign vehicles and track performance",
        de: "Verwalten Sie Fahrer, weisen Sie Fahrzeuge zu und verfolgen Sie die Leistung",
        th: "จัดการคนขับ มอบหมายยานพาหนะ และติดตามประสิทธิภาพ",
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
        en: "View real-time location of all vehicles on interactive map",
        de: "Sehen Sie den Echtzeit-Standort aller Fahrzeuge auf interaktiver Karte",
        th: "ดูตำแหน่งแบบเรียลไทม์ของยานพาหนะทั้งหมดบนแผนที่แบบอินเทอร์แอ็กทีฟ",
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
        en: "Schedule and track vehicle inspections and maintenance tasks",
        de: "Planen und verfolgen Sie Fahrzeuginspektionen und Wartungsaufgaben",
        th: "กำหนดเวลาและติดตามการตรวจสอบยานพาหนะและงานบำรุงรักษา",
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
        en: "Scan vehicle QR codes to quickly access information",
        de: "Scannen Sie Fahrzeug-QR-Codes für schnellen Informationszugriff",
        th: "สแกน QR โค้ดของยานพาหนะเพื่อเข้าถึงข้อมูลอย่างรวดเร็ว",
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
        en: "Manage user accounts, roles and permissions",
        de: "Verwalten Sie Benutzerkonten, Rollen und Berechtigungen",
        th: "จัดการบัญชีผู้ใช้ บทบาท และสิทธิ์การเข้าถึง",
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
        en: "Manage software customers and licenses",
        de: "Verwalten Sie Softwarekunden und Lizenzen",
        th: "จัดการลูกค้าซอฟต์แวร์และใบอนุญาต",
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
        en: "View and purchase subscription plans",
        de: "Sehen und kaufen Sie Abonnementpläne",
        th: "ดูและซื้อแผนการสมัครสมาชิก",
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
        en: "Manage in-app advertisements and promotions",
        de: "Verwalten Sie In-App-Werbung und Promotionen",
        th: "จัดการโฆษณาและโปรโมชันในแอป",
      },
      icon: PanelLeft,
      path: "/advertisements",
      roles: [UserRole.ADMIN, UserRole.DEV_ADMIN]
    }
  ];

  const getLocalizedTitle = (func: AppFunction) => {
    switch(language) {
      case 'de': return func.title.de;
      case 'th': return func.title.th;
      default: return func.title.en;
    }
  };

  const getLocalizedDescription = (func: AppFunction) => {
    switch(language) {
      case 'de': return func.description.de;
      case 'th': return func.description.th;
      default: return func.description.en;
    }
  };

  const userAccessibleFunctions = functions.filter(func => 
    hasRole(func.roles)
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {userAccessibleFunctions.map((func, index) => (
        <Link key={index} to={func.path} className="block transition-transform hover:scale-105">
          <Card className="h-full border border-gray-200 hover:border-fleet-500 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <func.icon className="h-5 w-5 text-fleet-600" />
                  {getLocalizedTitle(func)}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {getLocalizedDescription(func)}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
