
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { UserRole } from "@/lib/types/user-roles";
import { AccountsTable } from "@/components/accounts/AccountsTable";
import { CreateAccountModal } from "@/components/accounts/CreateAccountModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Filter, Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingUsersTable } from "@/components/accounts/PendingUsersTable";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

export default function Accounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const { pendingUsers, hasRole } = useAuth();
  
  const pendingCount = pendingUsers.filter(pu => pu.approvalStatus === 'pending').length;
  
  // Only super admin can approve accounts
  const isSuperAdmin = hasRole(UserRole.ADMIN);
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Account Management | การจัดการบัญชี</h1>
          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts... | ค้นหาบัญชี..."
                className="pl-8 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-fleet-500"
            >
              <Plus size={16} className="mr-2" />
              Create Account | สร้างบัญชี
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">
              Active Accounts | บัญชีที่ใช้งาน
            </TabsTrigger>
            {isSuperAdmin && (
              <TabsTrigger value="pending" className="relative">
                Pending Approvals | รออนุมัติ
                {pendingCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  >
                    {pendingCount}
                  </Badge>
                )}
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>User Accounts | บัญชีผู้ใช้</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <AccountsTable searchQuery={searchQuery} />
              </CardContent>
            </Card>
          </TabsContent>
          
          {isSuperAdmin && (
            <TabsContent value="pending">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Pending Accounts | บัญชีรออนุมัติ</CardTitle>
                  {pendingCount > 0 && (
                    <div className="flex items-center text-amber-500">
                      <AlertCircle size={16} className="mr-2" />
                      <span>Requires approval | ต้องการการอนุมัติ</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  <PendingUsersTable searchQuery={searchQuery} />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>

      <CreateAccountModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
