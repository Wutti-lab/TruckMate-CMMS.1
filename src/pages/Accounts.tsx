
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { UserRole } from "@/lib/types/user-roles";
import { AccountsTable } from "@/components/accounts/AccountsTable";
import { CreateAccountModal } from "@/components/accounts/CreateAccountModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Accounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
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

        <Card>
          <CardHeader>
            <CardTitle>User Accounts | บัญชีผู้ใช้</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <AccountsTable searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </main>

      <CreateAccountModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
