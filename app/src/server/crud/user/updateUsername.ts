import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { updateIntervalCheck } from "../../../lib/updateIntervalCheck";

export const DAYS_BETWEEN_USERNAME_UPDATE = 60;

export const updateUsername = publicProcedure
  .input(
    z.object({
      id: z.string(),
      username: z.string(),
    })
  )
  .mutation(async ({ input: { id, username } }) => {
    const lastUpdate = (
      await prisma.user.findFirst({
        where: { id },
        select: { usernameLastUpdated: true },
      })
    )?.usernameLastUpdated?.valueOf();

    if (updateIntervalCheck(lastUpdate, DAYS_BETWEEN_USERNAME_UPDATE))
      await prisma.user.update({
        data: { username, usernameLastUpdated: new Date(Date.now()) },
        where: { id },
      });
  });
