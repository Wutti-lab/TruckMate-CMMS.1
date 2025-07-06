import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Calendar, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  Filter,
  Download,
  QrCode
} from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Inspection {
  id: string;
  vehicle_id: string;
  inspector_id: string;
  type: string;
  inspection_date: string;
  status: string;
  passed: boolean | null;
  checklist_data: any;
  notes: string | null;
  created_at: string;
  vehicles?: {
    license_plate: string;
    make: string;
    model: string;
  };
  profiles?: {
    full_name: string;
  };
}

interface InspectionsOverviewProps {
  onCreateInspection: () => void;
  onEditInspection: (inspection: Inspection) => void;
  onViewInspection: (inspection: Inspection) => void;
}

export function InspectionsOverview({
  onCreateInspection,
  onEditInspection,
  onViewInspection
}: InspectionsOverviewProps) {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [filteredInspections, setFilteredInspections] = useState<Inspection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    fetchInspections();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [inspections, searchQuery, statusFilter, typeFilter]);

  const fetchInspections = async () => {
    try {
      const { data, error } = await supabase
        .from('inspections')
        .select(`
          *,
          vehicles (
            license_plate,
            make,
            model
          ),
          profiles (
            full_name
          )
        `)
        .order('inspection_date', { ascending: false });

      if (error) throw error;
      setInspections(data || []);
    } catch (error) {
      console.error('Error fetching inspections:', error);
      toast({
        title: extractLanguageText("Error | Fehler", language),
        description: extractLanguageText("Failed to load inspections | Inspektionen konnten nicht geladen werden", language),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = inspections;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(inspection =>
        inspection.vehicles?.license_plate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inspection.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(inspection => inspection.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(inspection => inspection.type === typeFilter);
    }

    setFilteredInspections(filtered);
  };

  const getStatusBadge = (status: string, passed: boolean | null) => {
    if (status === "completed") {
      return (
        <Badge variant={passed ? "default" : "destructive"} className="gap-1">
          {passed ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          {passed 
            ? extractLanguageText("Passed | Bestanden", language)
            : extractLanguageText("Failed | Nicht bestanden", language)
          }
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="gap-1">
        <Clock className="h-3 w-3" />
        {extractLanguageText("Pending | Ausstehend", language)}
      </Badge>
    );
  };

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      "daily": extractLanguageText("Daily Check | Tägliche Kontrolle", language),
      "weekly": extractLanguageText("Weekly Inspection | Wöchentliche Inspektion", language),
      "monthly": extractLanguageText("Monthly Service | Monatliche Wartung", language),
      "annual": extractLanguageText("Annual Inspection | Jahresinspektion", language),
      "pre_trip": extractLanguageText("Pre-Trip | Fahrtantritt", language),
      "post_trip": extractLanguageText("Post-Trip | Fahrtende", language)
    };
    return typeMap[type] || type;
  };

  const exportInspections = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Vehicle,Type,Status,Inspector,Notes\n"
      + filteredInspections.map(inspection => 
          `${format(new Date(inspection.inspection_date), 'yyyy-MM-dd')},${inspection.vehicles?.license_plate},${getTypeLabel(inspection.type)},${inspection.status},${inspection.profiles?.full_name},"${inspection.notes || ''}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inspections_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: extractLanguageText("Export Complete | Export abgeschlossen", language),
      description: extractLanguageText("Inspections exported successfully | Inspektionen erfolgreich exportiert", language)
    });
  };

  const inspectionTypes = [
    { value: "daily", label: extractLanguageText("Daily Check | Tägliche Kontrolle", language) },
    { value: "weekly", label: extractLanguageText("Weekly Inspection | Wöchentliche Inspektion", language) },
    { value: "monthly", label: extractLanguageText("Monthly Service | Monatliche Wartung", language) },
    { value: "annual", label: extractLanguageText("Annual Inspection | Jahresinspektion", language) },
    { value: "pre_trip", label: extractLanguageText("Pre-Trip | Fahrtantritt", language) },
    { value: "post_trip", label: extractLanguageText("Post-Trip | Fahrtende", language) }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {extractLanguageText("Inspections Overview | Inspektionsübersicht", language)}
          </h2>
          <p className="text-muted-foreground">
            {extractLanguageText("Manage vehicle inspections and checklists | Fahrzeuginspektionen und Checklisten verwalten", language)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportInspections} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {extractLanguageText("Export | Exportieren", language)}
          </Button>
          <Button onClick={onCreateInspection} className="gap-2">
            <Plus className="h-4 w-4" />
            {extractLanguageText("New Inspection | Neue Inspektion", language)}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {extractLanguageText("Filters | Filter", language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={extractLanguageText("Search inspections... | Inspektionen suchen...", language)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={extractLanguageText("All Status | Alle Status", language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{extractLanguageText("All Status | Alle Status", language)}</SelectItem>
                <SelectItem value="pending">{extractLanguageText("Pending | Ausstehend", language)}</SelectItem>
                <SelectItem value="completed">{extractLanguageText("Completed | Abgeschlossen", language)}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={extractLanguageText("All Types | Alle Typen", language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{extractLanguageText("All Types | Alle Typen", language)}</SelectItem>
                {inspectionTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredInspections.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  {extractLanguageText("No inspections found | Keine Inspektionen gefunden", language)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {extractLanguageText("Create your first inspection to get started | Erstellen Sie Ihre erste Inspektion", language)}
                </p>
                <Button onClick={onCreateInspection} className="gap-2">
                  <Plus className="h-4 w-4" />
                  {extractLanguageText("Create Inspection | Inspektion erstellen", language)}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredInspections.map((inspection) => (
            <Card key={inspection.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-medium">
                      {inspection.vehicles?.license_plate || extractLanguageText("Unknown Vehicle | Unbekanntes Fahrzeug", language)}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {inspection.vehicles?.make} {inspection.vehicles?.model}
                    </p>
                  </div>
                  {getStatusBadge(inspection.status, inspection.passed)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {format(new Date(inspection.inspection_date), 'dd.MM.yyyy')}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {getTypeLabel(inspection.type)}
                  </div>
                  {inspection.profiles?.full_name && (
                    <div className="text-sm text-muted-foreground">
                      {extractLanguageText("Inspector | Prüfer", language)}: {inspection.profiles.full_name}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onViewInspection(inspection)}
                    className="flex-1"
                  >
                    {extractLanguageText("View | Anzeigen", language)}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => onEditInspection(inspection)}
                    className="flex-1"
                  >
                    {extractLanguageText("Edit | Bearbeiten", language)}
                  </Button>
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}