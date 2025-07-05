
import { TableRow, TableCell } from "@/components/ui/table";
import { PendingUser } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { PaymentStatusBadge, ApprovalStatusBadge } from "./UserStatusBadges";
import { TimeDisplay } from "./TimeDisplay";
import { ApprovalActions } from "./ApprovalActions";
import { EmailActions } from "./EmailActions";

interface PendingUserRowProps {
  user: PendingUser;
  onApprove: (user: PendingUser) => void;
  onReject: (user: PendingUser) => void;
}

export function PendingUserRow({ user, onApprove, onReject }: PendingUserRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{user.full_name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {user.role.replace('_', ' ')}
        </Badge>
      </TableCell>
      <TableCell><PaymentStatusBadge status={user.paymentStatus} /></TableCell>
      <TableCell><ApprovalStatusBadge status={user.approvalStatus} /></TableCell>
      <TableCell>
        <TimeDisplay timestamp={user.createdAt} />
      </TableCell>
      <TableCell className="text-right">
        {user.approvalStatus === "pending" && (
          <div className="flex justify-end space-x-2">
            <ApprovalActions 
              user={user} 
              onApprove={onApprove} 
              onReject={onReject}
            />
            <EmailActions user={user} emailType="payment" />
          </div>
        )}
        {user.approvalStatus !== "pending" && (
          <span className="text-gray-400 text-sm italic">
            {user.approvalStatus === "approved" ? "Approved | อนุมัติแล้ว" : "Rejected | ถูกปฏิเสธ"}
          </span>
        )}
      </TableCell>
    </TableRow>
  );
}
