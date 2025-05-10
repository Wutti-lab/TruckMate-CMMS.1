
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { UserRole, User } from "@/lib/types/user-roles";
import { useAuth } from "@/contexts/AuthContext";
import { EditAccountModal } from "./EditAccountModal";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";

interface AccountsTableProps {
  searchQuery: string;
}

export function AccountsTable({ searchQuery }: AccountsTableProps) {
  const { mockUsers, deleteUser, hasRole } = useAuth();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Format date to display in a locale-friendly way
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  // Calculate if account is expired
  const isAccountExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return today > expiry;
  };

  // Calculate days remaining until expiry
  const daysUntilExpiry = (expiryDate?: string) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    
    // If already expired, return 0
    if (today > expiry) return 0;
    
    const differenceInTime = expiry.getTime() - today.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Check if current user can edit/delete accounts
  const canEditAccounts = hasRole([UserRole.ADMIN, UserRole.DEV_ADMIN]);

  const handleDeleteUser = (id: string, name: string) => {
    deleteUser(id);
    toast({
      title: "Account deleted",
      description: `${name}'s account has been deleted.`
    });
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Activated</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const expired = isAccountExpired(user.expiryDate);
              const daysLeft = daysUntilExpiry(user.expiryDate);
              
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.role.replace('_', ' ').toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.activationDate ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{formatDate(user.activationDate)}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Activation date</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {user.expiryDate ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <span 
                                className={expired ? "text-red-500 font-medium" : ""}
                              >
                                {formatDate(user.expiryDate)}
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
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {canEditAccounts && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="text-red-500"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No accounts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {selectedUser && (
        <EditAccountModal
          user={selectedUser}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </>
  );
}
