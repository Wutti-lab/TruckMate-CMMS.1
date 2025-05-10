
export interface SoftwareLicense {
  id: string;
  productName: string;
  licenseKey: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'revoked';
  price: number;
  role?: string; // Added role field
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  registrationDate: string;
  licenses: SoftwareLicense[];
  totalSpent: number;
  status: 'active' | 'inactive';
}
