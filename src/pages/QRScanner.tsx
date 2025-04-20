
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanQrCode } from "lucide-react";

export default function QRScanner() {
  const [scannedData, setScannedData] = useState<any>(null);

  // For now this is a placeholder for QR scanning functionality
  const handleScan = () => {
    // Simulated scan result for testing
    const mockScanData = {
      vehicle: {
        id: "B-FR-123",
        model: "Tesla Model Y",
        driver: "Somchai Jaidee",
        status: "Active",
        location: "Bangkok",
        nextService: "2024-05-15",
        replacementParts: [
          {
            name: "Brake Pads | ผ้าเบรก",
            installedDate: "2024-03-15",
            supplier: "BrakeTech Co. | เบรคเทค จำกัด",
            warrantyEnd: "2025-03-15"
          }
        ]
      }
    };
    setScannedData(mockScanData);
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">QR Scanner | สแกนคิวอาร์โค้ด</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Scan QR Code | สแกนคิวอาร์โค้ด</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Button onClick={handleScan} size="lg" className="gap-2">
                  <ScanQrCode className="w-6 h-6" />
                  Start Scanning | เริ่มสแกน
                </Button>
              </div>
            </CardContent>
          </Card>

          {scannedData && (
            <Card>
              <CardHeader>
                <CardTitle>Scan Result | ผลการสแกน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Vehicle Information | ข้อมูลยานพาหนะ</h3>
                    <div className="grid gap-2">
                      <p><span className="font-medium">ID:</span> {scannedData.vehicle.id}</p>
                      <p><span className="font-medium">Model:</span> {scannedData.vehicle.model}</p>
                      <p><span className="font-medium">Driver:</span> {scannedData.vehicle.driver}</p>
                      <p><span className="font-medium">Status:</span> {scannedData.vehicle.status}</p>
                      <p><span className="font-medium">Location:</span> {scannedData.vehicle.location}</p>
                      <p><span className="font-medium">Next Service:</span> {scannedData.vehicle.nextService}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Replacement Parts | ชิ้นส่วนที่เปลี่ยน</h3>
                    {scannedData.vehicle.replacementParts.map((part: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                        <p><span className="font-medium">Part:</span> {part.name}</p>
                        <p><span className="font-medium">Installed:</span> {part.installedDate}</p>
                        <p><span className="font-medium">Supplier:</span> {part.supplier}</p>
                        <p><span className="font-medium">Warranty Until:</span> {part.warrantyEnd}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
