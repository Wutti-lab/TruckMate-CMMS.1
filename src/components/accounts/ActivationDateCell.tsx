
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "./utils/dateUtils";

interface ActivationDateCellProps {
  activationDate?: string;
}

export function ActivationDateCell({ activationDate }: ActivationDateCellProps) {
  if (!activationDate) return <span>-</span>;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{formatDate(activationDate)}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Activation date</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
