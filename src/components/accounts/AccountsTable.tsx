
import { useState, useEffect } from "react";
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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { UserRole } from "@/lib/types/user-roles";
import { EditAccountModal } from "./EditAccountModal";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Account {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  password?: string; // Optional password field for updates
}

interface AccountsTableProps {
  searchQuery: string;
}

export function AccountsTable({ searchQuery }: AccountsTableProps) {
  const { mockUsers, updateUserList, deleteUser } = useAuth();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch and convert users to accounts on component mount
  useEffect(() => {
    const initialAccounts: Account[] = mockUsers.map(user => ({
      ...user,
      status: 'active' // Set a default status for all users
    }));
    setAccounts(initialAccounts);
  }, [mockUsers]);

  // Filter accounts based on search query
  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (account: Account) => {
    setEditAccount(account);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    setAccounts(accounts.filter(account => account.id !== id));
    toast({
      title: "Account deleted",
      description: "The user account has been permanently removed.",
    });
  };

  const handleSaveEdit = (updatedAccount: Account) => {
    // Update the local accounts state
    setAccounts(accounts.map(account => 
      account.id === updatedAccount.id ? updatedAccount : account
    ));
    
    // Update the context
    updateUserList(updatedAccount);
    
    // Close the modal
    setIsEditModalOpen(false);
    
    toast({
      title: "Account updated",
      description: "The user account has been successfully updated.",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name | ชื่อ</TableHead>
            <TableHead>Email | อีเมล</TableHead>
            <TableHead>Role | บทบาท</TableHead>
            <TableHead>Status | สถานะ</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {account.role.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={account.status === 'active' ? "default" : "destructive"}
                    className="capitalize"
                  >
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleEdit(account)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600"
                        onClick={() => handleDelete(account.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No accounts found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editAccount && (
        <EditAccountModal
          account={editAccount}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}
