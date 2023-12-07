import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { pageURLs } from "../../../lib/pageURLGen";

export const getReferralEntity = publicProcedure
  .input(z.object({ userId: z.string().optional() }))
  .query(async ({ input: { userId } }) => {
    const referral = await prisma.referral.findFirst({
      where: { userId },
      include: {
        acceptedUsers: {
          select: { username: true, id: true, image: true },
        },
      },
    });
    if (!referral) {
      return null;
    }
    const { acceptedUsers, id } = referral;

    return {
      url: pageURLs.referral(id),
      acceptedUsers,
    };
  });
