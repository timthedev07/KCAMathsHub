import { z } from "zod";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const getAnswer = publicProcedure
  .input(z.object({ aid: z.string() }))
  .query(async ({ input: { aid } }) => {
    return await prisma.answer.findFirst({
      where: { id: aid },
      select: {
        accepted: true,
        anonymous: true,
        answerer: { select: { username: true } },
        approved: true,
        moderated: true,
        timestamp: true,
        attachments: { select: { name: true, size: true, objKey: true } },
        content: true,
        question: { select: { id: true } },
      },
    });
  });
