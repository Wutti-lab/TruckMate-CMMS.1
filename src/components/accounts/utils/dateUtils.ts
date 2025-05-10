
/**
 * Utility functions for handling dates in the accounts section
 */

// Format date to display in a locale-friendly way
export const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString();
};

// Calculate if account is expired
export const isAccountExpired = (expiryDate?: string) => {
  if (!expiryDate) return false;
  const today = new Date();
  const expiry = new Date(expiryDate);
  return today > expiry;
};

// Calculate days remaining until expiry
export const daysUntilExpiry = (expiryDate?: string) => {
  if (!expiryDate) return null;
  
  const today = new Date();
  const expiry = new Date(expiryDate);
  
  // If already expired, return 0
  if (today > expiry) return 0;
  
  const differenceInTime = expiry.getTime() - today.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};
