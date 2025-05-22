
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TimeDisplayProps {
  timestamp: string;
}

export function TimeDisplay({ timestamp }: TimeDisplayProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{new Date(timestamp).toLocaleString()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
