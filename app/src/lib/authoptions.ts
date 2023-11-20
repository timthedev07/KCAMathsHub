import { AuthOptions } from "next-auth";
import prisma from "../db";
import { PrismaAdapter } from "./prismaAdapter";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/account/signin",
  },
  callbacks: {
    async signIn({ user /**account, profile, email, credentials */ }) {
      // only allow internal users
      // if (
      //   !(
      //     user.email?.endsWith("@kcpupils.org") &&
      //     user.email?.endsWith("@kings.education") &&
      //     user.email?.endsWith("@kingsgroup.org")
      //   ) ||
      //   !user.email
      // ) {
      //   return false;
      // }

      const u = await prisma.user.findFirst({ where: { email: user.email } });

      // forbid blocked users
      if (u && u.blocked) return false;

      return process.env.NODE_ENV === "development";
    },
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.answererReputation = user.answererReputation;
      session.user.blocked = user.blocked;
      session.user.email = user.email;
      session.user.image = user.image || null;
      session.user.joinedDate = user.joinedDate;
      session.user.joinedYear = user.joinedYear;
      session.user.role = user.role;
      session.user.username = user.username;
      session.user.inquirerReputation = user.inquirerReputation;
      return session;
    },
  },
};
