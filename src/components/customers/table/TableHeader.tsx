
import { TableRow, TableHead } from "@/components/ui/table";

export function TableHeader() {
  return (
    <TableRow>
      <TableHead className="w-[200px]">Customer</TableHead>
      <TableHead>Company</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Country</TableHead>
      <TableHead>Total Spent</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  );
}
