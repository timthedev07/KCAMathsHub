import { z } from "zod";
import prisma from "../../../db";
import { pageURLs } from "../../../lib/pageURLGen";
import { publicProcedure } from "../../trpc";

export const initReferral = publicProcedure
  .input(
    z.object({
      userId: z.string(),
    })
  )
  .mutation(async ({ input: { userId } }) => {
    const res = await prisma.referral.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return pageURLs.referral(res.id);
  });
