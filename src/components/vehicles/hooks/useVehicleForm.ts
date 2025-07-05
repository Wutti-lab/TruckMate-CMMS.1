import { useState, useEffect } from "react";
import { Vehicle } from "../types/VehicleTable";
import { VehicleFormData, getDefaultFormData, vehicleToFormData } from "../form/VehicleFormData";

interface UseVehicleFormProps {
  vehicle: Vehicle | null;
  isEditMode: boolean;
  open: boolean;
}

export function useVehicleForm({ vehicle, isEditMode, open }: UseVehicleFormProps) {
  const [formData, setFormData] = useState<VehicleFormData>(getDefaultFormData());

  useEffect(() => {
    if (vehicle && isEditMode) {
      setFormData(vehicleToFormData(vehicle));
    } else {
      setFormData(getDefaultFormData());
    }
  }, [vehicle, isEditMode, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes("level") || name.includes("temp") ? Number(value) : value
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent, onSave: (data: any) => void) => {
    e.preventDefault();
    
    const parsedFormData = {
      ...formData,
      next_service: new Date(formData.next_service)
    };
    
    onSave(parsedFormData);
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit
  };
}