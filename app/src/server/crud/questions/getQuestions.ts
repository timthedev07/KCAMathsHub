import { z } from "zod";
import { HOMEPAGE_QUESTION_PAGE_SIZE } from "../../../constants/pagination";
import prisma from "../../../db";
import { truncateAtWord } from "../../../lib/truncateAtWord";
import { StudentStageType, StudentStages } from "../../../types/StudentStage";
import { publicProcedure } from "../../trpc";

export const GetQSSchema = z.object({
  category: z.enum(StudentStages).optional(), // undefined => all
  sortBy: z.enum(["timestamp"]).optional().default("timestamp"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  cursor: z.string().nullish(),
});

export const getQS = async ({
  category,
  sortBy = "timestamp",
  order = "desc",
  cursor,
}: {
  category?: StudentStageType;
  sortBy?: "timestamp";
  order?: "asc" | "desc";
  cursor?: string | null;
}) => {
  const limit = HOMEPAGE_QUESTION_PAGE_SIZE;

  try {
    const questions = (
      await prisma.question.findMany({
        take: limit + 1,
        where: {
          category,
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
};

export const getQuestions = publicProcedure
  .input(GetQSSchema)
  .query(async ({ input }) => {
    return getQS(input);
  });
