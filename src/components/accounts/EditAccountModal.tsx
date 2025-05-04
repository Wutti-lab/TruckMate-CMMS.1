
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Account } from "./AccountsTable";
import { UserRole } from "@/lib/types/user-roles";

interface EditAccountModalProps {
  account: Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (account: Account) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.enum([
    UserRole.ADMIN, 
    UserRole.FLEET_MANAGER, 
    UserRole.DRIVER, 
    UserRole.MECHANIC, 
    UserRole.DISPATCHER
  ]),
  status: z.enum(['active', 'inactive']),
});

type FormValues = z.infer<typeof formSchema>;

export function EditAccountModal({ account, open, onOpenChange, onSave }: EditAccountModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account.name,
      email: account.email,
      role: account.role,
      status: account.status,
    },
  });

  const onSubmit = (data: FormValues) => {
    onSave({
      ...account,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Account | แก้ไขบัญชี</DialogTitle>
          <DialogDescription>
            Update the account details below.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name | ชื่อ</FormLabel>
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
                  <FormLabel>Email | อีเมล</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                  <FormLabel>Role | บทบาท</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
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
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status | สถานะการใช้งาน</FormLabel>
                    <FormDescription>
                      {field.value === 'active' 
                        ? 'Account is active and user can log in.' 
                        : 'Account is inactive and user cannot log in.'}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === 'active'}
                      onCheckedChange={(checked) => 
                        field.onChange(checked ? 'active' : 'inactive')
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
              >
                Cancel | ยกเลิก
              </Button>
              <Button type="submit">Save Changes | บันทึกการเปลี่ยนแปลง</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
