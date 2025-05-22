
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./inspectionFormTypes";

interface NotesFieldProps {
  form: UseFormReturn<FormValues>;
}

export function NotesField({ form }: NotesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notes | หมายเหตุ</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Add any additional notes here | เพิ่มหมายเหตุเพิ่มเติมที่นี่" 
              className="min-h-[100px]"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
