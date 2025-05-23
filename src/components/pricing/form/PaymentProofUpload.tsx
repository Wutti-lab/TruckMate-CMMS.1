
import React from "react";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/inspections/FileUpload";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUp } from "lucide-react";

interface PaymentProofUploadProps {
  onFilesSelected: (files: File[]) => void;
  uploadedFiles: File[];
}

export function PaymentProofUpload({ onFilesSelected, uploadedFiles }: PaymentProofUploadProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      <Label>{t("uploadPaymentProof")}</Label>
      <FileUpload
        onFilesSelected={onFilesSelected}
        accept=".pdf,.jpg,.jpeg,.png"
        icon={<ArrowUp className="h-6 w-6 text-muted-foreground" />}
      />
      
      {uploadedFiles.length > 0 && (
        <div className="text-sm text-center text-green-600">
          {uploadedFiles.length} {t("fileSelected")}
        </div>
      )}
    </div>
  );
}
