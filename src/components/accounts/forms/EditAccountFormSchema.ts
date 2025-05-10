
import { z } from "zod";
import { UserRole } from "@/lib/types/user-roles";

// Form schema for account editing
export const editAccountFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().optional(),
  role: z.enum([
    UserRole.ADMIN,
    UserRole.DEV_ADMIN,
    UserRole.FLEET_MANAGER,
    UserRole.DRIVER,
    UserRole.MECHANIC,
    UserRole.DISPATCHER
  ]),
  status: z.enum(['active', 'inactive'])
});

export type EditAccountFormValues = z.infer<typeof editAccountFormSchema>;
