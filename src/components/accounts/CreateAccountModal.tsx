
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";
import { useState as useStatePayment } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, QrCode } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CreateAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.enum([
    UserRole.ADMIN, 
    UserRole.FLEET_MANAGER, 
    UserRole.DRIVER, 
    UserRole.MECHANIC, 
    UserRole.DISPATCHER
  ]),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateAccountModal({ open, onOpenChange }: CreateAccountModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.DRIVER,
    },
  });
  
  const { toast } = useToast();
  const { createPendingUser } = useAuth();
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const { language } = useLanguage();

  const onSubmit = (data: FormValues) => {
    if (!showPaymentInfo) {
      setShowPaymentInfo(true);
      return;
    }
    
    if (!paymentConfirmed) {
      toast({
        variant: "destructive",
        title: "Payment confirmation required",
        description: "Please confirm payment of 2000 THB before creating account",
      });
      return;
    }
    
    createPendingUser({
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
      paymentStatus: "paid",
      approvalStatus: "pending",
      createdAt: new Date().toISOString()
    });
    
    toast({
      title: "Account registration submitted",
      description: "The account has been submitted for approval after payment confirmation.",
    });
    
    form.reset();
    setShowPaymentInfo(false);
    setPaymentConfirmed(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    form.reset();
    setShowPaymentInfo(false);
    setPaymentConfirmed(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Account | สร้างบัญชีใหม่</DialogTitle>
          <DialogDescription>
            {!showPaymentInfo ? "Fill in the details below to create a new user account." : 
             "A payment of 2000 THB is required to activate this account."}
          </DialogDescription>
        </DialogHeader>
        
        {showPaymentInfo ? (
          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Payment Required | จำเป็นต้องชำระเงิน</AlertTitle>
              <AlertDescription>
                A payment of 2000 THB is required to activate this account. 
                <br />
                จำเป็นต้องชำระเงิน 2000 บาทเพื่อเปิดใช้งานบัญชีนี้
              </AlertDescription>
            </Alert>
            
            <div className="rounded-md border p-4 space-y-2">
              <h3 className="font-medium">Payment Information | ข้อมูลการชำระเงิน</h3>
              
              <div className="flex flex-col items-center justify-center mt-4 mb-2">
                <div className="max-w-[200px] mb-4">
                  <img 
                    src="/lovable-uploads/1227902a-2033-4df9-a3c7-382e79e5b997.png" 
                    alt="PromptPay QR Code"
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="text-center">
                  <p className="font-medium">
                    {language === 'th' ? 'พร้อมเพย์' : 
                     language === 'de' ? 'PromptPay' : 
                     'PromptPay'}
                  </p>
                  <p className="text-sm">
                    {language === 'th' ? 'เบอร์โทร: 080-929-9965' : 
                     language === 'de' ? 'Telefon: 080-929-9965' : 
                     'Phone: 080-929-9965'}
                  </p>
                  <p className="text-sm mt-2">
                    {language === 'th' ? 'อ้างอิง: ' : 
                     language === 'de' ? 'Referenz: ' : 
                     'Reference: '}{form.getValues("email")}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="confirm-payment"
                checked={paymentConfirmed}
                onChange={(e) => setPaymentConfirmed(e.target.checked)}
                className="mr-2 h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="confirm-payment" className="text-sm">
                I confirm that the payment has been made | ฉันยืนยันว่าได้ชำระเงินแล้ว
              </label>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogFooter className="mt-5">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setShowPaymentInfo(false)}
                  >
                    Back | ย้อนกลับ
                  </Button>
                  <Button type="submit">Submit | ส่ง</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name | ชื่อ</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email | อีเมล</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
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
                    <FormLabel>Password | รหัสผ่าน</FormLabel>
                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 6 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role | บทบาท</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.FLEET_MANAGER}>Fleet Manager</SelectItem>
                        <SelectItem value={UserRole.DRIVER}>Driver</SelectItem>
                        <SelectItem value={UserRole.MECHANIC}>Mechanic</SelectItem>
                        <SelectItem value={UserRole.DISPATCHER}>Dispatcher</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={handleCancel}
                >
                  Cancel | ยกเลิก
                </Button>
                <Button type="submit">Continue | ดำเนินการต่อ</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
