import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CalendarIcon, 
  Save, 
  X, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText
} from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Vehicle {
  id: string;
  license_plate: string;
  make: string;
  model: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  type: 'checkbox' | 'radio' | 'text' | 'number';
  required: boolean;
  options?: string[];
  value?: any;
  status?: 'pass' | 'fail' | 'na';
  notes?: string;
}

interface InspectionTemplate {
  name: string;
  checklist: ChecklistItem[];
}

interface CreateInspectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInspectionCreated: () => void;
}

export function CreateInspectionModal({
  open,
  onOpenChange,
  onInspectionCreated
}: CreateInspectionModalProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [inspectionType, setInspectionType] = useState("");
  const [inspectionDate, setInspectionDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();

  const inspectionTemplates: Record<string, InspectionTemplate> = {
    daily: {
      name: extractLanguageText("Daily Check | Tägliche Kontrolle", language),
      checklist: [
        {
          id: "tire_condition",
          label: extractLanguageText("Tire Condition | Reifenzustand", language),
          type: "radio",
          required: true,
          options: ["Good", "Fair", "Poor"]
        },
        {
          id: "lights_check",
          label: extractLanguageText("All Lights Working | Alle Lichter funktionsfähig", language),
          type: "checkbox",
          required: true
        },
        {
          id: "fluid_levels",
          label: extractLanguageText("Fluid Levels OK | Flüssigkeitsstände OK", language),
          type: "checkbox",
          required: true
        },
        {
          id: "brake_check",
          label: extractLanguageText("Brake System Check | Bremssystem-Prüfung", language),
          type: "radio",
          required: true,
          options: ["Pass", "Fail", "N/A"]
        },
        {
          id: "horn_test",
          label: extractLanguageText("Horn Function | Hupe funktionsfähig", language),
          type: "checkbox",
          required: false
        },
        {
          id: "mirror_check",
          label: extractLanguageText("Mirrors Clean & Adjusted | Spiegel sauber & eingestellt", language),
          type: "checkbox",
          required: true
        }
      ]
    },
    pre_trip: {
      name: extractLanguageText("Pre-Trip Inspection | Fahrtantritt-Inspektion", language),
      checklist: [
        {
          id: "exterior_inspection",
          label: extractLanguageText("Exterior Visual Inspection | Äußere Sichtprüfung", language),
          type: "radio",
          required: true,
          options: ["Pass", "Fail", "Minor Issues"]
        },
        {
          id: "engine_start",
          label: extractLanguageText("Engine Starts Properly | Motor startet ordnungsgemäß", language),
          type: "checkbox",
          required: true
        },
        {
          id: "warning_lights",
          label: extractLanguageText("No Warning Lights | Keine Warnleuchten", language),
          type: "checkbox",
          required: true
        },
        {
          id: "fuel_level",
          label: extractLanguageText("Fuel Level (%) | Kraftstoffstand (%)", language),
          type: "number",
          required: true
        },
        {
          id: "safety_equipment",
          label: extractLanguageText("Safety Equipment Present | Sicherheitsausrüstung vorhanden", language),
          type: "checkbox",
          required: true
        }
      ]
    },
    monthly: {
      name: extractLanguageText("Monthly Service | Monatliche Wartung", language),
      checklist: [
        {
          id: "oil_change",
          label: extractLanguageText("Oil Change Required | Ölwechsel erforderlich", language),
          type: "radio",
          required: true,
          options: ["Yes", "No", "Recently Done"]
        },
        {
          id: "filter_check",
          label: extractLanguageText("Air Filter Condition | Luftfilter-Zustand", language),
          type: "radio",
          required: true,
          options: ["Clean", "Dirty", "Replace"]
        },
        {
          id: "battery_test",
          label: extractLanguageText("Battery Test | Batterietest", language),
          type: "radio",
          required: true,
          options: ["Good", "Weak", "Replace"]
        },
        {
          id: "belt_inspection",
          label: extractLanguageText("Belt Inspection | Riemen-Inspektion", language),
          type: "radio",
          required: true,
          options: ["Good", "Worn", "Replace"]
        }
      ]
    }
  };

  useEffect(() => {
    if (open) {
      fetchVehicles();
    }
  }, [open]);

  useEffect(() => {
    if (inspectionType && inspectionTemplates[inspectionType]) {
      setChecklist(inspectionTemplates[inspectionType].checklist.map(item => ({
        ...item,
        value: item.type === 'checkbox' ? false : '',
        status: undefined,
        notes: ''
      })));
    }
  }, [inspectionType]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, license_plate, make, model')
        .eq('status', 'active')
        .order('license_plate');

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: extractLanguageText("Error | Fehler", language),
        description: extractLanguageText("Failed to load vehicles | Fahrzeuge konnten nicht geladen werden", language),
        variant: "destructive"
      });
    }
  };

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
      if (item.type === 'number') return item.value !== '' && item.value !== null;
      if (item.type === 'text') return item.value && item.value.trim() !== '';
      return false;
    });
    
    return {
      total: requiredItems.length,
      completed: completedItems.length,
      percentage: requiredItems.length > 0 ? (completedItems.length / requiredItems.length) * 100 : 0
    };
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
      
      const checklistData = {
        items: checklist,
        completedAt: new Date().toISOString(),
        template: inspectionType
      } as any;

      // Determine if inspection passed based on checklist
      const hasFails = checklist.some(item => 
        item.value === 'Fail' || item.value === 'Poor' || item.status === 'fail'
      );

      const { error } = await supabase
        .from('inspections')
        .insert({
          vehicle_id: selectedVehicle,
          inspector_id: profile.user?.id,
          type: inspectionType,
          inspection_date: format(inspectionDate, 'yyyy-MM-dd'),
          status: 'completed',
          passed: !hasFails,
          checklist_data: checklistData,
          notes: notes || null
        });

      if (error) throw error;

      toast({
        title: extractLanguageText("Inspection Created | Inspektion erstellt", language),
        description: extractLanguageText("Inspection has been saved successfully | Inspektion wurde erfolgreich gespeichert", language)
      });

      onInspectionCreated();
      onOpenChange(false);
      
      // Reset form
      setSelectedVehicle("");
      setInspectionType("");
      setNotes("");
      setChecklist([]);
      setInspectionDate(new Date());
      
    } catch (error) {
      console.error('Error creating inspection:', error);
      toast({
        title: extractLanguageText("Error | Fehler", language),
        description: extractLanguageText("Failed to create inspection | Inspektion konnte nicht erstellt werden", language),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const status = getCompletionStatus();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {extractLanguageText("Create New Inspection | Neue Inspektion erstellen", language)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {extractLanguageText("Inspection Details | Inspektionsdetails", language)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{extractLanguageText("Vehicle | Fahrzeug", language)}</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder={extractLanguageText("Select vehicle | Fahrzeug auswählen", language)} />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map(vehicle => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.license_plate} - {vehicle.make} {vehicle.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{extractLanguageText("Inspection Type | Inspektionstyp", language)}</Label>
                  <Select value={inspectionType} onValueChange={setInspectionType}>
                    <SelectTrigger>
                      <SelectValue placeholder={extractLanguageText("Select type | Typ auswählen", language)} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">{extractLanguageText("Daily Check | Tägliche Kontrolle", language)}</SelectItem>
                      <SelectItem value="pre_trip">{extractLanguageText("Pre-Trip | Fahrtantritt", language)}</SelectItem>
                      <SelectItem value="monthly">{extractLanguageText("Monthly Service | Monatliche Wartung", language)}</SelectItem>
                      <SelectItem value="annual">{extractLanguageText("Annual Inspection | Jahresinspektion", language)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{extractLanguageText("Inspection Date | Inspektionsdatum", language)}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !inspectionDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {inspectionDate ? format(inspectionDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={inspectionDate}
                        onSelect={(date) => date && setInspectionDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{extractLanguageText("Notes | Notizen", language)}</Label>
                <Textarea
                  placeholder={extractLanguageText("Additional notes... | Zusätzliche Notizen...", language)}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          {checklist.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {extractLanguageText("Inspection Checklist | Inspektions-Checkliste", language)}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {status.completed}/{status.total} {extractLanguageText("completed | abgeschlossen", language)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {checklist.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          {item.label}
                          {item.required && <span className="text-red-500">*</span>}
                        </Label>
                      </div>
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
                            <Label htmlFor={`${item.id}-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {item.type === 'number' && (
                      <Input
                        type="number"
                        value={item.value || ''}
                        onChange={(e) => updateChecklistItem(item.id, 'value', e.target.value)}
                        placeholder={extractLanguageText("Enter value | Wert eingeben", language)}
                      />
                    )}

                    {item.type === 'text' && (
                      <Input
                        value={item.value || ''}
                        onChange={(e) => updateChecklistItem(item.id, 'value', e.target.value)}
                        placeholder={extractLanguageText("Enter text | Text eingeben", language)}
                      />
                    )}

                    <Textarea
                      placeholder={extractLanguageText("Additional notes for this item... | Zusätzliche Notizen zu diesem Punkt...", language)}
                      value={item.notes || ''}
                      onChange={(e) => updateChecklistItem(item.id, 'notes', e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4 mr-2" />
              {extractLanguageText("Cancel | Abbrechen", language)}
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || !selectedVehicle || !inspectionType}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading 
                ? extractLanguageText("Saving... | Speichern...", language)
                : extractLanguageText("Create Inspection | Inspektion erstellen", language)
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}