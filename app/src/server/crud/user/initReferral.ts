import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { pageURLs } from "../../../lib/pageURLGen";

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
    return pageURLs.referralLink(res.id);
  });
