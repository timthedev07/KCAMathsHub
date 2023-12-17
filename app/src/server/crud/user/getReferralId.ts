import { z } from "zod";
import prisma from "../../../db";
import { pageURLs } from "../../../lib/pageURLGen";
import { publicProcedure } from "../../trpc";

export const getReferral = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input: { userId } }) => {
    const referral = await prisma.referral.findFirst({ where: { userId } });
    if (!referral) {
      return false;
    }
    return pageURLs.referral(referral.id);
  });
