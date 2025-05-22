
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { FileUpload } from "@/components/inspections/FileUpload";

interface DocumentsUploadProps {
  onFilesChanged: (files: File[]) => void;
}

export function DocumentsUpload({ onFilesChanged }: DocumentsUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (newFiles: File[]) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChanged(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChanged(updatedFiles);
  };

  return (
    <div className="space-y-4">
      <div>
        <FormLabel className="block mb-2">
          Documents | เอกสาร
        </FormLabel>
        <FileUpload onFilesSelected={handleFileChange} />
        <p className="text-sm text-muted-foreground mt-1">
          Upload documents (PDF, Excel, Word) | อัปโหลดเอกสาร (PDF, Excel, Word)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Attached Files | ไฟล์แนบ:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-muted-foreground" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
