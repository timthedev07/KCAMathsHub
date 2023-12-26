import { z } from "zod";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const getUserAnswers = publicProcedure
  .input(z.object({ uid: z.string() }))
  .query(async ({ input: { uid } }) => {
    return await prisma.answer.findMany({
      where: { answererId: uid },
      select: {
        question: {
          select: { title: true, categories: { select: { name: true } } },
        },
        accepted: true,
        anonymous: true,
        approved: true,
        id: true,
        moderated: true,
        timestamp: true,
      },
    });
  });
