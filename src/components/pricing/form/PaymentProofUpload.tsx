
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
    <div className="space-y-1">
      <Label className="text-sm">{t("uploadPaymentProof")}</Label>
      <FileUpload
        onFilesSelected={onFilesSelected}
        accept=".pdf,.jpg,.jpeg,.png"
        icon={<ArrowUp className="h-5 w-5" />}
        className="bg-background border-border p-3"
        iconClassName="text-gray-500"
      />
      
      {uploadedFiles.length > 0 && (
        <div className="text-xs text-center text-green-600">
          {uploadedFiles.length} {t("fileSelected")}
        </div>
      )}
    </div>
  );
}
