
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/lib/types/user-roles";
import { editAccountFormSchema, EditAccountFormValues } from "./EditAccountFormSchema";
import { Form } from "@/components/ui/form";
import { 
  NameField,
  EmailField,
  PasswordField,
  RoleField,
  StatusField,
  FormActions
} from "./fields";

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
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <NameField />
          <EmailField />
          <PasswordField />
          <RoleField />
          <StatusField />
          <FormActions isLoading={isLoading} onCancel={onCancel} />
        </form>
      </Form>
    </FormProvider>
  );
}
