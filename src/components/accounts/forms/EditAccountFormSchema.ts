
import { z } from "zod";
import { UserRole } from "@/lib/types/user-roles";

// Form schema for account editing - updated to match Profile type
export const editAccountFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.enum([
    UserRole.ADMIN,
    UserRole.DEV_ADMIN,
    UserRole.FLEET_MANAGER,
    UserRole.DRIVER,
    UserRole.MECHANIC,
    UserRole.DISPATCHER
  ]),
  phone_number: z.string().optional(),
  company: z.string().optional(),
  job_title: z.string().optional(),
});

export type EditAccountFormValues = z.infer<typeof editAccountFormSchema>;
