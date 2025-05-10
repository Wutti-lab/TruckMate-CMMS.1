
import { TableBody } from "@/components/ui/table";
import { SoftwareLicense } from "@/lib/types/customer-types";
import { LicenseRow } from "./LicenseRow";
import { EmptyLicenseState } from "./EmptyLicenseState";

interface LicensesListProps {
  licenses: SoftwareLicense[];
}

export function LicensesList({ licenses }: LicensesListProps) {
  return (
    <TableBody>
      {licenses.length > 0 ? (
        licenses.map((license) => (
          <LicenseRow key={license.id} license={license} />
        ))
      ) : (
        <EmptyLicenseState />
      )}
    </TableBody>
  );
}
