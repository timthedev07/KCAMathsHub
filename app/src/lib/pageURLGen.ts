import { HOST } from "./hostAddr";

export const getReferralLink = (referralId: string) => {
  return `${HOST}/account/signin/${referralId}`;
};

export const genErrPageRoute = (msg: string) => {
  return `${HOST}/error?err=${msg}`;
};
