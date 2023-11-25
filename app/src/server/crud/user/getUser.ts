import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";

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
