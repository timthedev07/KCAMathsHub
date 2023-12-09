import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";

export const deleteQuestion = publicProcedure
  .input(
    z.object({
      quid: z.string(),
      uid: z.string(),
    })
  )
  .query(async ({ input: { quid, uid } }) => {
    try {
      await prisma.question.delete({
        where: { id: quid, questionerId: uid },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  });
