
import React from "react";
import { PackagesSection } from "./PackagesSection";

interface HostingInfrastructureCostsProps {
  isYearly: boolean;
  onSelectPackage: (packageName: string) => void;
  onShowDirectPayment: (packageName: string) => void; // Add new prop for direct payment
}

export function HostingInfrastructureCosts({ 
  isYearly, 
  onSelectPackage,
  onShowDirectPayment // Add new prop
}: HostingInfrastructureCostsProps) {
  return (
    <PackagesSection 
      isYearly={isYearly} 
      onSelectPackage={onSelectPackage} 
      onShowDirectPayment={onShowDirectPayment} // Pass the prop to PackagesSection
    />
  );
}
