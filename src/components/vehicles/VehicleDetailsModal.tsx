import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Car, 
  MapPin, 
  Fuel, 
  Battery, 
  Thermometer, 
  Calendar,
  Wrench,
  FileText,
  QrCode,
  Edit,
  Trash2,
  Download
} from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { Vehicle } from "./types/VehicleTable";

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

export function VehicleDetailsModal({
  vehicle,
  open,
  onOpenChange,
  onEdit,
  onDelete
}: VehicleDetailsModalProps) {
  const { language } = useLanguage();

  if (!vehicle) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-amber-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return extractLanguageText("Active | Aktiv", language);
      case 'maintenance': return extractLanguageText("In Maintenance | In Wartung", language);
      case 'inactive': return extractLanguageText("Inactive | Inaktiv", language);
      default: return status;
    }
  };

  // Mock maintenance history data
  const maintenanceHistory = [
    {
      id: "1",
      date: "2024-03-15",
      type: extractLanguageText("Oil Change | Ölwechsel", language),
      status: "completed",
      cost: "€150"
    },
    {
      id: "2", 
      date: "2024-02-20",
      type: extractLanguageText("Brake Inspection | Bremsinspektion", language),
      status: "completed",
      cost: "€89"
    },
    {
      id: "3",
      date: "2024-01-10",
      type: extractLanguageText("General Service | Allgemeine Wartung", language),
      status: "completed", 
      cost: "€300"
    }
  ];

  // Mock documents data
  const documents = [
    {
      id: "1",
      name: extractLanguageText("Registration Certificate | Zulassungsbescheinigung", language),
      type: "PDF",
      uploadDate: "2024-01-15"
    },
    {
      id: "2",
      name: extractLanguageText("Insurance Document | Versicherungsdokument", language),
      type: "PDF", 
      uploadDate: "2024-01-20"
    },
    {
      id: "3",
      name: extractLanguageText("Service Manual | Wartungshandbuch", language),
      type: "PDF",
      uploadDate: "2024-01-25"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="flex items-center gap-3">
              <Car className="h-6 w-6" />
              {vehicle.license_plate || vehicle.id}
              <Badge className={`${getStatusColor(vehicle.status || '')} text-white`}>
                {getStatusText(vehicle.status || '')}
              </Badge>
            </DialogTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(vehicle)}>
              <Edit className="h-4 w-4 mr-1" />
              {extractLanguageText("Edit", "Bearbeiten")}
            </Button>
            <Button variant="outline" size="sm">
              <QrCode className="h-4 w-4 mr-1" />
              {extractLanguageText("QR Code", "QR-Code")}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(vehicle.id)}>
              <Trash2 className="h-4 w-4 mr-1" />
              {extractLanguageText("Delete", "Löschen")}
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {extractLanguageText("Overview | Übersicht", language)}
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              {extractLanguageText("Maintenance | Wartung", language)}
            </TabsTrigger>
            <TabsTrigger value="documents">
              {extractLanguageText("Documents | Dokumente", language)}
            </TabsTrigger>
            <TabsTrigger value="history">
              {extractLanguageText("History | Verlauf", language)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    {extractLanguageText("Basic Information | Grundinformationen", language)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{extractLanguageText("Model | Modell", language)}:</span>
                    <span className="font-medium">{vehicle.model || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{extractLanguageText("License Plate | Kennzeichen", language)}:</span>
                    <span className="font-medium">{vehicle.license_plate || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{extractLanguageText("VIN | FIN", language)}:</span>
                    <span className="font-medium">{vehicle.vin || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{extractLanguageText("Year | Baujahr", language)}:</span>
                    <span className="font-medium">{vehicle.year || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{extractLanguageText("Mileage | Kilometerstand", language)}:</span>
                    <span className="font-medium">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : '-'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Battery className="h-5 w-5" />
                    {extractLanguageText("Current Status | Aktueller Status", language)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-blue-500" />
                      <span>{extractLanguageText("Fuel Level | Kraftstoffstand", language)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.random() * 100} className="w-16" />
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-green-500" />
                      <span>{extractLanguageText("Battery | Batterie", language)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.random() * 100} className="w-16" />
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 100)}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <span>{extractLanguageText("Engine Temp | Motortemperatur", language)}</span>
                    </div>
                    <span className="text-sm font-medium">{Math.floor(Math.random() * 40) + 70}°C</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span>{extractLanguageText("Location | Standort", language)}</span>
                    </div>
                    <span className="text-sm font-medium">{vehicle.location || '-'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {extractLanguageText("Service Information | Wartungsinformationen", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {vehicle.next_service ? new Date(vehicle.next_service).toLocaleDateString() : '-'}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {extractLanguageText("Next Service | Nächste Wartung", language)}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {vehicle.insurance_expiry ? new Date(vehicle.insurance_expiry).toLocaleDateString() : '-'}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {extractLanguageText("Insurance Expiry | Versicherungsablauf", language)}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {vehicle.registration_expiry ? new Date(vehicle.registration_expiry).toLocaleDateString() : '-'}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {extractLanguageText("Registration Expiry | Zulassungsablauf", language)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  {extractLanguageText("Maintenance History | Wartungsverlauf", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maintenanceHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.type}</div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.cost}</div>
                        <Badge variant="outline" className="text-xs">
                          {extractLanguageText("Completed | Abgeschlossen", language)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {extractLanguageText("Vehicle Documents | Fahrzeugdokumente", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-red-500" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {extractLanguageText("Uploaded", "Hochgeladen")}: {doc.uploadDate}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        {extractLanguageText("Download", "Herunterladen")}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{extractLanguageText("Activity History | Aktivitätsverlauf", language)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  {extractLanguageText("Activity history will be implemented", "Aktivitätsverlauf wird implementiert")}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}