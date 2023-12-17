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
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user /**account, profile, email, credentials */ }) {
      if (
        process.env.NODE_ENV === "production" &&
        (!(
          user.email?.endsWith("@kcpupils.org") &&
          user.email?.endsWith("@kings.education") &&
          user.email?.endsWith("@kingsgroup.org")
        ) ||
          !user.email)
      ) {
        return false;
      }

      const u = await prisma.user.findFirst({ where: { email: user.email } });

      // forbid blocked users
      if (u && u.blocked) return false;

      return process.env.NODE_ENV === "development";
    },
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.answererReputation = user.answererReputation;
      session.user.usernameLastUpdated = user.usernameLastUpdated;
      session.user.bio = user.bio;
      session.user.bioLastUpdated = user.bioLastUpdated;
      session.user.blocked = user.blocked;
      session.user.email = user.email;
      session.user.image = user.image || null;
      session.user.joinedDate = user.joinedDate;
      session.user.joinedYear = user.joinedYear;
      session.user.roles = (user.roles as unknown as { name: string }[]).map(
        (each) => each.name
      ) as unknown as Role[];
      session.user.username = user.username;
      session.user.inquirerReputation = user.inquirerReputation;
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
