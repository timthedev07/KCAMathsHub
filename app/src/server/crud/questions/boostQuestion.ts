import { z } from "zod";
import { BOOST_COST } from "../../../constants/boost";
import prisma from "../../../db";
import { handlePrismaError } from "../../../lib/handlePrismaError";
import { createSuccessResponse } from "../../../trpc/createError";
import { publicProcedure } from "../../trpc";

export const boostQuestion = publicProcedure
  .input(z.object({ quid: z.string(), uid: z.string() }))
  .mutation(async ({ input: { quid, uid } }) => {
    try {
      await prisma.question.update({
        where: {
          id: quid,
          questioner: { id: uid, credits: { gte: BOOST_COST } },
          boosted: false,
          answered: false,
        },
        data: {
          boosted: true,
          questioner: { update: { credits: { decrement: BOOST_COST } } },
        },
      });
      return createSuccessResponse();
    } catch (e) {
      return handlePrismaError(e);
    }
  });
