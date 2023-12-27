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
    try {
      await prisma.answer.update({
        where: { id: aid, questionId: quid },
        data: {
          accepted: true,
          question: { update: { answered: true } },
          answerer: { update: { credits: { increment: 50 } } },
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
