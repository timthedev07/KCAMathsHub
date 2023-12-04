import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { updateIntervalCheck } from "../../../lib/updateIntervalCheck";
import { DAYS_BETWEEN_USERNAME_UPDATE } from "../../../data/updateIntervals";
import { TRPCError } from "@trpc/server";

export const updateUsername = publicProcedure
  .input(
    z.object({
      id: z.string(),
      username: z.string(),
    })
  )
  .mutation(async ({ input: { id, username } }) => {
    if (username.length > 16) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username cannot be longer than 16 characters.",
      });
    }
    const lastUpdate = (
      await prisma.user.findFirst({
        where: { id },
        select: { usernameLastUpdated: true },
      })
    )?.usernameLastUpdated?.valueOf();

    if (await prisma.user.findFirst({ where: { username } })) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username already taken.",
      });
    }

    if (updateIntervalCheck(lastUpdate, DAYS_BETWEEN_USERNAME_UPDATE))
      await prisma.user.update({
        data: { username, usernameLastUpdated: new Date(Date.now()) },
        where: { id },
      });
    else {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Username last updated within ${DAYS_BETWEEN_USERNAME_UPDATE} days.`,
      });
    }
  });
