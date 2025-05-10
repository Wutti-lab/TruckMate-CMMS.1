import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from 'uuid';
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
});

interface FormData extends z.infer<typeof formSchema> {}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { createPendingUser } = useAuth();
  const { language } = useLanguage();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      company: "",
      phone: "",
      jobTitle: "",
    },
  });

  const handleRegistration = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Simulate registration process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if createPendingUser is available and is a function
      if (createPendingUser && typeof createPendingUser === 'function') {
        // Create pending user with correct types
        createPendingUser({
          id: uuidv4(),
          name: data.name,
          email: data.email,
          password: data.password,
          role: UserRole.FLEET_MANAGER,
          createdAt: new Date().toISOString(),
          approvalStatus: 'approved', // Auto-approve
          paymentStatus: 'paid' as 'paid' | 'unpaid', // Explicitly type as union type
          company: data.company || '',
          phoneNumber: data.phone || '',
          jobTitle: data.jobTitle || '',
        });

        toast({
          title: language === 'de' ? "Konto erstellt" : language === 'th' ? "สร้างบัญชีแล้ว" : "Account Created",
          description: language === 'de' ? "Ihr Konto wurde erfolgreich erstellt." : language === 'th' ? "บัญชีของคุณถูกสร้างเรียบร้อยแล้ว" : "Your account has been successfully created.",
        });
        router.push("/login");
      } else {
        console.error("createPendingUser is not a function or is undefined");
        toast({
          variant: "destructive",
          title: language === 'de' ? "Registrierungsfehler" : language === 'th' ? "ข้อผิดพลาดในการลงทะเบียน" : "Registration Error",
          description: language === 'de' ? "Benutzer konnte nicht erstellt werden." : language === 'th' ? "ไม่สามารถสร้างผู้ใช้ได้" : "Could not create user.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'de' ? "Registrierungsfehler" : language === 'th' ? "ข้อผิดพลาดในการลงทะเบียน" : "Registration Error",
        description: language === 'de' ? "Etwas ist schief gelaufen." : language === 'th' ? "มีบางอย่างผิดพลาด" : "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegistration)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'de' ? "Name" : language === 'th' ? "ชื่อ" : "Name"}</FormLabel>
              <FormControl>
                <Input placeholder={language === 'de' ? "Ihr Name" : language === 'th' ? "ชื่อของคุณ" : "Your name"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@truckmate.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'de' ? "Passwort" : language === 'th' ? "รหัสผ่าน" : "Password"}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'de' ? "Firma (optional)" : language === 'th' ? "บริษัท (ไม่บังคับ)" : "Company (optional)"}</FormLabel>
              <FormControl>
                <Input placeholder={language === 'de' ? "Ihre Firma" : language === 'th' ? "บริษัทของคุณ" : "Your company"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'de' ? "Telefon (optional)" : language === 'th' ? "โทรศัพท์ (ไม่บังคับ)" : "Phone (optional)"}</FormLabel>
              <FormControl>
                <Input placeholder={language === 'de' ? "Ihre Telefonnummer" : language === 'th' ? "เบอร์โทรศัพท์ของคุณ" : "Your phone number"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'de' ? "Berufsbezeichnung (optional)" : language === 'th' ? "ตำแหน่งงาน (ไม่บังคับ)" : "Job Title (optional)"}</FormLabel>
              <FormControl>
                <Input placeholder={language === 'de' ? "Ihre Berufsbezeichnung" : language === 'th' ? "ตำแหน่งงานของคุณ" : "Your job title"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && (
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
            </svg>
          )}
          {language === 'de' ? "Konto erstellen" : language === 'th' ? "สร้างบัญชี" : "Create account"}
        </Button>
      </form>
    </Form>
  );
}
