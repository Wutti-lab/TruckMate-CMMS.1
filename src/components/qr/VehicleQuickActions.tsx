import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Wrench, 
  FileText, 
  Calendar, 
  Phone, 
  Navigation,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface VehicleQuickActionsProps {
  vehicleData: any;
}

export function VehicleQuickActions({ vehicleData }: VehicleQuickActionsProps) {
  const { language } = useLanguage();

  const getStatusBadge = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'active':
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {extractLanguageText("Active | ใช้งาน", language)}
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge variant="secondary" className="bg-amber-500">
            <Wrench className="w-3 h-3 mr-1" />
            {extractLanguageText("Maintenance | ซ่อมบำรุง", language)}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {status || 'Unknown'}
          </Badge>
        );
    }
  };

  const vehicle = vehicleData.vehicle;
  const driver = vehicleData.driver;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{extractLanguageText("Quick Actions | การดำเนินการด่วน", language)}</span>
          {getStatusBadge(vehicle?.status)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Vehicle Status Overview */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {vehicle?.fuelLevel || 0}%
            </div>
            <div className="text-xs text-muted-foreground">
              {extractLanguageText("Fuel Level | ระดับเชื้อเพลิง", language)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {vehicle?.batteryLevel || 0}%
            </div>
            <div className="text-xs text-muted-foreground">
              {extractLanguageText("Battery | แบตเตอรี่", language)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2">
          <Button asChild variant="outline" className="justify-start gap-2">
            <Link to={`/map?vehicle=${vehicle?.id}`}>
              <MapPin className="w-4 h-4" />
              {extractLanguageText("View on Map | ดูบนแผนที่", language)}
            </Link>
          </Button>

          <Button asChild variant="outline" className="justify-start gap-2">
            <Link to="/inspections">
              <FileText className="w-4 h-4" />
              {extractLanguageText("New Inspection | ตรวจสอบใหม่", language)}
            </Link>
          </Button>

          <Button asChild variant="outline" className="justify-start gap-2">
            <Link to="/vehicles">
              <Wrench className="w-4 h-4" />
              {extractLanguageText("Schedule Maintenance | กำหนดการบำรุง", language)}
            </Link>
          </Button>

          {vehicle?.nextService && (
            <Button asChild variant="outline" className="justify-start gap-2">
              <Link to="/vehicles">
                <Calendar className="w-4 h-4" />
                {extractLanguageText("Next Service", language)}: {vehicle.nextService}
              </Link>
            </Button>
          )}
        </div>

        {/* Driver Contact */}
        {driver?.phone && (
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{driver.name}</p>
                <p className="text-sm text-muted-foreground">
                  {extractLanguageText("Current Driver | คนขับปัจจุบัน", language)}
                </p>
              </div>
              <Button size="sm" variant="outline" className="gap-1" asChild>
                <a href={`tel:${driver.phone}`}>
                  <Phone className="w-3 h-3" />
                  {extractLanguageText("Call | โทร", language)}
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Location */}
        {vehicle?.location && (
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {extractLanguageText("Last Location", language)}:
            </span>
            <span>{vehicle.location}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}