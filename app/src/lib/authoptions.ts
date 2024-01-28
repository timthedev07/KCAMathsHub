import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { AuthOptions, getServerSession as _ } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../db";
import { Role } from "../types/role";
import { PrismaAdapter } from "./prismaAdapter";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/user/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user /**account, profile, email, credentials */ }) {
      if (
        // if app in production and...
        process.env.NODE_ENV === "production" &&
        // the user's email domain is in one of the following (disallowing external logins)
        (!user.email ||
          !(
            user.email.endsWith("@kcpupils.org") ||
            user.email.endsWith("@kings.education") ||
            user.email.endsWith("@kingsgroup.org")
          ))
      ) {
        return false;
      }

      const u = await prisma.user.findFirst({ where: { email: user.email } });

      // forbid blocked users
      if (u && u.blocked) return false;

      return true;
    },
    async session({ session, user }) {
      session.user = {
        ...user,
        image: user.image || null,
        roles: (user.roles as unknown as { name: string }[]).map(
          (each) => each.name
        ) as unknown as Role[],
      };
      return session;
    },
  },
};

// Use it in server contexts
export function getServerSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return _(...args, authOptions);
}
