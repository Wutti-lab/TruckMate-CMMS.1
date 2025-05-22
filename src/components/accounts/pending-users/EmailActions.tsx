
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

interface EmailActionsProps {
  user: PendingUser;
  emailType: 'reminder' | 'payment' | 'information';
}

export function EmailActions({ user, emailType }: EmailActionsProps) {
  const { toast } = useToast();
  
  const handleSendEmail = () => {
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
