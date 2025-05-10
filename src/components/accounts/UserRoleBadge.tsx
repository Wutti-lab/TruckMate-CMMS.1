
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/lib/types/user-roles";

interface UserRoleBadgeProps {
  role: UserRole;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <Badge variant="outline" className="capitalize">
      {role.replace('_', ' ').toLowerCase()}
    </Badge>
  );
}
