
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  username?: string;
}

export function Header({ username = "Max Mustermann" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Fahrzeug oder Fahrer suchen..."
            className="pl-8 bg-gray-50"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Benachrichtigungen"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={username} />
            <AvatarFallback className="bg-fleet-500 text-white">
              {username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:block">{username}</span>
        </div>
      </div>
    </header>
  );
}
