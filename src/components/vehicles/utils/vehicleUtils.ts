export function getStatusVariant(status: string) {
  switch (status) {
    case 'active': return 'default';
    case 'maintenance': return 'destructive';
    case 'inactive': return 'secondary';
    default: return 'outline';
  }
}

export function filterVehicles(vehicles: any[], searchQuery: string) {
  if (!searchQuery) return vehicles;
  
  const query = searchQuery.toLowerCase();
  return vehicles.filter(vehicle => (
    vehicle.license_plate.toLowerCase().includes(query) ||
    vehicle.model.toLowerCase().includes(query) ||
    vehicle.status.toLowerCase().includes(query) ||
    vehicle.location.toLowerCase().includes(query)
  ));
}