import { z } from "zod";
import { deleteAttachment as da } from "../../shared/deleteAttachment";
import { publicProcedure } from "../../trpc";

export const deleteAttachment = publicProcedure
  .input(z.string())
  .mutation(async ({ input: objKey }) => {
    return await da(objKey);
  });
