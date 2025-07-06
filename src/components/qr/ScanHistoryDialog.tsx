import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2, Clock, Car } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ScanRecord {
  id: string;
  vehicleId: string;
  vehicleModel?: string;
  driverName?: string;
  scanTime: string;
  data: any;
}

interface ScanHistoryDialogProps {
  onSelectScan: (scanData: any) => void;
}

export function ScanHistoryDialog({ onSelectScan }: ScanHistoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([]);
  const { language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    loadScanHistory();
  }, []);

  const loadScanHistory = () => {
    try {
      const stored = localStorage.getItem('qr-scan-history');
      if (stored) {
        const history = JSON.parse(stored);
        setScanHistory(history);
      }
    } catch (error) {
      console.error('Error loading scan history:', error);
    }
  };

  const saveScanToHistory = (scanData: any) => {
    try {
      const record: ScanRecord = {
        id: Date.now().toString(),
        vehicleId: scanData.vehicle?.id || scanData.id || 'Unknown',
        vehicleModel: scanData.vehicle?.model || scanData.model,
        driverName: scanData.driver?.name || scanData.vehicle?.driver,
        scanTime: new Date().toISOString(),
        data: scanData
      };

      const existingHistory = localStorage.getItem('qr-scan-history');
      let history: ScanRecord[] = [];
      
      if (existingHistory) {
        history = JSON.parse(existingHistory);
      }

      // Add new record at the beginning and limit to 20 records
      history.unshift(record);
      history = history.slice(0, 20);

      localStorage.setItem('qr-scan-history', JSON.stringify(history));
      setScanHistory(history);
    } catch (error) {
      console.error('Error saving scan history:', error);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem('qr-scan-history');
      setScanHistory([]);
      toast({
        title: extractLanguageText("History Cleared | ล้างประวัติแล้ว", language),
        description: extractLanguageText("Scan history has been cleared | ล้างประวัติการสแกนแล้ว", language)
      });
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const handleSelectScan = (record: ScanRecord) => {
    onSelectScan(record.data);
    setIsOpen(false);
    toast({
      title: extractLanguageText("Scan Loaded | โหลดการสแกน", language),
      description: extractLanguageText("Previous scan data loaded | โหลดข้อมูลการสแกนก่อนหน้า", language)
    });
  };

  const formatScanTime = (timeString: string) => {
    try {
      return format(new Date(timeString), 'dd.MM.yyyy HH:mm');
    } catch {
      return timeString;
    }
  };

  // Expose the saveScanToHistory function globally for use in parent component
  useEffect(() => {
    (window as any).saveScanToHistory = saveScanToHistory;
    return () => {
      delete (window as any).saveScanToHistory;
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <History className="w-4 h-4" />
          {extractLanguageText("Scan History", language)}
          {scanHistory.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {scanHistory.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>
            {extractLanguageText("Recent Scans | การสแกนล่าสุด", language)}
          </DialogTitle>
          {scanHistory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="gap-1 text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              {extractLanguageText("Clear | ล้าง", language)}
            </Button>
          )}
        </DialogHeader>
        
        <ScrollArea className="h-96">
          {scanHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>{extractLanguageText("No scan history | ไม่มีประวัติการสแกน", language)}</p>
              <p className="text-sm">
                {extractLanguageText("Scanned QR codes will appear here | QR โค้ดที่สแกนจะปรากฏที่นี่", language)}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {scanHistory.map((record) => (
                <div
                  key={record.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleSelectScan(record)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Car className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{record.vehicleId}</span>
                        <Badge variant="outline" className="text-xs">
                          {record.vehicleModel || 'Vehicle'}
                        </Badge>
                      </div>
                      {record.driverName && (
                        <p className="text-sm text-muted-foreground">
                          {extractLanguageText("Driver", language)}: {record.driverName}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        {formatScanTime(record.scanTime)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}