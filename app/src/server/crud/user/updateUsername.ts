import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { DAYS_BETWEEN_USERNAME_UPDATE } from "../../../constants/updateIntervals";
import prisma from "../../../db";
import { updateIntervalCheck } from "../../../lib/updateIntervalCheck";
import { publicProcedure } from "../../trpc";

export const updateUsername = publicProcedure
  .input(
    z.object({
      id: z.string(),
      username: z.string(),
    })
  )
  .mutation(async ({ input: { id, username } }) => {
    if (username.length > 32) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username cannot be longer than 16 characters.",
      });
    }

    if (username.includes(" ")) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username cannot contain spaces.",
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
