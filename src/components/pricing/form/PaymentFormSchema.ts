
import * as z from "zod";

export const paymentFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Must be a valid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  company: z.string().min(1, { message: "Company name is required" }),
});

export type PaymentFormData = z.infer<typeof paymentFormSchema>;
