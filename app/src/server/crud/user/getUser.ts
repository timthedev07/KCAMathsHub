import { z } from "zod";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const getUser = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input: { userId } }) => {
    return await getServerUser(userId);
  });

export const getServerUser = (userId: string) => {
  return prisma.user.findFirst({
    where: { id: userId },
    include: {
      answers: true,
      questions: true,
      moderations: true,
    },
  });
};
