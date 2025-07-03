import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RealtimeData {
  vehicles: any[];
  drivers: any[];
  inspections: any[];
  alerts: any[];
}

export function useRealtimeData() {
  const [data, setData] = useState<RealtimeData>({
    vehicles: [],
    drivers: [],
    inspections: [],
    alerts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const [vehiclesResult, driversResult, inspectionsResult] = await Promise.all([
        supabase.from('vehicles').select('*'),
        supabase.from('drivers').select('*'),
        supabase.from('inspections').select('*')
      ]);

      if (vehiclesResult.error) throw vehiclesResult.error;
      if (driversResult.error) throw driversResult.error;
      if (inspectionsResult.error) throw inspectionsResult.error;

      setData({
        vehicles: vehiclesResult.data || [],
        drivers: driversResult.data || [],
        inspections: inspectionsResult.data || [],
        alerts: [] // This would be populated from a real alerts system
      });
    } catch (err) {
      console.error('Error fetching realtime data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Set up real-time subscriptions
    const channels = [
      supabase
        .channel('vehicles-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, () => {
          fetchData();
        })
        .subscribe(),
      
      supabase
        .channel('drivers-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'drivers' }, () => {
          fetchData();
        })
        .subscribe(),
      
      supabase
        .channel('inspections-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'inspections' }, () => {
          fetchData();
        })
        .subscribe()
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}