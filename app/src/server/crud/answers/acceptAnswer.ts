import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../db";
import { createError, createSuccessResponse } from "../../../trpc/createError";
import { publicProcedure } from "../../trpc";

export const acceptAnswer = publicProcedure
  .input(
    z.object({
      quid: z.string(),
      aid: z.string(),
    })
  )
  .mutation(async ({ input: { aid, quid } }) => {
    const q = await prisma.question.findFirst({
      where: { id: quid },
      include: { answers: { where: { id: aid }, select: { timestamp: true } } },
    });
    if (!q) return createError("Invalid question");

    const dateAsked = q.timestamp;
    const answeredWithinADay =
      dateAsked.valueOf() + 24 * 3600 * 1000 >=
      q.answers[0].timestamp.valueOf();

    try {
      await prisma.answer.update({
        where: { id: aid, questionId: quid },
        data: {
          accepted: true,
          question: { update: { answered: true } },
          answerer: {
            update: { credits: { increment: answeredWithinADay ? 70 : 40 } },
          },
        },
      });

      return createSuccessResponse("Answer accepted");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError)
        return createError(e.message);
      console.log(e);
      return createError("Unknown error", 500);
    }
  });
