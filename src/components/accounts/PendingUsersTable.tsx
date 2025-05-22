
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle, Mail } from "lucide-react";
import { UserRole } from "@/lib/types/user-roles";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PendingUser } from "@/contexts/AuthContext";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";

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

  const handleApprove = (user: PendingUser) => {
    // Approve the user
    approvePendingUser(user.id);
    
    // Simulate sending approval email to the user
    console.log("Approval email would be sent to:", user.email);
    console.log("Email content:", {
      subject: "Your TruckMate CMMS Account has been Approved",
      name: user.name,
      email: user.email,
      message: "Your account has been approved. You can now log in to TruckMate CMMS."
    });
    
    toast({
      title: "Account approved",
      description: `${user.name}'s account has been approved and activated. A confirmation email has been sent.`,
    });
  };

  const handleReject = (user: PendingUser) => {
    // Reject the user
    rejectPendingUser(user.id);
    
    // Simulate sending rejection email to the user
    console.log("Rejection email would be sent to:", user.email);
    console.log("Email content:", {
      subject: "Your TruckMate CMMS Account Application",
      name: user.name,
      email: user.email,
      message: "We're sorry, but your account application has been rejected. Please contact support for more information."
    });
    
    toast({
      title: "Account rejected",
      description: `${user.name}'s account has been rejected. A notification email has been sent.`,
    });
  };

  const handleSendEmail = (user: PendingUser, emailType: 'reminder' | 'payment' | 'information') => {
    let emailSubject = "";
    let emailMessage = "";
    
    switch(emailType) {
      case 'reminder':
        emailSubject = "Reminder: Complete Your TruckMate CMMS Registration";
        emailMessage = "This is a reminder to complete your registration process.";
        break;
      case 'payment':
        emailSubject = "Payment Required for TruckMate CMMS Registration";
        emailMessage = "Please complete the payment to activate your account.";
        break;
      case 'information':
        emailSubject = "Additional Information Required for TruckMate CMMS";
        emailMessage = "We need additional information to process your application.";
        break;
    }
    
    // Simulate sending email
    console.log("Email would be sent to:", user.email);
    console.log("Email content:", {
      subject: emailSubject,
      name: user.name,
      email: user.email,
      message: emailMessage
    });
    
    toast({
      title: "Email sent",
      description: `An email has been sent to ${user.name} at ${user.email}.`,
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    if (status === "paid") {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Paid | ชำระแล้ว</Badge>;
    }
    return <Badge variant="outline">Unpaid | ยังไม่ชำระ</Badge>;
  };

  const getApprovalStatusBadge = (status: string) => {
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
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {user.role.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>{getPaymentStatusBadge(user.paymentStatus)}</TableCell>
              <TableCell>{getApprovalStatusBadge(user.approvalStatus)}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{new Date(user.createdAt).toLocaleString()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-right">
                {user.approvalStatus === "pending" && (
                  <div className="flex justify-end space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReject(user)}
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Reject | ปฏิเสธ</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApprove(user)}
                            className="text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Approve | อนุมัติ</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendEmail(user, 'payment')}
                            className="text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send Email | ส่งอีเมล</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                {user.approvalStatus !== "pending" && (
                  <span className="text-gray-400 text-sm italic">
                    {user.approvalStatus === "approved" ? "Approved | อนุมัติแล้ว" : "Rejected | ถูกปฏิเสธ"}
                  </span>
                )}
              </TableCell>
            </TableRow>
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
