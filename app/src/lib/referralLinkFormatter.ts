import { HOST } from "./hostAddr";

export const getReferralLink = (referralId: string) => {
  return `${HOST}/account/signin/${referralId}`;
};
