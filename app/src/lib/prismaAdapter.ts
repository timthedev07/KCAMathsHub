import { Prisma, PrismaClient } from "@prisma/client";
import type { Adapter, AdapterAccount } from "next-auth/adapters";

const baseString = "01234abcd".split("");

const countToBaseN = (count: number, N = baseString.length) => {
  const digits: string[] = [];

  while (count > 0) {
    digits.push(baseString[count % N]);
    count = Math.floor(count / N);
  }

  while (digits.length < 4) {
    digits.push("0");
  }

  return digits.reverse().join("");
};

export function PrismaAdapter(p: PrismaClient): Adapter {
  return {
    createUser: async (data) => {
      const a = data.name!.split("Year");
      const year = parseInt(a[a.length - 1].trim());
      const count = await p.user.count();
      const newUname = `u#${countToBaseN(count)}`;
      return (await p.user.create({
        data: {
          username: newUname,
          email: data.email,
          joinedYear: year,
          image: data.image,
          roles: { connect: { name: "inquirer" } }, // defaults to inquirer
        },
      })) as any;
    },
    getUser: (id) =>
      p.user.findUnique({
        where: { id },
        include: { roles: { select: { name: true } } },
      }) as any,
    getUserByEmail: (email) =>
      p.user.findUnique({
        where: { email },
        include: { roles: { select: { name: true } } },
      }) as any,
    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: { include: { roles: { select: { name: true } } } } },
      });
      return (account?.user ?? null) as any;
    },
    updateUser: ({ id, roles: _, ...data }) =>
      p.user.update({
        where: { id },
        data,
      }) as any,
    deleteUser: (id) => p.user.delete({ where: { id } }) as any,
    linkAccount: (data) =>
      p.account.create({ data }) as unknown as AdapterAccount,
    unlinkAccount: (provider_providerAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId },
      }) as unknown as AdapterAccount,
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: { include: { roles: { select: { name: true } } } } },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session } as any;
    },
    createSession: (data) => p.session.create({ data }),
    updateSession: (data) =>
      p.session.update({ where: { sessionToken: data.sessionToken }, data }),
    deleteSession: (sessionToken) =>
      p.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await p.verificationToken.create({ data });
      // @ts-expect-errors // MongoDB needs an ID, but we don't
      if (verificationToken.id) delete verificationToken.id;
      return verificationToken;
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await p.verificationToken.delete({
          where: { identifier_token },
        });
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id;
        return verificationToken;
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null;
        throw error;
      }
    },
  };
}
