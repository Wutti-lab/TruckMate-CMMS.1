
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Filter, Search, SortAsc } from "lucide-react";

interface VehicleFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function VehicleFilters({ searchQuery, onSearchChange }: VehicleFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ค้นหาตามทะเบียน, คนขับ..."
          className="pl-8 w-[200px] md:w-[300px]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem>รถทั้งหมด</DropdownMenuItem>
          <DropdownMenuItem>เฉพาะรถที่ใช้งาน</DropdownMenuItem>
          <DropdownMenuItem>เฉพาะรถที่ไม่ได้ใช้งาน</DropdownMenuItem>
          <DropdownMenuItem>อยู่ระหว่างการซ่อมบำรุง</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SortAsc size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem>ทะเบียน (ก-ฮ)</DropdownMenuItem>
          <DropdownMenuItem>ทะเบียน (ฮ-ก)</DropdownMenuItem>
          <DropdownMenuItem>สถานะ</DropdownMenuItem>
          <DropdownMenuItem>ตำแหน่ง</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
