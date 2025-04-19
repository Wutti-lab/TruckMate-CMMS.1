
import { Phone, Siren, Hospital, FireExtinguisher, AlertTriangle, Car, Building2, Road, MessageSquareWarning } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function EmergencyContacts() {
  const emergencyNumbers = [
    { number: "191", title: "Allgemeiner Notfall", icon: Siren },
    { number: "199", title: "Viele Arten von Notfällen", icon: AlertTriangle },
    { number: "199", title: "Feuerwehr", icon: FireExtinguisher },
    { number: "1193", title: "Autobahnpolizei", icon: Car },
    { number: "1195", title: "Direktion", icon: Building2 },
    { number: "1586", title: "Hotline", icon: Phone },
    { number: "1197", title: "Straßenbauamt", icon: Road },
    { number: "1543", title: "Kontrollzentrum und Befehl", icon: Building2 },
    { number: "1192", title: "Fahrzeugverlust / Diebstahl", icon: MessageSquareWarning },
    { number: "1669", title: "Medizinische Einheit", icon: Hospital },
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
