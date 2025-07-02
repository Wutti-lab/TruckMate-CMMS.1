
import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLanguage, extractLanguageText } from '@/contexts/LanguageContext';

interface CriticalAlert {
  id: string;
  title: string;
  message: string;
  severity: 'high' | 'critical';
  timestamp: Date;
  vehicleId?: string;
}

interface CriticalAlertDialogProps {
  alerts: CriticalAlert[];
  onDismiss: (alertId: string) => void;
  onDismissAll: () => void;
}

export function CriticalAlertDialog({ alerts, onDismiss, onDismissAll }: CriticalAlertDialogProps) {
  const { language } = useLanguage();
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (alerts.length > 0) {
      setIsOpen(true);
      setCurrentAlertIndex(0);
    } else {
      setIsOpen(false);
    }
  }, [alerts]);

  const handleNext = () => {
    if (currentAlertIndex < alerts.length - 1) {
      setCurrentAlertIndex(currentAlertIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentAlertIndex > 0) {
      setCurrentAlertIndex(currentAlertIndex - 1);
    }
  };

  const handleDismissCurrentAlert = () => {
    const currentAlert = alerts[currentAlertIndex];
    onDismiss(currentAlert.id);
    
    if (alerts.length === 1) {
      setIsOpen(false);
    } else if (currentAlertIndex === alerts.length - 1) {
      setCurrentAlertIndex(Math.max(0, currentAlertIndex - 1));
    }
  };

  const handleDismissAll = () => {
    onDismissAll();
    setIsOpen(false);
  };

  if (!isOpen || alerts.length === 0) {
    return null;
  }

  const currentAlert = alerts[currentAlertIndex];
  const isCritical = currentAlert.severity === 'critical';

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className={`max-w-md ${isCritical ? 'border-red-500 border-2' : 'border-amber-500 border-2'}`}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className={`${isCritical ? 'bg-red-50' : 'bg-amber-50'} -m-6 p-6 mb-4`}>
          <DialogTitle className="flex items-center gap-3">
            <AlertTriangle className={`h-6 w-6 ${isCritical ? 'text-red-600' : 'text-amber-600'}`} />
            <span className={isCritical ? 'text-red-800' : 'text-amber-800'}>
              {isCritical 
                ? extractLanguageText("KRITISCHE WARNUNG | CRITICAL ALERT", language)
                : extractLanguageText("WICHTIGE WARNUNG | IMPORTANT ALERT", language)
              }
            </span>
            <Badge variant={isCritical ? "destructive" : "secondary"}>
              {currentAlertIndex + 1} / {alerts.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              {extractLanguageText(currentAlert.title, language)}
            </h3>
            <p className="text-gray-700">
              {extractLanguageText(currentAlert.message, language)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {currentAlert.timestamp.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {alerts.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentAlertIndex === 0}
                >
                  ←
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentAlertIndex === alerts.length - 1}
                >
                  →
                </Button>
              </>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleDismissCurrentAlert}
              className="flex-1"
            >
              {extractLanguageText("Diese Warnung schließen | Dismiss this alert", language)}
            </Button>
            {alerts.length > 1 && (
              <Button
                variant="destructive"
                onClick={handleDismissAll}
                className="flex-1"
              >
                {extractLanguageText("Alle schließen | Dismiss all", language)}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
