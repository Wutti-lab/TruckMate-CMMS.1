
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export function FileUpload({ 
  onFilesSelected, 
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.csv", 
  icon,
  required = false
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const allowedFileTypes = accept.split(',').map(type => {
    if (type.startsWith('.')) {
      switch (type) {
        case '.pdf': return 'application/pdf';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        case '.png': return 'image/png';
        case '.doc': return 'application/msword';
        case '.docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        case '.xls': return 'application/vnd.ms-excel';
        case '.xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        case '.csv': return 'text/csv';
        default: return '';
      }
    }
    return type;
  }).filter(Boolean);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = Array.from(e.target.files).filter(file => {
        // If no explicit types are provided, accept all
        if (allowedFileTypes.length === 0) return true;
        
        // Check file type against allowed types
        for (const allowedType of allowedFileTypes) {
          if (file.type.includes(allowedType) || allowedType.includes(file.type)) {
            return true;
          }
        }
        return false;
      });
      
      if (validFiles.length !== e.target.files.length) {
        console.warn("Some files were filtered out because they are not supported.");
      }
      
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
      
      // Reset the input to allow uploading the same file again
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = Array.from(e.dataTransfer.files).filter(file => {
        // If no explicit types are provided, accept all
        if (allowedFileTypes.length === 0) return true;
        
        // Check file type against allowed types
        for (const allowedType of allowedFileTypes) {
          if (file.type.includes(allowedType) || allowedType.includes(file.type)) {
            return true;
          }
        }
        return false;
      });
      
      if (validFiles.length !== e.dataTransfer.files.length) {
        console.warn("Some files were filtered out because they are not supported.");
      }
      
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-md p-4 text-center transition-colors ${
        dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        required={required}
      />
      <div className="flex flex-col items-center justify-center gap-1">
        {icon || <FilePlus className="h-8 w-8 text-muted-foreground" />}
        <div className="space-y-1">
          <p className="text-xs font-medium">
            {required ? '* ' : ''}Upload photo or PDF | อัปโหลดรูปภาพหรือ PDF
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleClick} className="mt-1 text-xs py-1 h-auto">
          Select File | เลือกไฟล์
        </Button>
      </div>
    </div>
  );
}
