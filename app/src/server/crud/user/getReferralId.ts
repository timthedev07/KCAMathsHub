import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { pageURLs } from "../../../lib/pageURLGen";

export const getReferral = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input: { userId } }) => {
    const referral = await prisma.referral.findFirst({ where: { userId } });
    if (!referral) {
      return false;
    }
    return pageURLs.referral(referral.id);
  });
