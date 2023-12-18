import { z } from "zod";
import { getQByAnswer } from "../../shared/getQ";
import { publicProcedure } from "../../trpc";

export const getQuestionByAnswer = publicProcedure
  .input(z.object({ aid: z.string() }))
  .query(({ input: { aid } }) => {
    return getQByAnswer(aid);
  });
