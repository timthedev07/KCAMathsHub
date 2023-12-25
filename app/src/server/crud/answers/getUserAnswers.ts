import { serialize } from "next-mdx-remote/serialize";
import { z } from "zod";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const getUserAnswers = publicProcedure
  .input(z.object({ uid: z.string() }))
  .query(async ({ input: { uid } }) => {
    const answers = await prisma.answer.findMany({
      where: { answererId: uid },
      include: {
        question: {
          select: { title: true, categories: { select: { name: true } } },
        },
      },
    });

    return Promise.all(
      answers.map(async (answer) => ({
        ...answer,
        content: await serialize(answer.content),
      }))
    );
  });
