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
    let q;

    try {
      q = await prisma.question.findUnique({ where: { id: quid } });
      if (!q) return createError("Invalid question");
    } catch {
      return createError("Invalid question");
    }

    if (q.answered) return createError("Question already answered");

    let a;

    try {
      a = await prisma.answer.findUnique({
        where: { id: aid, questionId: quid },
      });
      if (!a) return createError("Answer does not exist");
    } catch {
      return createError("Answer does not exist");
    }

    try {
      await prisma.question.update({
        where: { id: quid },
        data: { answered: true },
      });

      await prisma.answer.update({
        where: { id: aid },
        data: { accepted: true },
      });

      return createSuccessResponse("Answer accepted");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError)
        return createError(e.message);
      console.log(e);
      return createError("Unknown error", 500);
    }
  });
