import { z } from "zod";
import prisma from "../../../db";
import { Role } from "../../../types/role";
import { publicProcedure } from "../../trpc";

export const getUser = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input: { userId } }) => {
    return await getServerUser(userId);
  });

export const getServerUser = async (username: string) => {
  const res = await prisma.user.findFirst({
    where: { username },
    include: {
      answers: true,
      questions: true,
      moderations: true,
      roles: {
        select: { name: true },
      },
    },
  });

  if (!res) return null;

  return {
    ...res,
    roles: res?.roles.map((v) => v.name) as Role[],
  };
};
