
import { useState, useEffect } from "react";
import { Customer } from "@/lib/types/customer-types";
import { useAuth } from "@/contexts/AuthContext";
import { convertPendingUserToCustomer } from "@/lib/utils/customerUtils";

export function useCustomerData() {
  const { pendingUsers } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Initialize with mock data and add pending users as customers
  useEffect(() => {
    // Start with mock customer data
    const mockCustomers: Customer[] = [
      {
        id: "1",
        name: "Max Mustermann",
        company: "Autohaus Schmidt GmbH",
        email: "max@schmidt-auto.de",
        phone: "+49 123 456789",
        country: "Deutschland",
        registrationDate: "2024-01-12",
        licenses: [
          {
            id: "l1",
            productName: "TruckMate CMMS Pro",
            licenseKey: "TRUCK-PRO-1234-ABCD",
            purchaseDate: "2024-01-15",
            expiryDate: "2025-01-15",
            status: "active",
            price: 2499.99
          },
          {
            id: "l2",
            productName: "FleetTracker Plus",
            licenseKey: "FLEET-PLS-5678-EFGH",
            purchaseDate: "2023-11-20",
            expiryDate: "2024-11-20",
            status: "active",
            price: 1299.50
          }
        ],
        totalSpent: 3799.49,
        status: "active"
      },
      {
        id: "2",
        name: "Julia Weber",
        company: "Weber Logistics AG",
        email: "j.weber@weber-logistics.com",
        phone: "+49 987 654321",
        country: "Österreich",
        registrationDate: "2023-09-05",
        licenses: [
          {
            id: "l3",
            productName: "TruckMate CMMS Basic",
            licenseKey: "TRUCK-BSC-9012-IJKL",
            purchaseDate: "2023-09-07",
            expiryDate: "2023-12-07",
            status: "expired",
            price: 899.99
          }
        ],
        totalSpent: 899.99,
        status: "inactive"
      }
    ];

    // Add paid pending users as customers using the utility function
    const paidPendingUsers = pendingUsers
      .filter(user => user.paymentStatus === 'paid')
      .map(user => convertPendingUserToCustomer(user));

    // Combine mock customers with paid pending users
    setCustomers([...mockCustomers, ...paidPendingUsers]);
  }, [pendingUsers]);

  return {
    searchQuery,
    setSearchQuery,
    customers,
    setCustomers
  };
}
