import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  QrCode, 
  Save, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Car,
  User,
  Calendar
} from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface QuickCheckItem {
  id: string;
  label: string;
  type: 'checkbox' | 'radio';
  required: boolean;
  options?: string[];
  value?: any;
  notes?: string;
}

interface VehicleInfo {
  id: string;
  license_plate: string;
  make: string;
  model: string;
}

interface QuickInspectionQRProps {
  vehicleData?: any; // Data from QR code scan
  onComplete?: () => void;
}

export function QuickInspectionQR({ vehicleData, onComplete }: QuickInspectionQRProps) {
  const [vehicle, setVehicle] = useState<VehicleInfo | null>(null);
  const [checklist, setChecklist] = useState<QuickCheckItem[]>([]);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();

  // Quick inspection checklist for mobile/QR use
  const quickChecklist: QuickCheckItem[] = [
    {
      id: "exterior_damage",
      label: extractLanguageText("No visible exterior damage | Keine sichtbaren äußeren Schäden", language),
      type: "checkbox",
      required: true
    },
    {
      id: "lights_working",
      label: extractLanguageText("All lights working | Alle Lichter funktionsfähig", language),
      type: "checkbox",
      required: true
    },
    {
      id: "tire_condition",
      label: extractLanguageText("Tire condition | Reifenzustand", language),
      type: "radio",
      required: true,
      options: ["Good", "Fair", "Poor"]
    },
    {
      id: "fluid_leaks",
      label: extractLanguageText("No fluid leaks visible | Keine sichtbaren Flüssigkeitslecks", language),
      type: "checkbox",
      required: true
    },
    {
      id: "interior_clean",
      label: extractLanguageText("Interior clean and ready | Innenraum sauber und bereit", language),
      type: "checkbox",
      required: false
    },
    {
      id: "safety_equipment",
      label: extractLanguageText("Safety equipment present | Sicherheitsausrüstung vorhanden", language),
      type: "checkbox",
      required: true
    }
  ];

  useEffect(() => {
    if (vehicleData) {
      // If QR code data is provided, extract vehicle info
      if (vehicleData.vehicle) {
        setVehicle({
          id: vehicleData.vehicle.id,
          license_plate: vehicleData.vehicle.id,
          make: vehicleData.vehicle.model?.split(' ')[0] || 'Unknown',
          model: vehicleData.vehicle.model?.split(' ').slice(1).join(' ') || 'Vehicle'
        });
      }
    }
    
    // Initialize checklist
    setChecklist(quickChecklist.map(item => ({
      ...item,
      value: item.type === 'checkbox' ? false : '',
      notes: ''
    })));
  }, [vehicleData]);

  const updateChecklistItem = (id: string, field: string, value: any) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const getCompletionStatus = () => {
    const requiredItems = checklist.filter(item => item.required);
    const completedItems = requiredItems.filter(item => {
      if (item.type === 'checkbox') return item.value === true;
      if (item.type === 'radio') return item.value && item.value !== '';
      return false;
    });
    
    return {
      total: requiredItems.length,
      completed: completedItems.length,
      percentage: requiredItems.length > 0 ? (completedItems.length / requiredItems.length) * 100 : 0
    };
  };

  const getOverallStatus = () => {
    const hasCriticalIssues = checklist.some(item => {
      if (item.type === 'checkbox' && item.required) {
        return item.value === false;
      }
      if (item.type === 'radio') {
        return item.value === 'Poor';
      }
      return false;
    });

    const hasMinorIssues = checklist.some(item => {
      if (item.type === 'radio') {
        return item.value === 'Fair';
      }
      return false;
    });

    if (hasCriticalIssues) return 'fail';
    if (hasMinorIssues) return 'warning';
    return 'pass';
  };

  const handleSubmit = async () => {
    const { completed, total } = getCompletionStatus();
    
    if (completed < total) {
      toast({
        title: extractLanguageText("Incomplete Inspection | Unvollständige Inspektion", language),
        description: extractLanguageText("Please complete all required fields | Bitte füllen Sie alle Pflichtfelder aus", language),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: profile } = await supabase.auth.getUser();
      const overallStatus = getOverallStatus();
      
      const checklistData = {
        items: checklist,
        completedAt: new Date().toISOString(),
        template: 'quick_qr',
        source: 'qr_scan'
      } as any;

      const { error } = await supabase
        .from('inspections')
        .insert({
          vehicle_id: vehicle?.id,
          inspector_id: profile.user?.id,
          type: 'quick_check',
          inspection_date: format(new Date(), 'yyyy-MM-dd'),
          status: 'completed',
          passed: overallStatus === 'pass',
          checklist_data: checklistData,
          notes: notes || null
        });

      if (error) throw error;

      const statusMessages = {
        pass: extractLanguageText("Vehicle passed quick inspection | Fahrzeug hat Schnellinspektion bestanden", language),
        warning: extractLanguageText("Vehicle passed with minor issues noted | Fahrzeug bestanden mit geringfügigen Problemen", language),
        fail: extractLanguageText("Vehicle failed inspection - issues require attention | Fahrzeug nicht bestanden - Probleme erfordern Aufmerksamkeit", language)
      };

      toast({
        title: extractLanguageText("Quick Inspection Complete | Schnellinspektion abgeschlossen", language),
        description: statusMessages[overallStatus],
        variant: overallStatus === 'fail' ? 'destructive' : 'default'
      });

      if (onComplete) {
        onComplete();
      }
      
    } catch (error) {
      console.error('Error saving quick inspection:', error);
      toast({
        title: extractLanguageText("Error | Fehler", language),
        description: extractLanguageText("Failed to save inspection | Inspektion konnte nicht gespeichert werden", language),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const status = getCompletionStatus();
  const overallStatus = getOverallStatus();

  const statusBadge = {
    pass: (
      <Badge className="gap-1 bg-green-600">
        <CheckCircle className="h-3 w-3" />
        {extractLanguageText("Ready for Use | Einsatzbereit", language)}
      </Badge>
    ),
    warning: (
      <Badge variant="secondary" className="gap-1 bg-amber-100 text-amber-800">
        <AlertTriangle className="h-3 w-3" />
        {extractLanguageText("Minor Issues | Geringfügige Probleme", language)}
      </Badge>
    ),
    fail: (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3 w-3" />
        {extractLanguageText("Requires Attention | Erfordert Aufmerksamkeit", language)}
      </Badge>
    )
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              {extractLanguageText("Quick Vehicle Inspection | Schnelle Fahrzeuginspektion", language)}
            </CardTitle>
            {status.completed === status.total && statusBadge[overallStatus]}
          </div>
        </CardHeader>
        <CardContent>
          {vehicle && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{vehicle.license_plate}</div>
                  <div className="text-sm text-muted-foreground">{vehicle.make} {vehicle.model}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{format(new Date(), 'dd.MM.yyyy')}</div>
                  <div className="text-sm text-muted-foreground">{format(new Date(), 'HH:mm')}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{extractLanguageText("Progress | Fortschritt", language)}</span>
            <span>{status.completed}/{status.total} {extractLanguageText("completed | abgeschlossen", language)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${status.percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>
            {extractLanguageText("Safety Checklist | Sicherheits-Checkliste", language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {checklist.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  {item.label}
                  {item.required && <span className="text-red-500">*</span>}
                </Label>
              </div>

              {item.type === 'checkbox' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    checked={item.value === true}
                    onCheckedChange={(checked) => updateChecklistItem(item.id, 'value', checked)}
                  />
                  <Label htmlFor={item.id} className="text-sm">
                    {extractLanguageText("Confirmed | Bestätigt", language)}
                  </Label>
                </div>
              )}

              {item.type === 'radio' && item.options && (
                <RadioGroup
                  value={item.value || ''}
                  onValueChange={(value) => updateChecklistItem(item.id, 'value', value)}
                >
                  {item.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${item.id}-${option}`} />
                      <Label htmlFor={`${item.id}-${option}`}>
                        {option === 'Good' ? extractLanguageText("Good | Gut", language) :
                         option === 'Fair' ? extractLanguageText("Fair | Ausreichend", language) :
                         option === 'Poor' ? extractLanguageText("Poor | Schlecht", language) :
                         option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {(item.value === 'Fair' || item.value === 'Poor' || item.value === false) && (
                <Textarea
                  placeholder={extractLanguageText("Describe the issue... | Problem beschreiben...", language)}
                  value={item.notes || ''}
                  onChange={(e) => updateChecklistItem(item.id, 'notes', e.target.value)}
                  rows={2}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>
            {extractLanguageText("Additional Notes | Zusätzliche Notizen", language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={extractLanguageText("Any additional observations... | Weitere Beobachtungen...", language)}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit} 
        disabled={isLoading || status.completed < status.total}
        className="w-full"
        size="lg"
      >
        <Save className="h-4 w-4 mr-2" />
        {isLoading 
          ? extractLanguageText("Saving... | Speichern...", language)
          : extractLanguageText("Complete Inspection | Inspektion abschließen", language)
        }
      </Button>
    </div>
  );
}