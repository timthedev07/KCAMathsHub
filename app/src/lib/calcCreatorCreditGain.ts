/**
 * Calculates the gain in credit for any new referral acceptance
 * @param existingNum
 * @returns
 */
export const calcCreatorCreditGain = (existingNum: number) => {
  if (existingNum < 2) return 30;
  if (existingNum < 5) return 40;
  return 50;
};
