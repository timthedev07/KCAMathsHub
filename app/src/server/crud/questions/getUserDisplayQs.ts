import { z } from "zod";
import prisma from "../../../db";
import { userQuestionListDisplaySelect } from "../../../types/prisma/payloads/userQs";
import { publicProcedure } from "../../trpc";

export const getUserDisplayQuestions = publicProcedure
  .input(
    z.object({
      uid: z.string(),
    })
  )
  .query(async ({ input: { uid } }) =>
    (
      await prisma.question.findMany({
        where: { questionerId: uid },
        select: userQuestionListDisplaySelect,
      })
    ).toReversed()
  );
