
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { UserRole } from "@/lib/types/user-roles";
import { useAuth } from "@/contexts/AuthContext";
import { EditAccountModal } from "./EditAccountModal";
import { useToast } from "@/hooks/use-toast";
import { ActivationDateCell } from "./ActivationDateCell";
import { AccountExpiryCell } from "./AccountExpiryCell";
import { AccountActionButtons } from "./AccountActionButtons";
import { UserRoleBadge } from "./UserRoleBadge";

interface AccountsTableProps {
  searchQuery: string;
}

export function AccountsTable({ searchQuery }: AccountsTableProps) {
  const { allProfiles, deleteProfile, hasRole } = useAuth();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter users based on search query
  const filteredUsers = allProfiles.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Check if current user can edit/delete accounts
  const canEditAccounts = hasRole([UserRole.ADMIN, UserRole.DEV_ADMIN]);

  const handleDeleteUser = async (id: string, name: string) => {
    try {
      await deleteProfile(id);
      toast({
        title: "Account deleted",
        description: `${name}'s account has been deleted.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete account."
      });
    }
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Activated</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role as UserRole} />
                </TableCell>
                <TableCell>
                  <ActivationDateCell activationDate={user.activation_date} />
                </TableCell>
                <TableCell>
                  <AccountExpiryCell expiryDate={user.expiry_date} />
                </TableCell>
                <TableCell className="text-right">
                  <AccountActionButtons 
                    user={user}
                    canEdit={canEditAccounts}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
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
