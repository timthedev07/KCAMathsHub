import { z } from "zod";
import { categories } from "../../../categories";
import { getYearGroupsByK } from "../../../components/select/year-group-select/getDataSet";
import { HOMEPAGE_QUESTION_PAGE_SIZE } from "../../../constants/pagination";
import prisma from "../../../db";
import { truncateAtWord } from "../../../lib/truncateAtWord";
import { StudentStages } from "../../../types/StudentStage";
import { publicProcedure } from "../../trpc";

export const GetQSSchema = z.object({
  k: z.string().optional(), // undefined => all
  s: z.string().optional().default("desc"),
  cursor: z.string().nullish(),
  q: z.string().optional(),
  c: z.string().optional(),
  u: z.string().optional(),
  y: z.string().optional(),
  a: z.string().optional(),
});

export const getQuestions = publicProcedure
  .input(GetQSSchema)
  .query(async ({ input: { k, s: order, cursor, q, c, u, y: y_, a: a_ } }) => {
    let y = y_ ? parseInt(y_) : undefined;

    if (!!y_ && y && (isNaN(y) || !getYearGroupsByK(k).includes(y))) {
      return { questions: [] };
    }

    const a = a_?.toLowerCase();

    const s = order === "desc" || order === "asc" ? order : "desc";

    if (
      (!!k && StudentStages.indexOf(k as any) < 0) ||
      (!!c && categories.indexOf(c) < 0) ||
      (!!a && ["answered", "unanswered"].indexOf(a) < 0)
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
    const ySearch = !!y ? { yearGroupAsked: y } : {};
    const aSearch = !!a ? { answered: a === "answered" } : {};

    try {
      const questions = (
        await prisma.question.findMany({
          take: limit + 1,
          where: {
            ...kSearch,
            ...qSearch,
            ...cSearch,
            ...uSearch,
            ...ySearch,
            ...aSearch,
          },
          orderBy: [{ boosted: "desc" }, { timestamp: s }],
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
      )
        .sort((a, b) => {
          if (!a.answered && !b.answered) return 0;
          if (a.answered && b.answered) return 0;
          return a.answered ? 1 : -1;
        })
        .map((each) => ({
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
