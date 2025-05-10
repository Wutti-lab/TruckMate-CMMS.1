
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/lib/types/user-roles";
import { useLanguage } from "@/contexts/LanguageContext";
import { editAccountFormSchema, EditAccountFormValues } from "./EditAccountFormSchema";
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
import { Button } from "@/components/ui/button";

interface EditAccountFormProps {
  user: User & { status?: string };
  isLoading: boolean;
  onSubmit: (data: EditAccountFormValues) => Promise<void>;
  onCancel: () => void;
}

export function EditAccountForm({ 
  user, 
  isLoading, 
  onSubmit, 
  onCancel 
}: EditAccountFormProps) {
  const { language } = useLanguage();
  
  const form = useForm<EditAccountFormValues>({
    resolver: zodResolver(editAccountFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      status: (user as any).status || 'active'
    },
  });

  return (
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
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="dev_admin">Dev Admin</SelectItem>
                  <SelectItem value="fleet_manager">Fleet Manager</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="mechanic">Mechanic</SelectItem>
                  <SelectItem value="dispatcher">Dispatcher</SelectItem>
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
        
        <div className="flex justify-end gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
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
        </div>
      </form>
    </Form>
  );
}
