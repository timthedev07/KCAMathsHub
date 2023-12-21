import { HOST } from "./hostAddr";

export const pageURLs = {
  referral(referralId: string) {
    return `${HOST}/user/signin/${referralId}`;
  },
  error(msg?: string) {
    return `${HOST}/error?err=${msg}`;
  },
  question(qid: string) {
    return `${HOST}/questions/${qid}`;
  },
  user(uid: string) {
    return `${HOST}/user/profile/${uid}`;
  },
  editQuestion(qid: string) {
    return `${HOST}/questions/${qid}/edit`;
  },
  notFound() {
    return `${HOST}/not-found`;
  },
  editAnswer(aid: string) {
    return `${HOST}/answer/${aid}/edit`;
  },
};
