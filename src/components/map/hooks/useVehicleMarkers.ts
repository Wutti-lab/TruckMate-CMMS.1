
import { useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { useLocation } from '@/contexts/LocationContext';

export function useVehicleMarkers() {
  const vehicleMarkers = useRef<Record<string, mapboxgl.Marker>>({});
  const { updateVehicleLocation } = useLocation();

  const addVehicleMarker = useCallback((vehicle: any, map: mapboxgl.Map) => {
    if (!map || !vehicle.lat || !vehicle.lng) return;
    
    const position: [number, number] = [vehicle.lng, vehicle.lat];
    const vehicleId = vehicle.id;
    
    if (vehicleMarkers.current[vehicleId]) {
      vehicleMarkers.current[vehicleId].remove();
    }
    
    const driverInfo = vehicle.vehicle_assignments?.[0]?.drivers;
    const driverName = driverInfo?.name || 'Unassigned';
    
    const el = document.createElement('div');
    el.className = 'vehicle-marker';
    el.style.width = '35px';
    el.style.height = '35px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = vehicle.status === 'active' ? '#10B981' : 
                              vehicle.status === 'maintenance' ? '#F59E0B' : 
                              vehicle.status === 'inactive' ? '#6B7280' : '#10B981';
    el.style.border = '3px solid white';
    el.style.display = 'flex';
    el.style.justifyContent = 'center';
    el.style.alignItems = 'center';
    el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    el.style.cursor = 'pointer';
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck" style="color: white;"><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>`;
    
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div style="font-family: system-ui, sans-serif; padding: 12px; min-width: 200px;">
          <h3 style="margin: 0 0 12px 0; font-weight: 600; color: #1f2937;">${vehicle.license_plate}</h3>
          <div style="display: grid; gap: 6px;">
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Model:</strong> <span>${vehicle.model}</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Driver:</strong> <span>${driverName}</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Status:</strong> 
              <span style="color: ${vehicle.status === 'active' ? '#059669' : vehicle.status === 'maintenance' ? '#D97706' : '#6B7280'};">
                ${vehicle.status}
              </span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Battery:</strong> <span>${vehicle.battery_level || 'N/A'}%</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Fuel:</strong> <span>${vehicle.fuel_level || 'N/A'}%</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Location:</strong> <span>${vehicle.location || 'Unknown'}</span>
            </p>
          </div>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            Last updated: ${new Date(vehicle.updated_at).toLocaleString()}
          </div>
        </div>
      `);
    
    const marker = new mapboxgl.Marker(el)
      .setLngLat(position)
      .setPopup(popup)
      .addTo(map);
    
    vehicleMarkers.current[vehicleId] = marker;
    
    return marker;
  }, []);

  const updateVehicleMarker = useCallback((vehicle: any) => {
    if (!vehicle.lat || !vehicle.lng) return;
    
    const position: [number, number] = [vehicle.lng, vehicle.lat];
    const vehicleId = vehicle.id;
    
    if (vehicleMarkers.current[vehicleId]) {
      vehicleMarkers.current[vehicleId].setLngLat(position);
    }
  }, []);

  const clearVehicleMarkers = useCallback(() => {
    Object.values(vehicleMarkers.current).forEach(marker => marker.remove());
    vehicleMarkers.current = {};
  }, []);

  const simulateVehicleMovement = useCallback((vehicles: any[]) => {
    vehicles.forEach(vehicle => {
      if (vehicle.status === 'active' && vehicle.lat && vehicle.lng) {
        const jitter = 0.0005 * (Math.random() - 0.5);
        const newLat = vehicle.lat + jitter;
        const newLng = vehicle.lng + jitter;
        
        vehicle.lat = newLat;
        vehicle.lng = newLng;
        updateVehicleMarker(vehicle);
        
        updateVehicleLocation(vehicle.id, {
          vehicleId: vehicle.id,
          coordinates: { lat: newLat, lng: newLng },
          timestamp: new Date().toISOString(),
          speed: Math.floor(Math.random() * 60),
          heading: Math.floor(Math.random() * 360),
        });
      }
    });
  }, [updateVehicleMarker, updateVehicleLocation]);

  return {
    addVehicleMarker,
    updateVehicleMarker,
    clearVehicleMarkers,
    simulateVehicleMovement,
    vehicleMarkersRef: vehicleMarkers
  };
}
