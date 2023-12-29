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
      const a = await prisma.answer.findFirst({
        where: { id: aid },
        select: { moderations: { select: { id: true, approval: true } } },
      });

      let update: Record<string, boolean> = {};
      let shouldUpdate = false;
      if (a?.moderations.length || 0 === 0) {
        update.moderated = false;
        shouldUpdate = true;
      }

      if (a?.moderations.filter((each) => each.approval).length || 0 === 0) {
        update.approved = false;
        shouldUpdate = true;
      }

      if (shouldUpdate)
        await prisma.answer.update({ where: { id: aid }, data: update });

      prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 50 } },
      });

      return createSuccessResponse("Moderation deleted");
    } catch (e) {
      return handlePrismaError(e);
    }
  });
