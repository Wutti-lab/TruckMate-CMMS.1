
export interface Inspection {
  id: number;
  vehicleId: string;
  type: { 
    en: string; 
    th: string 
  };
  status: { 
    en: string; 
    th: string 
  };
  date: string;
  completedItems: number;
  totalItems: number;
  notes?: string;
}
