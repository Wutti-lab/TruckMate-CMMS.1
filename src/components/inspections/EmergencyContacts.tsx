
import { Phone, Siren, Hospital, FireExtinguisher, AlertTriangle, Car, Building2, Map, MessageSquareWarning } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function EmergencyContacts() {
  const emergencyNumbers = [
    { number: "191", title: "แจ้งเหตุฉุกเฉิน", icon: Siren },
    { number: "199", title: "เหตุฉุกเฉินหลายประเภท", icon: AlertTriangle },
    { number: "199", title: "ดับเพลิง", icon: FireExtinguisher },
    { number: "1193", title: "ตำรวจทางหลวง", icon: Car },
    { number: "1195", title: "สำนักงานอำนวยการ", icon: Building2 },
    { number: "1586", title: "สายด่วน", icon: Phone },
    { number: "1197", title: "กรมทางหลวง", icon: Map },
    { number: "1543", title: "ศูนย์สั่งการและควบคุม", icon: Building2 },
    { number: "1192", title: "แจ้งรถหาย/ถูกขโมย", icon: MessageSquareWarning },
    { number: "1669", title: "หน่วยแพทย์ฉุกเฉิน", icon: Hospital },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {emergencyNumbers.map((contact) => {
        const Icon = contact.icon;
        return (
          <Card key={contact.number} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {contact.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fleet-600">
                {contact.number}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
