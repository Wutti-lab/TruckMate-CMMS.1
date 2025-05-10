
// Calculate expiry date (1 year from activation)
export const calculateExpiryDate = (activationDate: string): string => {
  const date = new Date(activationDate);
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split('T')[0];
};
