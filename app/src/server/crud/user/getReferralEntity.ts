import { z } from "zod";
import prisma from "../../../db";
import { pageURLs } from "../../../lib/pageURLGen";
import { publicProcedure } from "../../trpc";

export const getReferralEntity = publicProcedure
  .input(z.object({ userId: z.string().optional() }))
  .query(async ({ input: { userId } }) => {
    const referral = await prisma.referral.findFirst({
      where: { userId },
      include: {
        acceptedUsers: {
          select: {
            username: true,
            id: true,
            image: true,
            referralAcceptedTimestamp: true,
          },
        },
      },
    });
    if (!referral) {
      return null;
    }
    const { acceptedUsers, id } = referral;

    return {
      url: pageURLs.referral(id),
      acceptedUsers: acceptedUsers.sort((a, b) => {
        return (
          (b.referralAcceptedTimestamp?.valueOf() || 0) -
          (a.referralAcceptedTimestamp?.valueOf() || 0)
        );
      }),
    };
  });
