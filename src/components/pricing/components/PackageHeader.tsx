
import { CardDescription, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { PackageBadge } from "./PackageBadge";

interface PackageHeaderProps {
  icon: LucideIcon;
  title: string;
  price: number;
  badgeText: string;
  badgeVariant: "blue" | "green" | "purple";
  thbMonth: string;
}

export function PackageHeader({ 
  icon: Icon, 
  title, 
  price, 
  badgeText, 
  badgeVariant,
  thbMonth 
}: PackageHeaderProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-center mb-2">
        <div className="p-2 rounded-full bg-fleet-50">
          <Icon className="h-6 w-6 text-fleet-600" />
        </div>
      </div>
      <PackageBadge text={badgeText} variant={badgeVariant} />
      <CardTitle className="text-center">{title}</CardTitle>
      <CardDescription className="text-center text-lg font-bold mt-2">
        {price} {thbMonth}
      </CardDescription>
    </div>
  );
}
