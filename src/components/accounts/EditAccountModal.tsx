
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Input } from "@/components/ui/input";
import { Account } from "./AccountsTable";
import { UserRole } from "@/lib/types/user-roles";
import { useLanguage } from "@/contexts/LanguageContext";

// Hier fügen wir alle möglichen UserRole Werte hinzu
const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

interface EditAccountModalProps {
  account: Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedAccount: Account) => void;
}

export function EditAccountModal({ 
  account, 
  open, 
  onOpenChange, 
  onSave 
}: EditAccountModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account.name,
      email: account.email,
      password: "",
      role: account.role,
      status: account.status
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const updatedAccount = {
        ...account,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status
      };
      
      if (data.password && data.password.trim() !== "") {
        updatedAccount.password = data.password;
      }
      
      onSave(updatedAccount);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Edit Account' : 
             language === 'th' ? 'แก้ไขบัญชี' : 
             'Konto bearbeiten'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' ? 'Make changes to the user account.' : 
             language === 'th' ? 'ทำการเปลี่ยนแปลงบัญชีผู้ใช้' : 
             'Nehmen Sie Änderungen am Benutzerkonto vor.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'en' ? 'Name' : 
                     language === 'th' ? 'ชื่อ' : 
                     'Name'}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>
                    {language === 'en' ? 'Email' : 
                     language === 'th' ? 'อีเมล' : 
                     'E-Mail'}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>
                    {language === 'en' ? 'Password (leave blank to keep current)' : 
                     language === 'th' ? 'รหัสผ่าน (เว้นว่างไว้เพื่อใช้รหัสปัจจุบัน)' : 
                     'Passwort (leer lassen, um aktuelles beizubehalten)'}
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'en' ? 'Role' : 
                     language === 'th' ? 'บทบาท' : 
                     'Rolle'}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.DEV_ADMIN}>Dev Admin</SelectItem>
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
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'en' ? 'Status' : 
                     language === 'th' ? 'สถานะ' : 
                     'Status'}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                type="button"
              >
                {language === 'en' ? 'Cancel' : 
                 language === 'th' ? 'ยกเลิก' : 
                 'Abbrechen'}
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 
                  (language === 'en' ? 'Saving...' : 
                   language === 'th' ? 'กำลังบันทึก...' : 
                   'Speichern...') : 
                  (language === 'en' ? 'Save changes' : 
                   language === 'th' ? 'บันทึกการเปลี่ยนแปลง' : 
                   'Änderungen speichern')
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
