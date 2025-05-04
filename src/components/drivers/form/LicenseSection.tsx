
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FileImage } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DriverFormValues, UploadFile } from "../AddDriverForm";
import { FileUploadField } from "./FileUploadField";

interface LicenseSectionProps {
  form: UseFormReturn<DriverFormValues>;
  uploadedFiles: Record<string, UploadFile[]>;
  handleFileChange: (fieldName: keyof typeof uploadedFiles) => (files: File[]) => void;
}

export function LicenseSection({ form, uploadedFiles, handleFileChange }: LicenseSectionProps) {
  return (
    <div className="grid gap-4">
      <FormField
        control={form.control}
        name="license3"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Class 3 License | ใบขับขี่ประเภท 3</FormLabel>
            </div>
            <FormField
              control={form.control}
              name="license3File"
              render={({ fieldState }) => (
                <FormItem>
                  <FileUploadField
                    fieldName="license3File"
                    icon={<FileImage size={16} />}
                    files={uploadedFiles.license3File}
                    onFileChange={handleFileChange("license3File")}
                    onFileRemove={() => {
                      form.setValue("license3File", undefined);
                      form.trigger("license3File");
                      handleFileChange("license3File")([]);
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                </FormItem>
              )}
            />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="license4"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (!checked) {
                    handleFileChange("license4File")([]);
                    form.setValue("license4File", undefined);
                  }
                }} />
              </FormControl>
              <FormLabel className="!mt-0">Class 4 License | ใบขับขี่ประเภท 4</FormLabel>
            </div>
            {field.value && (
              <FormField
                control={form.control}
                name="license4File"
                render={({ fieldState }) => (
                  <FormItem>
                    <FileUploadField
                      fieldName="license4File"
                      icon={<FileImage size={16} />}
                      files={uploadedFiles.license4File}
                      onFileChange={handleFileChange("license4File")}
                      onFileRemove={() => {
                        form.setValue("license4File", undefined);
                        handleFileChange("license4File")([]);
                      }}
                      isRequired={false}
                      errorMessage={fieldState.error?.message}
                    />
                  </FormItem>
                )}
              />
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
