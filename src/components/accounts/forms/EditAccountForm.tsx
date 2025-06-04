
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAccountFormSchema, EditAccountFormValues } from "./EditAccountFormSchema";
import { Form } from "@/components/ui/form";
import { 
  NameField,
  RoleField,
  FormActions
} from "./fields";
import { PhoneField } from "./fields/PhoneField";
import { CompanyField } from "./fields/CompanyField";
import { JobTitleField } from "./fields/JobTitleField";

interface Profile {
  id: string;
  name: string;
  role: string;
  phone_number?: string;
  company?: string;
  job_title?: string;
  activation_date?: string;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

interface EditAccountFormProps {
  user: Profile;
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
      role: user.role as any,
      phone_number: user.phone_number || "",
      company: user.company || "",
      job_title: user.job_title || ""
    },
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <NameField />
          <RoleField />
          <PhoneField />
          <CompanyField />
          <JobTitleField />
          <FormActions isLoading={isLoading} onCancel={onCancel} />
        </form>
      </Form>
    </FormProvider>
  );
}
