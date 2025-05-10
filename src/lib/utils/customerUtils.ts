
import { Customer, SoftwareLicense } from "@/lib/types/customer-types";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  paymentStatus: string;
  approvalStatus: string;
  company?: string;
  phoneNumber?: string;
  jobTitle?: string;
}

/**
 * Converts a PendingUser to a Customer with default values
 */
export function convertPendingUserToCustomer(user: PendingUser): Customer {
  // Create a default license for the new customer
  const defaultLicense: SoftwareLicense = {
    id: `auto-${user.id}`,
    productName: "TruckMate Standard Lizenz",
    licenseKey: generateLicenseKey(),
    purchaseDate: user.createdAt.split('T')[0],
    expiryDate: getExpiryDate(),
    status: "active",
    price: 2000.00, // User Plan price (2,000 ฿)
    role: "standard" // Default role for new users
  };

  // Create the customer with the default license
  const customer: Customer = {
    id: user.id,
    name: user.name,
    company: user.company || user.name + " GmbH", // Use provided company or default
    email: user.email,
    phone: user.phoneNumber || "", // Use provided phone or empty
    country: "Deutschland", // Default country
    registrationDate: user.createdAt.split('T')[0],
    licenses: [defaultLicense],
    totalSpent: 2000.00, // User Plan price (2,000 ฿)
    status: user.approvalStatus === 'approved' ? "active" : "inactive"
  };

  return customer;
}

/**
 * Generates a random license key
 */
export function generateLicenseKey(): string {
  // Format: TRUCK-XXXXXX-XXXXXX-XXXXXX
  const segment1 = Math.random().toString(36).substring(2, 8).toUpperCase();
  const segment2 = Math.random().toString(36).substring(2, 8).toUpperCase();
  const segment3 = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `TRUCK-${segment1}-${segment2}-${segment3}`;
}

/**
 * Gets the expiry date one year from now
 */
function getExpiryDate(): string {
  return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split('T')[0];
}
