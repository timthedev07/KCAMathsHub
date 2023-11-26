import { User as PUser } from "@prisma/client";
import "next-auth";
import { Role } from "./role";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: PUser;
  }
  interface User extends PUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
