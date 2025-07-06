
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  driversOnDuty: number;
  pendingIssues: number;
  upcomingServices: number;
  fleetStatusData: Array<{
    name: string;
    value: number;
    color: string;
    count: number;
  }>;
  recentActivities: Array<{
    id: string;
    type: 'inspection' | 'maintenance' | 'assignment';
    message: string;
    timestamp: string;
    vehicleId?: string;
  }>;
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    activeVehicles: 0,
    driversOnDuty: 0,
    pendingIssues: 0,
    upcomingServices: 0,
    fleetStatusData: [],
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch vehicles data
      const { data: vehicles, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('id, status, next_service');

      if (vehiclesError) throw vehiclesError;

      // Fetch drivers data
      const { data: drivers, error: driversError } = await supabase
        .from('drivers')
        .select('id, status');

      if (driversError) throw driversError;

      // Fetch inspections data
      const { data: inspections, error: inspectionsError } = await supabase
        .from('inspections')
        .select('id, status, inspection_date, type, vehicle_id')
        .order('inspection_date', { ascending: false })
        .limit(10);

      if (inspectionsError) throw inspectionsError;

      // Calculate statistics
      const totalVehicles = vehicles?.length || 0;
      const activeVehicles = vehicles?.filter(v => v.status === 'active').length || 0;
      const driversOnDuty = drivers?.filter(d => d.status === 'active').length || 0;
      const pendingIssues = inspections?.filter(i => i.status === 'pending').length || 0;

      // Calculate upcoming services (next 30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      const upcomingServices = vehicles?.filter(v => 
        v.next_service && new Date(v.next_service) <= thirtyDaysFromNow
      ).length || 0;

      // Calculate fleet status distribution
      const statusCounts = vehicles?.reduce((acc, vehicle) => {
        acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const fleetStatusData = [
        { 
          name: 'Operational', 
          value: Math.round(((statusCounts.active || 0) / totalVehicles) * 100) || 0, 
          color: '#10b981',
          count: statusCounts.active || 0
        },
        { 
          name: 'Maintenance', 
          value: Math.round(((statusCounts.maintenance || 0) / totalVehicles) * 100) || 0, 
          color: '#f59e0b',
          count: statusCounts.maintenance || 0
        },
        { 
          name: 'Out of Service', 
          value: Math.round(((statusCounts.inactive || 0) / totalVehicles) * 100) || 0, 
          color: '#ef4444',
          count: statusCounts.inactive || 0
        }
      ].filter(item => item.value > 0);

      // Format recent activities
      const recentActivities = inspections?.map(inspection => ({
        id: inspection.id,
        type: 'inspection' as const,
        message: `${inspection.type} inspection ${inspection.status}`,
        timestamp: inspection.inspection_date,
        vehicleId: inspection.vehicle_id || undefined
      })) || [];

      setStats({
        totalVehicles,
        activeVehicles,
        driversOnDuty,
        pendingIssues,
        upcomingServices,
        fleetStatusData,
        recentActivities
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Fehler beim Laden der Dashboard-Daten",
        description: "Die Dashboard-Statistiken konnten nicht geladen werden.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Reduced refresh interval to 10 minutes for better performance
    const interval = setInterval(fetchDashboardData, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, refetch: fetchDashboardData };
}
