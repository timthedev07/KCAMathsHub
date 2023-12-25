import { User as PUser } from "@prisma/client";
import "next-auth";
import { Role } from "./role";

type WithRole = PUser & { roles: Role[] };

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface Session {
    user: WithRole;
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface User extends WithRole {}
}
