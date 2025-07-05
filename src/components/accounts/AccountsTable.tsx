
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { UserRole, Profile } from "@/lib/types/user-roles";
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
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter users based on search query
  const filteredUsers = allProfiles.filter(user => 
    (user.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Check if current user can edit/delete accounts
  const canEditAccounts = hasRole([UserRole.ADMIN, UserRole.DEV_ADMIN]);

  const handleDeleteUser = async (id: string, full_name: string | null) => {
    try {
      await deleteProfile(id);
      toast({
        title: "Account deleted",
        description: `${full_name || 'User'}'s account has been deleted.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete account."
      });
    }
  };

  const handleEditUser = (user: Profile) => {
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
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role as UserRole} />
                </TableCell>
                <TableCell>
                  <ActivationDateCell activationDate={user.created_at} />
                </TableCell>
                <TableCell>
                  <AccountExpiryCell expiryDate={undefined} />
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
          user={{
            ...selectedUser,
            name: selectedUser.full_name || '',
            phone_number: selectedUser.phone || '',
            company: '',
            job_title: ''
          }}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </>
  );
}
