
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { PendingUser } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ApprovalActionsProps {
  user: PendingUser;
  onApprove: (user: PendingUser) => void;
  onReject: (user: PendingUser) => void;
}

export function ApprovalActions({ user, onApprove, onReject }: ApprovalActionsProps) {
  return (
    <div className="flex justify-end space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onReject(user)}
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
              onClick={() => onApprove(user)}
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
    </div>
  );
}
