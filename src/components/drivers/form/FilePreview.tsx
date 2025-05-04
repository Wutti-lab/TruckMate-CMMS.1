
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { UploadFile } from "../AddDriverForm";

interface FilePreviewProps {
  file: UploadFile;
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  if (file.type.includes('image')) {
    return (
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gray-50 rounded-md border">
          <img 
            src={file.url} 
            alt={file.name} 
            className="max-h-24 max-w-full rounded-sm object-contain" 
          />
        </div>
        <Button 
          type="button" 
          variant="destructive" 
          size="sm" 
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    );
  } 
  
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-gray-50 rounded-md border flex items-center gap-2">
        <FileText className={file.type.includes('pdf') ? "text-red-500" : ""} />
        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
      </div>
      <Button 
        type="button" 
        variant="destructive" 
        size="sm" 
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  );
}
