import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { updateIntervalCheck } from "../../../lib/updateIntervalCheck";
import { DAYS_BETWEEN_BIO_UPDATE } from "../../../data/updateIntervals";
import { TRPCError } from "@trpc/server";

export const updateBio = publicProcedure
  .input(
    z.object({
      id: z.string(),
      bio: z.string(),
    })
  )
  .mutation(async ({ input: { id, bio } }) => {
    if (bio.length > 150) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "The bio cannot be longer than 150 characters.",
      });
    }
    const lastUpdate = (
      await prisma.user.findFirst({
        where: { id },
        select: { bioLastUpdated: true },
      })
    )?.bioLastUpdated?.valueOf();

    if (updateIntervalCheck(lastUpdate, DAYS_BETWEEN_BIO_UPDATE))
      await prisma.user.update({
        data: { bio, bioLastUpdated: new Date(Date.now()) },
        where: { id },
      });
    else {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Bio last updated within ${DAYS_BETWEEN_BIO_UPDATE} day${
          DAYS_BETWEEN_BIO_UPDATE > 1 ? "s" : ""
        }.`,
      });
    }
  });
