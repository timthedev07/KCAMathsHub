import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { userQuestionListDisplaySelect } from "../../../types/prisma/payloads/userQs";

export const getUserDisplayQuestions = publicProcedure
  .input(
    z.object({
      uid: z.string(),
    })
  )
  .query(
    async ({ input: { uid } }) =>
      await prisma.question.findMany({
        where: { questionerId: uid },
        select: userQuestionListDisplaySelect,
      })
  );
