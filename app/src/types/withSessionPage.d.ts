import { Session } from "next-auth";

export type WithSessionProps<T = {}> = T & {
  session: Session;
};
