import { HOST } from "./hostAddr";

export const pageURLs = {
  referralLink(referralId: string) {
    return `${HOST}/account/signin/${referralId}`;
  },
  error(msg: string) {
    return `${HOST}/error?err=${msg}`;
  },
};
