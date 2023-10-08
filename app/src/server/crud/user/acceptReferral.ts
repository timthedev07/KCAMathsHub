import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { TRPCError } from "@trpc/server";

export const REFERRAL_REP_GAIN = 20;
export const ACCEPT_REP_GAIN = 50;

export const acceptReferral = publicProcedure
  .input(
    z.object({
      userId: z.string(), // user accepting the referral
      referralId: z.string(),
    })
  )
  .mutation(async ({ input: { referralId, userId } }) => {
    if (!(await prisma.user.findFirst({ where: { id: userId } }))) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const creator = await prisma.user.findFirst({ where: { referralId } }); // find the user who created the referral
    if (!creator) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Referral not found",
      });
    }

    await prisma.referral.update({
      where: { id: referralId },
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
    return true;
  });
