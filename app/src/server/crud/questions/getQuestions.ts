import { z } from "zod";
import { HOMEPAGE_QUESTION_PAGE_SIZE } from "../../../constants/pagination";
import prisma from "../../../db";
import { StudentStages } from "../../../types/StudentStage.d";
import { publicProcedure } from "../../trpc";

export const getQuestions = publicProcedure
  .input(
    z.object({
      category: z.enum(StudentStages).optional(), // undefined => all
      sortBy: z.enum(["timestamp"]).optional().default("timestamp"),
      order: z.enum(["asc", "desc"]).optional().default("desc"),
      cursor: z.string().nullish(),
    })
  )
  .query(async ({ input: { category, sortBy, order, cursor } }) => {
    const limit = HOMEPAGE_QUESTION_PAGE_SIZE;

    try {
      const questions = await prisma.question.findMany({
        take: limit + 1,
        where: {
          category,
        },
        orderBy: {
          [sortBy]: order,
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
      });

      let nextCursor: typeof cursor = undefined;
      if (questions.length > limit) {
        const nextItem = questions.pop();
        nextCursor = nextItem!.id;
      }

      return {
        questions,
        nextCursor,
      };
    } catch (e) {
      return {
        questions: [],
        nextCursor: undefined,
      };
    }
  });
