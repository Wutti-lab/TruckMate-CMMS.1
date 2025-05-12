
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Truck, Users, Map, ClipboardCheck, QrCode,
  UserCog, Building2, Tag, PanelLeft 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { hasRole, user } = useAuth();
  const [viewMode, setViewMode] = useState<"user" | "all">("user");
  
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

  const getRoleLabel = (role: UserRole) => {
    switch(language) {
      case 'de':
        switch(role) {
          case UserRole.ADMIN: return 'Administrator';
          case UserRole.DEV_ADMIN: return 'Entwickler-Administrator';
          case UserRole.FLEET_MANAGER: return 'Flottenmanager';
          case UserRole.DRIVER: return 'Fahrer';
          case UserRole.MECHANIC: return 'Mechaniker';
          case UserRole.DISPATCHER: return 'Disponent';
        }
        break;
      case 'th':
        switch(role) {
          case UserRole.ADMIN: return 'ผู้ดูแลระบบ';
          case UserRole.DEV_ADMIN: return 'ผู้ดูแลระบบนักพัฒนา';
          case UserRole.FLEET_MANAGER: return 'ผู้จัดการกองยานพาหนะ';
          case UserRole.DRIVER: return 'คนขับ';
          case UserRole.MECHANIC: return 'ช่างกล';
          case UserRole.DISPATCHER: return 'ผู้จัดส่ง';
        }
        break;
      default:
        switch(role) {
          case UserRole.ADMIN: return 'Administrator';
          case UserRole.DEV_ADMIN: return 'Developer Administrator';
          case UserRole.FLEET_MANAGER: return 'Fleet Manager';
          case UserRole.DRIVER: return 'Driver';
          case UserRole.MECHANIC: return 'Mechanic';
          case UserRole.DISPATCHER: return 'Dispatcher';
        }
    }
  };

  const getViewTitle = () => {
    switch(language) {
      case 'de': return 'Funktionen anzeigen nach';
      case 'th': return 'ดูฟังก์ชันตาม';
      default: return 'View functions by';
    }
  };

  const getUserFunctions = () => {
    return functions.filter(func => hasRole(func.roles));
  };

  // Get functions by role
  const getFunctionsByRole = (role: UserRole) => {
    return functions.filter(func => func.roles.includes(role));
  };

  // All roles used in the system
  const allRoles = Object.values(UserRole);

  // Get current tab key based on user's role
  const getCurrentTabKey = () => {
    if (user) {
      return user.role;
    }
    return UserRole.ADMIN; // Default tab
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {getViewTitle()}
        </h2>
        
        <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as "user" | "all")}>
          <TabsList className="mb-4">
            <TabsTrigger value="user">
              {language === 'de' ? 'Meine Funktionen' : 
               language === 'th' ? 'ฟังก์ชันของฉัน' : 
               'My Functions'}
            </TabsTrigger>
            <TabsTrigger value="all">
              {language === 'de' ? 'Alle Rollen & Funktionen' : 
               language === 'th' ? 'บทบาทและฟังก์ชันทั้งหมด' : 
               'All Roles & Functions'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="mt-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getUserFunctions().map((func, index) => (
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
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <div className="space-y-8">
              {allRoles.map((role) => {
                const roleFunctions = getFunctionsByRole(role);
                
                if (roleFunctions.length === 0) return null;
                
                return (
                  <div key={role} className="border-t pt-4 first:border-t-0 first:pt-0">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-fleet-500 mr-2"></span>
                      {getRoleLabel(role)}
                      <span className="text-sm ml-2 text-muted-foreground">
                        ({roleFunctions.length} {language === 'de' ? 'Funktionen' : 
                                               language === 'th' ? 'ฟังก์ชัน' : 
                                               'functions'})
                      </span>
                    </h3>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {roleFunctions.map((func, index) => (
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
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
