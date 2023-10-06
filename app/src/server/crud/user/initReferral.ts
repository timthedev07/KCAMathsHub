import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { getReferralLink } from "../../../lib/referralLinkFormatter";

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
    return getReferralLink(res.id);
  });
