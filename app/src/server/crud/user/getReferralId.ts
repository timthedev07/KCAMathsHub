import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";

export const getReferralId = publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input: { userId } }) => {
    const referral = await prisma.referral.findFirst({ where: { userId } });
    if (!referral) {
      return false;
    }
    return referral.id;
  });
