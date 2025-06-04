
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  role: string;
  phone_number?: string;
  company?: string;
  job_title?: string;
  activation_date?: string;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

interface AccountActionButtonsProps {
  user: Profile;
  canEdit: boolean;
  onEdit: (user: Profile) => void;
  onDelete: (id: string, name: string) => void;
}

export function AccountActionButtons({ 
  user, 
  canEdit, 
  onEdit, 
  onDelete 
}: AccountActionButtonsProps) {
  if (!canEdit) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(user)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDelete(user.id, user.name)}
          className="text-red-500"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
