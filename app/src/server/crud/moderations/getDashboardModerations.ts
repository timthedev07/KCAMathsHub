import { z } from "zod";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

const LIMIT = 5;

export const getAllAnswers = publicProcedure
  .input(z.object({ cursor: z.string().optional() }))
  .query(async ({ input: { cursor } }) => {
    const answers = await prisma.answer.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      take: LIMIT + 1,
    });
    let nextCursor: typeof cursor = undefined;
    if (answers.length > LIMIT) {
      const nextItem = answers.pop();
      nextCursor = nextItem!.id;
    }

    return {
      answers,
      nextCursor,
    };
  });

export const getDashboardUserModerations = publicProcedure
  .input(
    z.object({
      uid: z.string(),
      cursor: z.string().nullish(),
      sortOrder: z.string().optional(),
    })
  )
  .query(async ({ input: { uid, cursor, sortOrder } }) => {
    if (!!sortOrder && sortOrder !== "desc" && sortOrder !== "asc")
      return { moderations: [] };

    try {
      await prisma.user.findUniqueOrThrow({
        where: {
          id: uid,
          roles: { some: { OR: [{ name: "moderator" }, { name: "admin" }] } },
        },
        select: { id: true },
      });
    } catch (e) {
      return {
        moderations: [],
      };
    }

    const orderBy = sortOrder ? { timestamp: sortOrder as any } : {};

    const mods = await prisma.moderation.findMany({
      where: { moderatorId: uid },
      select: {
        id: true,
        moderationComment: true,
        anonymous: true,
        approval: true,
        answer: {
          select: {
            answerer: { select: { username: true } },
            question: { select: { categories: { select: { name: true } } } },
          },
        },
        timestamp: true,
      },
      take: LIMIT + 1,
      orderBy,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
    });

    let nextCursor: typeof cursor = undefined;
    if (mods.length > LIMIT) {
      const nextItem = mods.pop();
      nextCursor = nextItem!.id;
    }

    return {
      moderations: mods,
      nextCursor,
    };
  });
