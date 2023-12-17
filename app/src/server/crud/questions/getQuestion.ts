import { z } from "zod";
import { getQ } from "../../shared/getQ";
import { publicProcedure } from "../../trpc";

export const getQuestion = publicProcedure
  .input(
    z.object({
      quid: z.string(),
    })
  )
  .query(async ({ input: { quid } }) => {
    return await getQ(quid);
  });
