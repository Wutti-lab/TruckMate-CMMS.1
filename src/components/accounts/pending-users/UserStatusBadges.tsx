
import { Badge } from "@/components/ui/badge";

interface PaymentStatusBadgeProps {
  status: string;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  if (status === "paid") {
    return <Badge variant="secondary" className="bg-green-100 text-green-800">Paid | ชำระแล้ว</Badge>;
  }
  return <Badge variant="outline">Unpaid | ยังไม่ชำระ</Badge>;
}

interface ApprovalStatusBadgeProps {
  status: string;
}

export function ApprovalStatusBadge({ status }: ApprovalStatusBadgeProps) {
  switch(status) {
    case "pending":
      return <Badge variant="secondary">Pending | รออนุมัติ</Badge>;
    case "approved":
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved | อนุมัติแล้ว</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected | ถูกปฏิเสธ</Badge>;
    default:
      return null;
  }
}
