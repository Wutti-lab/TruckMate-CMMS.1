
import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required | ต้องระบุชื่อเรื่อง",
  }),
  vehicleId: z.string().min(1, {
    message: "Vehicle is required | ต้องระบุยานพาหนะ",
  }),
  inspectionType: z.string().min(1, {
    message: "Inspection type is required | ต้องระบุประเภทการตรวจสอบ",
  }),
  notes: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export const vehicles = [
  { id: "v1", name: "Truck 001 - Toyota Hilux" },
  { id: "v2", name: "Truck 002 - Isuzu D-Max" },
  { id: "v3", name: "Van 001 - Toyota HiAce" },
  { id: "v4", name: "Van 002 - Hyundai H1" },
];

export const inspectionTypes = [
  { id: "daily", name: "Daily Inspection | การตรวจสอบประจำวัน" },
  { id: "maintenance", name: "Maintenance Check | การตรวจสอบการบำรุงรักษา" },
  { id: "safety", name: "Safety Inspection | การตรวจสอบความปลอดภัย" },
  { id: "damage", name: "Damage Report | รายงานความเสียหาย" },
];
