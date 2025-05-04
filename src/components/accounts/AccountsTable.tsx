
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditAccountModal } from "./EditAccountModal";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash } from "lucide-react";
import { UserRole } from "@/lib/types/user-roles";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";

export interface Account {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
}

interface AccountsTableProps {
  searchQuery: string;
}

export function AccountsTable({ searchQuery }: AccountsTableProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const { toast } = useToast();
  const { user, mockUsers, updateUserList, deleteUser } = useAuth();

  useEffect(() => {
    setAccounts(mockUsers);
  }, [mockUsers]);

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    toast({
      title: "Account deleted",
      description: "The account has been successfully deleted.",
    });
  };

  const handleUpdate = (updatedAccount: Account) => {
    updateUserList(updatedAccount);
    setEditingAccount(null);
    toast({
      title: "Account updated",
      description: "The account has been successfully updated.",
    });
  };

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "bg-red-100 text-red-800";
      case UserRole.FLEET_MANAGER:
        return "bg-blue-100 text-blue-800";
      case UserRole.DRIVER:
        return "bg-green-100 text-green-800";
      case UserRole.MECHANIC:
        return "bg-yellow-100 text-yellow-800";
      case UserRole.DISPATCHER:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
            <TableHead className="text-right">Actions | การกระทำ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(account.role)}>
                    {account.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {account.status === 'active' ? 'Active | ใช้งานอยู่' : 'Inactive | ไม่ได้ใช้งาน'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(account)}
                      disabled={user?.id === account.id}
                    >
                      <Pencil size={14} className="mr-1" />
                      Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={user?.id === account.id}
                        >
                          <Trash size={14} className="mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete account</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the account for {account.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(account.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No accounts found. Try adjusting your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editingAccount && (
        <EditAccountModal
          account={editingAccount}
          open={!!editingAccount}
          onOpenChange={(open) => !open && setEditingAccount(null)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}
