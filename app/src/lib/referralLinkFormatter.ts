import { HOST } from "./hostAddr";

export const getReferralLink = (referralId: string) => {
  return `${HOST}/referral/${referralId}`;
};
