
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const allowedFileTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv",
  ];

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
      const validFiles = Array.from(e.target.files).filter(file => 
        allowedFileTypes.includes(file.type)
      );
      
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
      const validFiles = Array.from(e.dataTransfer.files).filter(file => 
        allowedFileTypes.includes(file.type)
      );
      
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
      className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
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
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <FilePlus className="h-10 w-10 text-muted-foreground" />
        <div className="space-y-1">
          <p className="text-sm font-medium">
            Drag & drop files or click to browse | ลากและวางไฟล์หรือคลิกเพื่อเรียกดู
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, Word, Excel, CSV | รองรับ PDF, Word, Excel, CSV
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleClick} className="mt-2">
          Select Files | เลือกไฟล์
        </Button>
      </div>
    </div>
  );
}
