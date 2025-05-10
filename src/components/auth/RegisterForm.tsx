
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Phone } from "lucide-react";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { generateLicenseKey } from "@/lib/utils/customerUtils";
import { useToast } from "@/hooks/use-toast";

// Extended registration schema with additional fields
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(6, { message: "Please enter a valid phone number" }),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { createPendingUser } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      company: "",
      jobTitle: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    
    // Create a pending user with payment status set to 'paid' so they appear as a customer
    const newUser = {
      id: `user-${Date.now()}`,
      name: values.name,
      email: values.email,
      password: values.password,
      role: 'customer',
      createdAt: new Date().toISOString(),
      approvalStatus: 'approved',
      paymentStatus: 'paid',
      paymentReference: generateLicenseKey().substring(0, 8),
      company: values.company || values.name + " GmbH", // Default company name if not provided
      phoneNumber: values.phoneNumber,
      jobTitle: values.jobTitle || ''
    };
    
    // Create the pending user (which will be converted to a customer)
    createPendingUser(newUser);
    
    toast({
      title: t("registrationSuccessful") || "Registration Successful",
      description: t("accountCreatedAndActive") || "Your account has been created and is now active"
    });
    
    // Navigate to the login page after successful registration
    navigate("/login");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("register")}</CardTitle>
        <CardDescription>
          {t("createAccountDescription")}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("namePlaceholder")} {...field} />
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
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("emailPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phoneNumber")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Phone size={16} />
                      </span>
                      <Input 
                        placeholder="+49 123 456789" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
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
                  <FormLabel>{t("company")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("companyPlaceholder")} {...field} />
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
                  <FormLabel>{t("jobTitle")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("jobTitlePlaceholder")} {...field} />
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
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPassword")}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-fleet-600 hover:bg-fleet-700"
            >
              {t("createAccountButton")}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t("alreadyHaveAccount")} <Link to="/login" className="text-fleet-600 hover:underline">{t("login")}</Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
