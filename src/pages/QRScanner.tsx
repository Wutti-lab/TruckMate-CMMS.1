
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanQrCode, StopCircle } from "lucide-react";
import QrScanner from "react-qr-scanner";
import { useToast } from "@/hooks/use-toast";

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const { toast } = useToast();

  const handleScan = (data: any) => {
    if (data) {
      try {
        // Try to parse the QR code data as JSON
        const parsedData = JSON.parse(data.text);
        setScannedData(parsedData);
        setScanning(false);
        toast({
          title: "QR Code Scanned | สแกน QR โค้ดแล้ว",
          description: "Vehicle information loaded successfully | โหลดข้อมูลยานพาหนะสำเร็จ",
        });
      } catch (error) {
        toast({
          title: "Invalid QR Code | QR โค้ดไม่ถูกต้อง",
          description: "This QR code doesn't contain valid vehicle data | QR โค้ดนี้ไม่มีข้อมูลยานพาหนะที่ถูกต้อง",
          variant: "destructive",
        });
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    toast({
      title: "Camera Error | ข้อผิดพลาดของกล้อง",
      description: "Could not access camera | ไม่สามารถเข้าถึงกล้องได้",
      variant: "destructive",
    });
  };

  const toggleScanning = () => {
    setScanning(!scanning);
    if (!scanning) {
      setScannedData(null);
    }
  };

  const renderMockScan = () => {
    // Simulate a mock scan for testing purposes
    const mockScanData = {
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
    };
    setScannedData({ vehicle: mockScanData });
    toast({
      title: "Test QR Code Scanned | ทดสอบการสแกน QR โค้ด",
      description: "Mock data loaded | โหลดข้อมูลจำลองแล้ว",
    });
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
              <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {scanning ? (
                  <div className="relative w-full h-full">
                    <QrScanner
                      delay={300}
                      onError={handleError}
                      onScan={handleScan}
                      style={{ width: "100%" }}
                    />
                    <div className="absolute inset-0 pointer-events-none border-2 border-red-500 animate-pulse z-10"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 p-6">
                    <p className="text-center text-gray-500">
                      Click the button below to start scanning a QR code | คลิกปุ่มด้านล่างเพื่อเริ่มสแกน QR โค้ด
                    </p>
                    <Button onClick={toggleScanning} size="lg" className="gap-2">
                      <ScanQrCode className="w-6 h-6" />
                      Start Scanning | เริ่มสแกน
                    </Button>
                    <Button onClick={renderMockScan} variant="outline" size="sm" className="mt-2">
                      Test with Mock Data | ทดสอบด้วยข้อมูลจำลอง
                    </Button>
                  </div>
                )}
              </div>
              
              {scanning && (
                <Button onClick={toggleScanning} variant="destructive" className="gap-2">
                  <StopCircle className="w-5 h-5" />
                  Stop Scanning | หยุดสแกน
                </Button>
              )}
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
                      <p><span className="font-medium">ID:</span> {scannedData.vehicle?.id || scannedData.id}</p>
                      <p><span className="font-medium">Model:</span> {scannedData.vehicle?.model || scannedData.model}</p>
                      <p><span className="font-medium">Driver:</span> {scannedData.vehicle?.driver || scannedData.driver}</p>
                      <p><span className="font-medium">Status:</span> {scannedData.vehicle?.status || scannedData.status}</p>
                      <p><span className="font-medium">Location:</span> {scannedData.vehicle?.location || scannedData.location}</p>
                      <p><span className="font-medium">Next Service:</span> {scannedData.vehicle?.nextService || scannedData.nextService}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Replacement Parts | ชิ้นส่วนที่เปลี่ยน</h3>
                    {(scannedData.vehicle?.replacementParts || scannedData.replacementParts || []).map((part: any, index: number) => (
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
