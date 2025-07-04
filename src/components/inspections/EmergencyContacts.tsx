
import { Phone, Siren, Hospital, FireExtinguisher, AlertTriangle, Car, Building2, Map, MessageSquareWarning, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function EmergencyContacts() {
  const emergencyNumbers = [
    { id: "emer-191", number: "191", title: "แจ้งเหตุฉุกเฉิน", icon: Siren },
    { id: "emer-199-1", number: "199", title: "เหตุฉุกเฉินหลายประเภท", icon: AlertTriangle },
    { id: "fire-199", number: "199", title: "ดับเพลิง", icon: FireExtinguisher },
    { id: "police-1193", number: "1193", title: "ตำรวจทางหลวง", icon: Car },
    { id: "office-1195", number: "1195", title: "สำนักงานอำนวยการ", icon: Building2 },
    { id: "hotline-1586", number: "1586", title: "สายด่วน", icon: Phone },
    { id: "highway-1197", number: "1197", title: "กรมทางหลวง", icon: Map },
    { id: "control-1543", number: "1543", title: "ศูนย์สั่งการและควบคุม", icon: Building2 },
    { id: "theft-1192", number: "1192", title: "แจ้งรถหาย/ถูกขโมย", icon: MessageSquareWarning },
    { id: "medical-1669", number: "1669", title: "หน่วยแพทย์ฉุกเฉิน", icon: Hospital },
  ];

  const insuranceContacts = [
    { id: "ins-hdi", company: "HDI Fleet Premium", phone: "+49 30 1234567", icon: ShieldCheck },
    { id: "ins-allianz", company: "Allianz MobilSchutz", phone: "+49 30 2345678", icon: ShieldCheck },
    { id: "ins-huk24", company: "HUK24 Komfort", phone: "+49 30 3456789", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Emergency Numbers | เบอร์โทรฉุกเฉิน</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {emergencyNumbers.map((contact) => {
            const Icon = contact.icon;
            return (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
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
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Insurance Contacts | ข้อมูลติดต่อประกัน</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insuranceContacts.map((insurance) => {
            const Icon = insurance.icon;
            return (
              <Card key={insurance.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {insurance.company}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <a 
                    href={`tel:${insurance.phone.replace(/\s+/g, "")}`} 
                    className="text-lg font-medium flex items-center gap-2 hover:underline">
                    <Phone size={18} className="text-green-600" />
                    {insurance.phone}
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
