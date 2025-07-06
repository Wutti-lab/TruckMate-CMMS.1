import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QRCodeSVG from "react-qr-code";
import { Download, Share2, QrCode } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from "./types/VehicleTable";

interface VehicleQRGeneratorProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleQRGenerator({ vehicle, open, onOpenChange }: VehicleQRGeneratorProps) {
  const { language } = useLanguage();
  const { toast } = useToast();

  if (!vehicle) return null;

  // Generate QR code data with comprehensive vehicle information
  const qrData = {
    type: "vehicle-data",
    version: "1.0",
    vehicle: {
      id: vehicle.license_plate || vehicle.id,
      model: `${vehicle.make || ''} ${vehicle.model || ''}`.trim() || 'Unknown Model',
      driver: 'Unassigned', // This would come from vehicle assignments
      status: vehicle.status || 'Unknown',
      location: vehicle.location || 'Unknown',
      nextService: vehicle.next_service || 'Not scheduled',
      fuelLevel: Math.floor(Math.random() * 100), // Mock data - replace with real data
      batteryLevel: Math.floor(Math.random() * 100), // Mock data
      lastService: vehicle.next_service ? 
        new Date(new Date(vehicle.next_service).getTime() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
        'Unknown',
      engineTemp: Math.floor(Math.random() * 40) + 70 // Mock data
    },
    driver: {
      id: `D${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: 'Unassigned Driver',
      licenseType: 'Class 1',
      phone: 'Not assigned',
      status: 'Available',
      hoursThisWeek: Math.floor(Math.random() * 40),
      shift: Math.random() > 0.5 ? 'AM' : 'PM'
    },
    replacementParts: [
      {
        name: extractLanguageText("Brake Pads | Bremsbeläge", language),
        installedDate: "2024-03-15",
        supplier: extractLanguageText("AutoParts GmbH | AutoParts GmbH", language),
        warrantyEnd: "2025-03-15"
      }
    ],
    generatedAt: new Date().toISOString(),
    generatedBy: "TruckMate CMMS"
  };

  const qrCodeString = JSON.stringify(qrData);

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `vehicle-qr-${vehicle.license_plate || vehicle.id}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }

    toast({
      title: extractLanguageText("QR Code Downloaded | QR-Code heruntergeladen", language),
      description: extractLanguageText("QR code saved to downloads", "QR-Code in Downloads gespeichert")
    });
  };

  const shareQR = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${extractLanguageText("Vehicle QR Code", "Fahrzeug QR-Code")} - ${vehicle.license_plate}`,
          text: extractLanguageText(
            "Scan this QR code to access vehicle information",
            "QR-Code scannen für Fahrzeuginformationen"
          ),
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support native sharing
        await navigator.clipboard.writeText(qrCodeString);
        toast({
          title: extractLanguageText("Copied to Clipboard | In Zwischenablage kopiert", language),
          description: extractLanguageText("QR code data copied", "QR-Code Daten kopiert")
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: extractLanguageText("Share Failed | Teilen fehlgeschlagen", language),
        description: extractLanguageText("Could not share QR code", "QR-Code konnte nicht geteilt werden"),
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            {extractLanguageText("Vehicle QR Code | Fahrzeug QR-Code", language)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCodeSVG
                  id="qr-code-svg"
                  value={qrCodeString}
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              </div>
              
              <div className="text-center mt-4">
                <div className="font-medium">{vehicle.license_plate || vehicle.id}</div>
                <div className="text-sm text-muted-foreground">
                  {vehicle.make} {vehicle.model}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button onClick={downloadQR} className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              {extractLanguageText("Download | Herunterladen", language)}
            </Button>
            <Button onClick={shareQR} variant="outline" className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              {extractLanguageText("Share | Teilen", language)}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            {extractLanguageText(
              "This QR code contains vehicle information and can be scanned with the TruckMate mobile app",
              "Dieser QR-Code enthält Fahrzeuginformationen und kann mit der TruckMate Mobile App gescannt werden"
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}