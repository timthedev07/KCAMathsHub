import { HOST } from "./hostAddr";

export const pageURLs = {
  referral(referralId: string) {
    return `${HOST}/account/signin/${referralId}`;
  },
  error(msg?: string) {
    return `${HOST}/error?err=${msg}`;
  },
  question(quid: string) {
    return `${HOST}/questions/${quid}`;
  },
};
