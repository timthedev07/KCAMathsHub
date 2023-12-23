import { z } from "zod";
import prisma from "../../../db";
import { handlePrismaError } from "../../../lib/handlePrismaError";
import { createSuccessResponse } from "../../../trpc/createError";
import { publicProcedure } from "../../trpc";

export const getModerations = publicProcedure
  .input(z.object({ aid: z.string() }))
  .query(async ({ input: { aid } }) => {
    try {
      const res = await prisma.moderation.findMany({
        where: {
          answerId: aid,
        },
        orderBy: { timestamp: "desc" },
        select: {
          id: true,
          timestamp: true,
          approval: true,
          moderationComment: true,
          moderator: {
            select: {
              username: true,
              image: true,
            },
          },
          anonymous: true,
        },
      });
      return createSuccessResponse("", res);
    } catch (e) {
      return handlePrismaError(e);
    }
  });
