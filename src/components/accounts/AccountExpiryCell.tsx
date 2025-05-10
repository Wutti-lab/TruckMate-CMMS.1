
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { isAccountExpired, daysUntilExpiry, formatDate } from "./utils/dateUtils";

interface AccountExpiryCellProps {
  expiryDate?: string;
}

export function AccountExpiryCell({ expiryDate }: AccountExpiryCellProps) {
  const expired = isAccountExpired(expiryDate);
  const daysLeft = daysUntilExpiry(expiryDate);
  
  if (!expiryDate) return <span>-</span>;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <span 
              className={expired ? "text-red-500 font-medium" : ""}
            >
              {formatDate(expiryDate)}
            </span>
            {!expired && daysLeft !== null && (
              <span className="ml-2 text-xs text-gray-500">
                ({daysLeft} days left)
              </span>
            )}
            {expired && (
              <Badge variant="destructive" className="ml-2">
                Expired
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{expired ? "Account expired" : `Account valid for ${daysLeft} more days`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
