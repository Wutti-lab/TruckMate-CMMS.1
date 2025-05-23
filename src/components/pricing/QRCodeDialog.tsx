
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThaiPaymentDetails } from "./ThaiPaymentDetails";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmPayment: () => void;
}

// Create a schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Must be a valid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  company: z.string().min(2, { message: "Company name is required" }),
});

export function QRCodeDialog({ open, onOpenChange, onConfirmPayment }: QRCodeDialogProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form data submitted:", data);
    
    // Show thank you message
    setShowThankYou(true);
    
    // Simulate sending the request
    setTimeout(() => {
      toast({
        title: t("requestReceived"),
        description: t("teamWillContact"),
      });
      
      // Close dialog and call onConfirmPayment after a delay
      setTimeout(() => {
        form.reset();
        setShowThankYou(false);
        onConfirmPayment();
      }, 1500);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t("contactInformation")}</DialogTitle>
        </DialogHeader>
        
        {showThankYou ? (
          <div className="py-8 text-center">
            <h3 className="text-xl font-semibold mb-2">{t("thankYou")}</h3>
            <p>{t("teamWillContact")}</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 pt-4">
              <p className="text-center text-muted-foreground">{t("leaveYourInfo")}</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("fullName")} {...field} />
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
                          <Input placeholder="email@example.com" type="email" {...field} />
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
                        <FormLabel>{t("phone")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contactNumber")} {...field} />
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
                          <Input placeholder={t("companyName")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="pt-4">
                    <Button type="submit" className="w-full">
                      {t("submit")}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-center text-muted-foreground">{t("paymentDetails")}</p>
              <ThaiPaymentDetails />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
