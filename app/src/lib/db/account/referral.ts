import { TRPCError } from "@trpc/server";
import prisma from "../../../db";

export const REFERRAL_REP_GAIN = 20;
export const ACCEPT_REP_GAIN = 50;

export const acceptReferral = async (userId: string, referralId: string) => {
  const acceptingUser = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!acceptingUser) {
    // if there is no such user or the user already accepted a referral
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (acceptingUser.acceptedReferralId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You have already accepted a referral.",
    });
  }

  const creator = await prisma.user.findFirst({
    where: { referralCreated: { id: referralId } },
  }); // find the user who created the referral

  if (!creator) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Referral not found",
    });
  }

  if (acceptingUser.id === creator.id) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You can't join through your own referral link.",
    });
  }

  await prisma.referral.update({
    where: { id: referralId, acceptedUsers: { none: { id: userId } } },
    data: { acceptedUsers: { connect: { id: userId } } },
  });

  await prisma.user.update({
    where: { id: creator.id },
    data: { inquirerReputation: { increment: REFERRAL_REP_GAIN } },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { inquirerReputation: { increment: ACCEPT_REP_GAIN } },
  });
};
