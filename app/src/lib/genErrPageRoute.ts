import { HOST } from "./hostAddr";

export const genErrPageRoute = (msg: string) => {
  return `${HOST}/error?err=${msg}`;
};
