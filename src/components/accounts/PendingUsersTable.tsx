
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PendingUser } from "@/contexts/AuthContext";
import { PendingUserRow } from "./pending-users/PendingUserRow";
import { sendNotification } from "./pending-users/emailNotification";

interface PendingUsersTableProps {
  searchQuery: string;
}

export function PendingUsersTable({ searchQuery }: PendingUsersTableProps) {
  const { pendingUsers, approvePendingUser, rejectPendingUser } = useAuth();
  const { toast } = useToast();

  // Filter accounts based on search query
  const filteredUsers = pendingUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = async (user: PendingUser) => {
    // Approve the user
    approvePendingUser(user.id);
    
    // Benachrichtigungs-E-Mail an den Benutzer senden
    const emailSent = await sendNotification(user, 'approval');
    
    toast({
      title: "Account approved",
      description: `${user.name}'s account has been approved and activated. ${emailSent ? 'A confirmation email has been sent to admin for manual forwarding.' : 'Email notification failed.'}`,
    });
  };

  const handleReject = async (user: PendingUser) => {
    // Reject the user
    rejectPendingUser(user.id);
    
    // Benachrichtigungs-E-Mail an den Benutzer senden
    const emailSent = await sendNotification(user, 'rejection');
    
    toast({
      title: "Account rejected",
      description: `${user.name}'s account has been rejected. ${emailSent ? 'A notification email has been sent to admin for manual forwarding.' : 'Email notification failed.'}`,
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name | ชื่อ</TableHead>
          <TableHead>Email | อีเมล</TableHead>
          <TableHead>Role | บทบาท</TableHead>
          <TableHead>Payment | การชำระเงิน</TableHead>
          <TableHead>Status | สถานะ</TableHead>
          <TableHead>Created | สร้างเมื่อ</TableHead>
          <TableHead className="text-right">Actions | การดำเนินการ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <PendingUserRow
              key={user.id}
              user={user}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
              No pending accounts found | ไม่พบบัญชีที่รออนุมัติ
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
