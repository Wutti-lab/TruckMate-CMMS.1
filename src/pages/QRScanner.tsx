
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BackToDashboard } from "@/components/layout/BackToDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanQrCode, StopCircle, SwitchCamera } from "lucide-react";
import QrScanner from "react-qr-scanner";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { ManualInputDialog } from "@/components/qr/ManualInputDialog";
import { ScanHistoryDialog } from "@/components/qr/ScanHistoryDialog";
import { VehicleQuickActions } from "@/components/qr/VehicleQuickActions";

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [cameraId, setCameraId] = useState<string>("environment");
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    // Check for available cameras when component mounts
    async function getCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        console.log('Available cameras:', videoDevices);
        setAvailableCameras(videoDevices);
        
        // Set default camera to back camera if available
        const backCamera = videoDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear'));
        
        if (backCamera) {
          console.log('Back camera found:', backCamera.deviceId);
          setCameraId(backCamera.deviceId);
        } else if (videoDevices.length > 0) {
          console.log('No back camera found, using first camera:', videoDevices[0].deviceId);
          setCameraId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error accessing camera list:', error);
        toast({
          title: extractLanguageText("Camera Access Error | ข้อผิดพลาดการเข้าถึงกล้อง", language),
          description: extractLanguageText("Could not access camera list | ไม่สามารถเข้าถึงรายการกล้องได้", language),
          variant: "destructive",
        });
      }
    }

    // Request camera permissions
    if (scanning) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          getCameras();
        })
        .catch(error => {
          console.error('Error accessing camera:', error);
          toast({
            title: extractLanguageText("Camera Permission Denied | การอนุญาตกล้องถูกปฏิเสธ", language),
            description: extractLanguageText("Please enable camera access to use the QR scanner | โปรดเปิดการเข้าถึงกล้องเพื่อใช้เครื่องสแกน QR", language),
            variant: "destructive",
          });
          setScanning(false);
        });
    }
  }, [scanning, toast, language]);

  const handleScan = (data: any) => {
    if (data) {
      console.log("QR Code Scanned Data:", data);
      try {
        // Try to parse the QR code data as JSON
        const parsedData = JSON.parse(data.text);
        console.log("Parsed QR data:", parsedData);
        setScannedData(parsedData);
        setScanning(false);
        
        // Save to history
        if ((window as any).saveScanToHistory) {
          (window as any).saveScanToHistory(parsedData);
        }
        
        toast({
          title: extractLanguageText("QR Code Scanned | สแกน QR โค้ดแล้ว", language),
          description: extractLanguageText("Vehicle and driver information loaded successfully | โหลดข้อมูลยานพาหนะและคนขับสำเร็จ", language),
        });
      } catch (error) {
        console.error("Error parsing QR data:", error, data.text);
        toast({
          title: extractLanguageText("Invalid QR Code | QR โค้ดไม่ถูกต้อง", language),
          description: extractLanguageText("This QR code doesn't contain valid vehicle data | QR โค้ดนี้ไม่มีข้อมูลยานพาหนะที่ถูกต้อง", language),
          variant: "destructive",
        });
      }
    }
  };

  const handleError = (err: any) => {
    console.error('QR Scanner error:', err);
    toast({
      title: extractLanguageText("Camera Error | ข้อผิดพลาดของกล้อง", language),
      description: extractLanguageText("Could not access camera | ไม่สามารถเข้าถึงกล้องได้", language),
      variant: "destructive",
    });
  };

  const toggleScanning = () => {
    setScanning(!scanning);
    if (!scanning) {
      setScannedData(null);
    }
  };

  const switchCamera = () => {
    if (availableCameras.length <= 1) {
      toast({
        title: extractLanguageText("Camera Switch Failed | การสลับกล้องล้มเหลว", language),
        description: extractLanguageText("Only one camera is available | มีกล้องเพียงตัวเดียวที่ใช้ได้", language),
      });
      return;
    }

    // Switch to next camera in the list
    const nextIndex = (currentCameraIndex + 1) % availableCameras.length;
    setCurrentCameraIndex(nextIndex);
    const nextCamera = availableCameras[nextIndex];
    setCameraId(nextCamera.deviceId);
    
    // Determine if this is front or back camera for the message
    const isFrontCamera = nextCamera.label.toLowerCase().includes('front');
    
    toast({
      title: extractLanguageText("Camera Switched | สลับกล้องแล้ว", language),
      description: isFrontCamera
        ? extractLanguageText("Switched to front camera | สลับไปที่กล้องหน้า", language)
        : extractLanguageText("Switched to back camera | สลับไปที่กล้องหลัง", language),
    });
  };

  const renderMockScan = () => {
    // Simulate a mock scan for testing purposes
    const mockScanData = {
      type: "vehicle-data",
      version: "1.0",
      vehicle: {
        id: "B-FR-123",
        model: "Tesla Model Y",
        driver: "Max Müller",
        status: "Active",
        location: "Bangkok, Silom",
        nextService: "2024-05-15",
        fuelLevel: 75,
        batteryLevel: 80,
        lastService: "2023-11-15",
        engineTemp: 84
      },
      driver: {
        id: "D001",
        name: "Max Müller",
        licenseType: "Class 1",
        phone: "+66 81 234 5678",
        status: "Active",
        hoursThisWeek: 32,
        shift: "AM"
      },
      replacementParts: [
        {
          name: extractLanguageText("Brake Pads | ผ้าเบรก", language),
          installedDate: "2024-03-15",
          supplier: extractLanguageText("BrakeTech Co. | เบรคเทค จำกัด", language),
          warrantyEnd: "2025-03-15"
        }
      ]
    };
    setScannedData(mockScanData);
    
    // Save to history
    if ((window as any).saveScanToHistory) {
      (window as any).saveScanToHistory(mockScanData);
    }
    
    toast({
      title: extractLanguageText("Test QR Code Scanned | ทดสอบการสแกน QR โค้ด", language),
      description: extractLanguageText("Mock data loaded | โหลดข้อมูลจำลองแล้ว", language),
    });
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <BackToDashboard />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{extractLanguageText("QR Scanner | สแกนคิวอาร์โค้ด", language)}</h1>
          <div className="flex gap-2">
            <ManualInputDialog onVehicleFound={setScannedData} />
            <ScanHistoryDialog onSelectScan={setScannedData} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{extractLanguageText("Scan QR Code | สแกนคิวอาร์โค้ด", language)}</CardTitle>
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
                        className="w-full h-full object-cover"
                        constraints={{
                          video: {
                            deviceId: cameraId ? { exact: cameraId } : undefined,
                            facingMode: !cameraId ? "environment" : undefined,
                            width: { ideal: 1280 },
                            height: { ideal: 720 }
                          }
                        }}
                        key={cameraId} // Force re-render when camera changes
                      />
                      <div className="absolute inset-0 pointer-events-none border-2 border-red-500 animate-pulse z-10"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 p-6">
                      <p className="text-center text-gray-500">
                        {extractLanguageText("Click the button below to start scanning a QR code | คลิกปุ่มด้านล่างเพื่อเริ่มสแกน QR โค้ด", language)}
                      </p>
                      <Button onClick={toggleScanning} size="lg" className="gap-2">
                        <ScanQrCode className="w-6 h-6" />
                        {extractLanguageText("Start Scanning | เริ่มสแกน", language)}
                      </Button>
                      <Button onClick={renderMockScan} variant="outline" size="sm" className="mt-2">
                        {extractLanguageText("Test with Mock Data | ทดสอบด้วยข้อมูลจำลอง", language)}
                      </Button>
                    </div>
                  )}
                </div>
                
                {scanning && (
                  <div className="flex gap-2">
                    <Button onClick={toggleScanning} variant="destructive" className="gap-2">
                      <StopCircle className="w-5 h-5" />
                      {extractLanguageText("Stop Scanning | หยุดสแกน", language)}
                    </Button>
                    <Button 
                      onClick={switchCamera} 
                      variant="outline" 
                      className="gap-2"
                      disabled={availableCameras.length <= 1}
                    >
                      <SwitchCamera className="w-5 h-5" />
                      {extractLanguageText("Switch Camera | สลับกล้อง", language)}
                      {availableCameras.length > 0 && (
                        <span className="text-xs ml-1">
                          ({currentCameraIndex + 1}/{availableCameras.length})
                        </span>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Vehicle Information and Quick Actions */}
          {scannedData && (
            <div className="space-y-4">
              <VehicleQuickActions vehicleData={scannedData} />
            </div>
          )}
        </div>

        {/* Detailed Vehicle Information */}
        {scannedData && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {/* Vehicle Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{extractLanguageText("Vehicle Information | ข้อมูลยานพาหนะ", language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">ID:</span> {scannedData.vehicle?.id || scannedData.id}</p>
                    <p><span className="font-medium">Model:</span> {scannedData.vehicle?.model || scannedData.model}</p>
                    <p><span className="font-medium">Status:</span> {scannedData.vehicle?.status || scannedData.status}</p>
                    <p><span className="font-medium">Location:</span> {scannedData.vehicle?.location || scannedData.location}</p>
                    <p><span className="font-medium">Next Service:</span> {scannedData.vehicle?.nextService || scannedData.nextService}</p>
                    <p><span className="font-medium">Fuel Level:</span> {scannedData.vehicle?.fuelLevel || scannedData.fuelLevel || 'N/A'}%</p>
                    <p><span className="font-medium">Battery Level:</span> {scannedData.vehicle?.batteryLevel || scannedData.batteryLevel || 'N/A'}%</p>
                    <p><span className="font-medium">Last Service:</span> {scannedData.vehicle?.lastService || scannedData.lastService || 'N/A'}</p>
                    {(scannedData.vehicle?.engineTemp || scannedData.engineTemp) && 
                      <p><span className="font-medium">Engine Temperature:</span> {scannedData.vehicle?.engineTemp || scannedData.engineTemp}°C</p>
                    }
                  </div>
                </CardContent>
              </Card>

              {/* Driver Information Card */}
              {(scannedData.driver || scannedData.vehicle?.driver) && (
                <Card>
                  <CardHeader>
                    <CardTitle>{extractLanguageText("Driver Information | ข้อมูลคนขับ", language)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {scannedData.driver?.name || scannedData.vehicle?.driver}</p>
                      {scannedData.driver?.id && <p><span className="font-medium">ID:</span> {scannedData.driver.id}</p>}
                      {scannedData.driver?.licenseType && <p><span className="font-medium">License Type:</span> {scannedData.driver.licenseType}</p>}
                      {scannedData.driver?.phone && <p><span className="font-medium">Phone:</span> {scannedData.driver.phone}</p>}
                      {scannedData.driver?.status && <p><span className="font-medium">Status:</span> {scannedData.driver.status}</p>}
                      {scannedData.driver?.hoursThisWeek !== undefined && 
                        <p><span className="font-medium">Hours This Week:</span> {scannedData.driver.hoursThisWeek}h</p>
                      }
                      {scannedData.driver?.shift && <p><span className="font-medium">Shift:</span> {scannedData.driver.shift}</p>}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Parts Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{extractLanguageText("Replacement Parts | ชิ้นส่วนที่เปลี่ยน", language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  {(scannedData.replacementParts || scannedData.vehicle?.replacementParts || []).length > 0 ? (
                    (scannedData.replacementParts || scannedData.vehicle?.replacementParts || []).map((part: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                        <p><span className="font-medium">Part:</span> {part.name}</p>
                        <p><span className="font-medium">Installed:</span> {part.installedDate}</p>
                        <p><span className="font-medium">Supplier:</span> {part.supplier}</p>
                        <p><span className="font-medium">Warranty Until:</span> {part.warrantyEnd}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      {extractLanguageText("No replacement parts information available | ไม่มีข้อมูลชิ้นส่วนที่เปลี่ยน", language)}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
      </main>
    </div>
  );
}
