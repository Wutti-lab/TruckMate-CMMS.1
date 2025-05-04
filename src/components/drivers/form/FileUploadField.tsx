
import { FormMessage } from "@/components/ui/form";
import { FileUpload } from "@/components/inspections/FileUpload";
import { ReactNode } from "react";
import { UploadFile } from "../AddDriverForm";
import { FilePreview } from "./FilePreview";

interface FileUploadFieldProps {
  fieldName: string;
  icon: ReactNode;
  files: UploadFile[];
  onFileChange: (files: File[]) => void;
  onFileRemove: () => void;
  isRequired?: boolean;
  errorMessage?: string;
}

export function FileUploadField({ 
  fieldName, 
  icon, 
  files, 
  onFileChange, 
  onFileRemove, 
  isRequired = true,
  errorMessage 
}: FileUploadFieldProps) {
  return (
    <div className="mt-2 space-y-2">
      <div className="pl-6">
        {files.length > 0 ? (
          <div className="space-y-2">
            {files.map((file, i) => (
              <FilePreview key={i} file={file} onRemove={onFileRemove} />
            ))}
          </div>
        ) : (
          <FileUpload 
            onFilesSelected={onFileChange} 
            accept=".pdf,.jpg,.jpeg,.png"
            icon={icon}
            required={isRequired}
          />
        )}
      </div>
      {isRequired && errorMessage && (
        <FormMessage>
          {errorMessage}
        </FormMessage>
      )}
    </div>
  );
}
