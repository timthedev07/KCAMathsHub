import { z } from "zod";
import prisma from "../../../db";
import { handlePrismaError } from "../../../lib/handlePrismaError";
import { createSuccessResponse } from "../../../trpc/createError";
import { publicProcedure } from "../../trpc";

export const deleteModeration = publicProcedure
  .input(
    z.object({ userId: z.string(), moderationId: z.string(), aid: z.string() })
  )
  .mutation(async ({ input: { aid, moderationId, userId } }) => {
    try {
      await prisma.moderation.delete({
        where: { answerId: aid, moderatorId: userId, id: moderationId },
      });
      return createSuccessResponse("Moderation deleted");
    } catch (e) {
      return handlePrismaError(e);
    }
  });
