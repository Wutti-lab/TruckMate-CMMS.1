
import * as z from "zod";

export const inspectionFormSchema = z.object({
  type: z.string().min(1, {
    message: "Type is required | ต้องระบุประเภท | Typ ist erforderlich",
  }),
  status: z.string().min(1, {
    message: "Status is required | ต้องระบุสถานะ | Status ist erforderlich",
  }),
  completedItems: z.number().int().min(0, {
    message: "Must be a positive number | ต้องเป็นจำนวนบวก | Muss eine positive Zahl sein",
  }),
  totalItems: z.number().int().min(1, {
    message: "Must be at least 1 | ต้องมีอย่างน้อย 1 | Muss mindestens 1 sein",
  }),
  notes: z.string().optional(),
});

export type InspectionFormValues = z.infer<typeof inspectionFormSchema>;
