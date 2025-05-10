
import { 
  Table, 
} from "@/components/ui/table";
import { SoftwareLicense } from "@/lib/types/customer-types";
import { LicensesTableHeader } from "./licenses/LicensesTableHeader";
import { LicensesList } from "./licenses/LicensesList";
import { GenerateLicenseButton } from "./licenses/GenerateLicenseButton";

interface LicensesTableProps {
  licenses: SoftwareLicense[];
}

export function LicensesTable({ licenses }: LicensesTableProps) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <GenerateLicenseButton />
      </div>
      <Table>
        <LicensesTableHeader />
        <LicensesList licenses={licenses} />
      </Table>
    </div>
  );
}
