import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { TRPCError } from "@trpc/server";

export const acceptReferral = publicProcedure
  .input(
    z.object({
      userId: z.string(), // user accepting the referral
      referralId: z.string(),
    })
  )
  .mutation(async ({ input: { referralId, userId } }) => {
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    await prisma.referral.update({
      where: { id: referralId },
      data: { acceptedUsers: { connect: { id: userId } } },
    });
    return true;
  });
