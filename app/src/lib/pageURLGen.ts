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
  answerQuestion(qid: string) {
    return `${HOST}/compose-answer/${qid}`;
  },
  notFound() {
    return `${HOST}/not-found`;
  },
};
