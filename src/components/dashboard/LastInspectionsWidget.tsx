import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Inspection {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  type: string;
  status: string;
  inspectionDate: string;
  passed?: boolean;
}

export function LastInspectionsWidget() {
  const { language } = useLanguage();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  const getTitle = () => {
    switch(language) {
      case 'de': return 'Letzte Inspektionen';
      case 'th': return 'การตรวจสอบล่าสุด';
      default: return 'Recent Inspections';
    }
  };

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const { data, error } = await supabase
          .from('inspections')
          .select(`
            id,
            type,
            status,
            passed,
            inspection_date,
            vehicle_id,
            vehicles!inner(license_plate)
          `)
          .order('inspection_date', { ascending: false })
          .limit(10);

        if (error) throw error;

        const inspectionData: Inspection[] = data?.map(inspection => ({
          id: inspection.id,
          vehicleId: inspection.vehicle_id || '',
          vehiclePlate: (inspection.vehicles as any)?.license_plate || 'Unknown',
          type: inspection.type,
          status: inspection.status,
          inspectionDate: inspection.inspection_date,
          passed: inspection.passed
        })) || [];

        setInspections(inspectionData);
      } catch (error) {
        console.error('Error fetching inspections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInspections();

    // Set up real-time subscription
    const channel = supabase
      .channel('inspections-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'inspections' },
        () => fetchInspections()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusBadge = (status: string, passed?: boolean) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return passed ? (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {language === 'de' ? 'Bestanden' : language === 'th' ? 'ผ่าน' : 'Passed'}
          </Badge>
        ) : (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            {language === 'de' ? 'Nicht bestanden' : language === 'th' ? 'ไม่ผ่าน' : 'Failed'}
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            {language === 'de' ? 'Ausstehend' : language === 'th' ? 'รอดำเนินการ' : 'Pending'}
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            {language === 'de' ? 'In Bearbeitung' : language === 'th' ? 'กำลังดำเนินการ' : 'In Progress'}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInspectionTypeLabel = (type: string) => {
    switch(type.toLowerCase()) {
      case 'daily':
        return language === 'de' ? 'Tagesinspektion' : language === 'th' ? 'ตรวจสอบรายวัน' : 'Daily Check';
      case 'monthly':
        return language === 'de' ? 'Monatsinspektion' : language === 'th' ? 'ตรวจสอบรายเดือน' : 'Monthly Check';
      case 'annual':
        return language === 'de' ? 'Jahresinspektion' : language === 'th' ? 'ตรวจสอบรายปี' : 'Annual Check';
      case 'safety':
        return language === 'de' ? 'Sicherheitsprüfung' : language === 'th' ? 'ตรวจสอบความปลอดภัย' : 'Safety Check';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          {getTitle()}
        </CardTitle>
        <Button size="sm" variant="outline" asChild>
          <Link to="/inspections">
            {language === 'de' ? 'Alle anzeigen' : language === 'th' ? 'ดูทั้งหมด' : 'View All'}
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {inspections.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ClipboardCheck className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>{language === 'de' ? 'Keine Inspektionen gefunden' : language === 'th' ? 'ไม่พบการตรวจสอบ' : 'No inspections found'}</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {inspections.map((inspection) => (
              <div key={inspection.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{inspection.vehiclePlate}</span>
                    {getStatusBadge(inspection.status, inspection.passed)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {getInspectionTypeLabel(inspection.type)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(inspection.inspectionDate)}
                  </div>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <Link to={`/inspections?highlight=${inspection.id}`}>
                    {language === 'de' ? 'Details' : language === 'th' ? 'รายละเอียด' : 'Details'}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}