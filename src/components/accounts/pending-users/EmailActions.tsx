
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { PendingUser } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmailActionsProps {
  user: PendingUser;
  emailType: 'reminder' | 'payment' | 'information';
}

export function EmailActions({ user, emailType }: EmailActionsProps) {
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const handleSendEmail = () => {
    let emailSubject = "";
    let emailMessage = "";
    
    switch(emailType) {
      case 'reminder':
        emailSubject = language === 'th' 
          ? "การแจ้งเตือน: กรุณาดำเนินการลงทะเบียน TruckMate CMMS ให้เสร็จสมบูรณ์"
          : "Reminder: Complete Your TruckMate CMMS Registration";
        emailMessage = language === 'th'
          ? "นี่คือการแจ้งเตือนให้คุณดำเนินการลงทะเบียนให้เสร็จสมบูรณ์"
          : "This is a reminder to complete your registration process.";
        break;
      case 'payment':
        emailSubject = language === 'th'
          ? "การชำระเงิน: จำเป็นต้องชำระเงินสำหรับการลงทะเบียน TruckMate CMMS"
          : "Payment Required for TruckMate CMMS Registration";
        emailMessage = language === 'th'
          ? "กรุณาชำระเงินเพื่อเปิดใช้งานบัญชีของคุณ"
          : "Please complete the payment to activate your account.";
        break;
      case 'information':
        emailSubject = language === 'th'
          ? "ข้อมูลเพิ่มเติม: ต้องการข้อมูลเพิ่มเติมสำหรับ TruckMate CMMS"
          : "Additional Information Required for TruckMate CMMS";
        emailMessage = language === 'th'
          ? "เราต้องการข้อมูลเพิ่มเติมเพื่อดำเนินการตามคำขอของคุณ"
          : "We need additional information to process your application.";
        break;
    }
    
    // Validate email
    if (!user.email) {
      toast({
        title: language === 'th' ? "ไม่พบที่อยู่อีเมล" : "No email address found",
        description: language === 'th' 
          ? "ไม่สามารถส่งอีเมลได้เนื่องจากไม่มีที่อยู่อีเมล" 
          : "Cannot send email due to missing email address",
        variant: "destructive"
      });
      return;
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
      title: language === 'th' ? "ส่งอีเมลแล้ว" : "Email sent",
      description: language === 'th'
        ? `อีเมลได้ถูกส่งไปที่ ${user.name} ที่ ${user.email}`
        : `An email has been sent to ${user.name} at ${user.email}.`,
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSendEmail}
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
  );
}
