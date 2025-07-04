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

    // Single optimized real-time subscription
    const channel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, () => {
        setTimeout(fetchData, 500); // Debounce updates
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'drivers' }, () => {
        setTimeout(fetchData, 500);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inspections' }, () => {
        setTimeout(fetchData, 500);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}