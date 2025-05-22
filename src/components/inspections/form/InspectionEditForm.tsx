
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Inspection } from "../types/inspection-types";
import { inspectionFormSchema, InspectionFormValues } from "./inspectionEditFormTypes";

interface InspectionEditFormProps {
  inspection: Inspection;
  isThaiLanguage: boolean;
  onSubmit: () => void;
}

export function InspectionEditForm({ 
  inspection, 
  isThaiLanguage,
  onSubmit 
}: InspectionEditFormProps) {
  const form = useForm<InspectionFormValues>({
    resolver: zodResolver(inspectionFormSchema),
    defaultValues: {
      type: inspection.type.en,
      status: inspection.status.en,
      completedItems: inspection.completedItems,
      totalItems: inspection.totalItems,
      notes: "",
    }
  });

  const handleSubmit = (data: InspectionFormValues) => {
    console.log("Form submitted with data:", data);
    // In a real app, we would update the inspection here
    onSubmit();
  };

  return (
    <Form {...form}>
      <form 
        id="inspection-edit-form" 
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 py-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isThaiLanguage ? "ประเภทการตรวจสอบ" : "Inspektionstyp"}
              </FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={isThaiLanguage ? "เลือกประเภท" : "Typ auswählen"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="maintenance">
                    {isThaiLanguage ? "การบำรุงรักษา" : "Wartung"}
                  </SelectItem>
                  <SelectItem value="safety">
                    {isThaiLanguage ? "ความปลอดภัย" : "Sicherheit"}
                  </SelectItem>
                  <SelectItem value="damage">
                    {isThaiLanguage ? "ความเสียหาย" : "Schaden"}
                  </SelectItem>
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
                {isThaiLanguage ? "สถานะ" : "Status"}
              </FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={isThaiLanguage ? "เลือกสถานะ" : "Status auswählen"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="completed">
                    {isThaiLanguage ? "เสร็จสมบูรณ์" : "Abgeschlossen"}
                  </SelectItem>
                  <SelectItem value="in-progress">
                    {isThaiLanguage ? "กำลังดำเนินการ" : "In Bearbeitung"}
                  </SelectItem>
                  <SelectItem value="scheduled">
                    {isThaiLanguage ? "ตามกำหนดการ" : "Geplant"}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="completedItems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {isThaiLanguage ? "รายการที่เสร็จสมบูรณ์" : "Abgeschlossene Elemente"}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="totalItems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {isThaiLanguage ? "รายการทั้งหมด" : "Gesamtelemente"}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isThaiLanguage ? "บันทึก" : "Notizen"}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={isThaiLanguage ? "เพิ่มบันทึกที่นี่..." : "Notizen hier hinzufügen..."} 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
