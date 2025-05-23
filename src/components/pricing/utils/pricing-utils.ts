
export const getYearlyPrice = (monthlyPrice: number): number => {
  // Apply 10% discount and multiply by 12 for yearly price
  return Math.round(monthlyPrice * 0.9 * 12);
};

export const prices = {
  starter: {
    monthly: 7000,
    yearly: getYearlyPrice(7000)
  },
  standard: {
    monthly: 18000,
    yearly: getYearlyPrice(18000)
  },
  professional: {
    monthly: 35000,
    yearly: getYearlyPrice(35000)
  }
};
