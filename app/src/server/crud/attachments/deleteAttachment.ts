import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { deleteAttachment as da } from "../../shared/deleteAttachment";

export const deleteAttachment = publicProcedure
  .input(z.string())
  .mutation(async ({ input: objKey }) => {
    return await da(objKey);
  });
