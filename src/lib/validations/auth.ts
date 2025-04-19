
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Gültige E-Mail-Adresse erforderlich" }),
  password: z.string().min(6, { message: "Passwort muss mindestens 6 Zeichen haben" }),
  remember: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name muss mindestens 2 Zeichen haben" }),
  email: z.string().email({ message: "Gültige E-Mail-Adresse erforderlich" }),
  password: z.string().min(6, { message: "Passwort muss mindestens 6 Zeichen haben" }),
  confirmPassword: z.string().min(6, { message: "Passwort muss mindestens 6 Zeichen haben" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
});
