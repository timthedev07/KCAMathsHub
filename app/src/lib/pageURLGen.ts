import { HOST } from "./hostAddr";

export const pageURLs = {
  referral(referralId: string) {
    return `${HOST}/user/signin/${referralId}`;
  },
  error(msg?: string) {
    return `${HOST}/error?err=${msg}`;
  },
  question(quid: string) {
    return `${HOST}/questions/${quid}`;
  },
  user(uid: string) {
    return `${HOST}/user/profile/${uid}`;
  },
};
