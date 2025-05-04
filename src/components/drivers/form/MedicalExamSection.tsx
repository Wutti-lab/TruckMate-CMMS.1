
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Camera, Eye, FileText, TestTube } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { DriverFormValues, UploadFile } from "../AddDriverForm";
import { FileUploadField } from "./FileUploadField";

interface MedicalExamSectionProps {
  form: UseFormReturn<DriverFormValues>;
  uploadedFiles: Record<string, UploadFile[]>;
  handleFileChange: (fieldName: keyof Record<string, UploadFile[]>) => (files: File[]) => void;
}

export function MedicalExamSection({ form, uploadedFiles, handleFileChange }: MedicalExamSectionProps) {
  return (
    <div className="grid gap-4">
      <FormField
        control={form.control}
        name="medicalExam"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Medical Examination | การตรวจร่างกาย</FormLabel>
            </div>
            <FormField
              control={form.control}
              name="medicalExamFile"
              render={({ fieldState }) => (
                <FormItem>
                  <FileUploadField
                    fieldName="medicalExamFile"
                    icon={<Camera size={16} />}
                    files={uploadedFiles.medicalExamFile}
                    onFileChange={handleFileChange("medicalExamFile")}
                    onFileRemove={() => {
                      form.setValue("medicalExamFile", undefined);
                      form.trigger("medicalExamFile");
                      handleFileChange("medicalExamFile")([]);
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
        name="visionTest"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Vision Test | การทดสอบสายตา</FormLabel>
            </div>
            <FormField
              control={form.control}
              name="visionTestFile"
              render={({ fieldState }) => (
                <FormItem>
                  <FileUploadField
                    fieldName="visionTestFile"
                    icon={<Eye size={16} />}
                    files={uploadedFiles.visionTestFile}
                    onFileChange={handleFileChange("visionTestFile")}
                    onFileRemove={() => {
                      form.setValue("visionTestFile", undefined);
                      form.trigger("visionTestFile");
                      handleFileChange("visionTestFile")([]);
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
        name="colorBlindTest"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Color Blindness Test | การทดสอบตาบอดสี</FormLabel>
            </div>
            <FormField
              control={form.control}
              name="colorBlindTestFile"
              render={({ fieldState }) => (
                <FormItem>
                  <FileUploadField
                    fieldName="colorBlindTestFile"
                    icon={<Eye size={16} />}
                    files={uploadedFiles.colorBlindTestFile}
                    onFileChange={handleFileChange("colorBlindTestFile")}
                    onFileRemove={() => {
                      form.setValue("colorBlindTestFile", undefined);
                      form.trigger("colorBlindTestFile");
                      handleFileChange("colorBlindTestFile")([]);
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
        name="hearingTest"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Hearing Test | การทดสอบการได้ยิน</FormLabel>
            </div>
            <FormField
              control={form.control}
              name="hearingTestFile"
              render={({ fieldState }) => (
                <FormItem>
                  <FileUploadField
                    fieldName="hearingTestFile"
                    icon={<FileText size={16} />}
                    files={uploadedFiles.hearingTestFile}
                    onFileChange={handleFileChange("hearingTestFile")}
                    onFileRemove={() => {
                      form.setValue("hearingTestFile", undefined);
                      form.trigger("hearingTestFile");
                      handleFileChange("hearingTestFile")([]);
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
        name="drugTest"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Drug Test | การทดสอบยา</FormLabel>
            </div>
            <FormField
              control={form.control}
              name="drugTestFile"
              render={({ fieldState }) => (
                <FormItem>
                  <FileUploadField
                    fieldName="drugTestFile"
                    icon={<TestTube size={16} />}
                    files={uploadedFiles.drugTestFile}
                    onFileChange={handleFileChange("drugTestFile")}
                    onFileRemove={() => {
                      form.setValue("drugTestFile", undefined);
                      form.trigger("drugTestFile");
                      handleFileChange("drugTestFile")([]);
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                </FormItem>
              )}
            />
          </FormItem>
        )}
      />
    </div>
  );
}
