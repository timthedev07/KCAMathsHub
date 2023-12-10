import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getQ } from "../../shared/getQ";

export const getQuestion = publicProcedure
  .input(
    z.object({
      quid: z.string(),
    })
  )
  .query(async ({ input: { quid } }) => {
    return await getQ(quid);
  });
