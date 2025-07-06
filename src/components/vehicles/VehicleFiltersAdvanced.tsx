import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Filter, X, SlidersHorizontal } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface VehicleFilters {
  status: string;
  vehicleType: string;
  fuelType: string;
  location: string;
  serviceDate: string;
  minMileage: string;
  maxMileage: string;
}

interface VehicleFiltersAdvancedProps {
  onFiltersChange: (filters: VehicleFilters) => void;
  activeFiltersCount: number;
}

const DEFAULT_FILTERS: VehicleFilters = {
  status: "",
  vehicleType: "",
  fuelType: "",
  location: "",
  serviceDate: "",
  minMileage: "",
  maxMileage: ""
};

export function VehicleFiltersAdvanced({ onFiltersChange, activeFiltersCount }: VehicleFiltersAdvancedProps) {
  const [filters, setFilters] = useState<VehicleFilters>(DEFAULT_FILTERS);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const handleFilterChange = (key: keyof VehicleFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    onFiltersChange(DEFAULT_FILTERS);
  };

  const statusOptions = [
    { value: "active", label: extractLanguageText("Active | Aktiv", language) },
    { value: "maintenance", label: extractLanguageText("In Maintenance | In Wartung", language) },
    { value: "inactive", label: extractLanguageText("Inactive | Inaktiv", language) },
    { value: "repair", label: extractLanguageText("Under Repair | In Reparatur", language) }
  ];

  const vehicleTypeOptions = [
    { value: "truck", label: extractLanguageText("Truck | LKW", language) },
    { value: "van", label: extractLanguageText("Van | Transporter", language) },
    { value: "trailer", label: extractLanguageText("Trailer | Anhänger", language) },
    { value: "bus", label: extractLanguageText("Bus | Bus", language) }
  ];

  const fuelTypeOptions = [
    { value: "diesel", label: extractLanguageText("Diesel | Diesel", language) },
    { value: "petrol", label: extractLanguageText("Petrol | Benzin", language) },
    { value: "electric", label: extractLanguageText("Electric | Elektrisch", language) },
    { value: "hybrid", label: extractLanguageText("Hybrid | Hybrid", language) }
  ];

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                {extractLanguageText("Advanced Filters | Erweiterte Filter", language)}
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <Filter className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Status and Type Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{extractLanguageText("Status | Status", language)}</Label>
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={extractLanguageText("All Status | Alle Status", language)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{extractLanguageText("All Status | Alle Status", language)}</SelectItem>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{extractLanguageText("Vehicle Type | Fahrzeugtyp", language)}</Label>
                <Select 
                  value={filters.vehicleType} 
                  onValueChange={(value) => handleFilterChange("vehicleType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={extractLanguageText("All Types | Alle Typen", language)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{extractLanguageText("All Types | Alle Typen", language)}</SelectItem>
                    {vehicleTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{extractLanguageText("Fuel Type | Kraftstofftyp", language)}</Label>
                <Select 
                  value={filters.fuelType} 
                  onValueChange={(value) => handleFilterChange("fuelType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={extractLanguageText("All Fuel Types | Alle Kraftstofftypen", language)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{extractLanguageText("All Fuel Types | Alle Kraftstofftypen", language)}</SelectItem>
                    {fuelTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location and Mileage Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{extractLanguageText("Location | Standort", language)}</Label>
                <Input
                  placeholder={extractLanguageText("Enter location... | Standort eingeben...", language)}
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>{extractLanguageText("Min Mileage | Min Kilometerstand", language)}</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.minMileage}
                  onChange={(e) => handleFilterChange("minMileage", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>{extractLanguageText("Max Mileage | Max Kilometerstand", language)}</Label>
                <Input
                  type="number"
                  placeholder="999999"
                  value={filters.maxMileage}
                  onChange={(e) => handleFilterChange("maxMileage", e.target.value)}
                />
              </div>
            </div>

            {/* Service Date Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {extractLanguageText("Service Date Range | Wartungsdatum-Bereich", language)}
              </Label>
              <Input
                type="date"
                value={filters.serviceDate}
                onChange={(e) => handleFilterChange("serviceDate", e.target.value)}
              />
            </div>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
              <div className="flex justify-end pt-2">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  {extractLanguageText("Clear Filters | Filter löschen", language)}
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}