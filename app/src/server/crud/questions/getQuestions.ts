import { z } from "zod";
import { categories } from "../../../categories";
import { HOMEPAGE_QUESTION_PAGE_SIZE } from "../../../constants/pagination";
import prisma from "../../../db";
import { truncateAtWord } from "../../../lib/truncateAtWord";
import { StudentStages } from "../../../types/StudentStage";
import { publicProcedure } from "../../trpc";

export const GetQSSchema = z.object({
  k: z.string().optional(), // undefined => all
  sortBy: z.enum(["timestamp"]).optional().default("timestamp"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  cursor: z.string().nullish(),
  q: z.string().optional(),
  c: z.string().optional(),
  u: z.string().optional(),
});

export const getQuestions = publicProcedure
  .input(GetQSSchema)
  .query(async ({ input: { k, sortBy, order, cursor, q, c, u } }) => {
    if (
      (!!k && StudentStages.indexOf(k as any) < 0) ||
      (!!c && categories.indexOf(c) < 0)
    ) {
      return {
        questions: [],
        nextCursor: undefined,
      };
    }

    const limit = HOMEPAGE_QUESTION_PAGE_SIZE;

    const qSearch = !!q
      ? { OR: [{ title: { contains: q } }, { content: { contains: q } }] }
      : {};

    const cSearch = !!c
      ? { categories: { some: { name: { equals: c } } } }
      : {};

    const uSearch = !!u ? { questioner: { username: { contains: u } } } : {};
    const kSearch = !!k ? { studentStage: k } : {};

    try {
      const questions = (
        await prisma.question.findMany({
          take: limit + 1,
          where: {
            ...kSearch,
            ...qSearch,
            ...cSearch,
            ...uSearch,
          },
          orderBy: {
            [sortBy]: order,
          },
          include: {
            questioner: { select: { username: true, image: true } },
            categories: { select: { name: true } },
          },
          cursor: cursor
            ? {
                id: cursor,
              }
            : undefined,
        })
      ).map((each) => ({
        ...each,
        title: truncateAtWord(each.title, 60),
        content: truncateAtWord(each.content.replaceAll(/[`*_]/gi, ""), 200),
      }));

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
      console.log(e);
      return {
        questions: [],
        nextCursor: undefined,
      };
    }
  });
