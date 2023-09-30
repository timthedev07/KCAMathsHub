import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (
        !(
          user.email?.endsWith("@kcpupils.org") &&
          user.email?.endsWith("@kings.education") &&
          user.email?.endsWith("@kingsgroup.org")
        ) ||
        !user.email
      ) {
        return false;
      }

      const u = await prisma.user.findFirst({ where: { email: user.email } });

      return process.env.NODE_ENV === "development";
    },
  },
});

export { handler as GET, handler as POST };
