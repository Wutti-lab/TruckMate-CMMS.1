
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
}

export function FormActions({ isSubmitting }: FormActionsProps) {
  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting... | กำลังส่ง..." : "Create Inspection | สร้างการตรวจสอบ"}
      </Button>
    </div>
  );
}
