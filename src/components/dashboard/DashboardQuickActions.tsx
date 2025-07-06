import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, UserPlus, Wrench, QrCode, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export function DashboardQuickActions() {
  const { language } = useLanguage();

  const getTitle = () => {
    switch(language) {
      case 'de': return 'Schnellaktionen';
      case 'th': return 'การดำเนินการด่วน';
      default: return 'Quick Actions';
    }
  };

  const actions = [
    {
      icon: Plus,
      label: language === 'de' ? 'Neues Fahrzeug' : language === 'th' ? 'เพิ่มยานพาหนะ' : 'Add Vehicle',
      path: '/vehicles',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: UserPlus,
      label: language === 'de' ? 'Neuer Fahrer' : language === 'th' ? 'เพิ่มคนขับ' : 'Add Driver',
      path: '/drivers',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: FileText,
      label: language === 'de' ? 'Neue Inspektion' : language === 'th' ? 'ตรวจสอบใหม่' : 'New Inspection',
      path: '/inspections',
      color: 'bg-amber-500 hover:bg-amber-600'
    },
    {
      icon: Wrench,
      label: language === 'de' ? 'Wartung planen' : language === 'th' ? 'กำหนดการบำรุง' : 'Schedule Maintenance',
      path: '/vehicles',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: QrCode,
      label: language === 'de' ? 'QR Scanner' : language === 'th' ? 'สแกน QR' : 'QR Scanner',
      path: '/qr-scanner',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      icon: Calendar,
      label: language === 'de' ? 'Termine' : language === 'th' ? 'กำหนดการ' : 'Schedule',
      path: '/inspections',
      color: 'bg-teal-500 hover:bg-teal-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              asChild
              variant="outline"
              className={`h-20 flex flex-col gap-2 ${action.color} text-white border-0`}
            >
              <Link to={action.path}>
                <action.icon className="h-6 w-6" />
                <span className="text-xs text-center">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}