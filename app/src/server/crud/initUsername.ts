import { z } from "zod";
import { publicProcedure } from "../trpc";
import prisma from "../../db";

const DAYS_BETWEEN_UPDATE = 60;

export const updateUsername = publicProcedure
  .input(
    z.object({
      id: z.string(),
      username: z.string(),
    })
  )
  .mutation(async ({ input: { id, username } }) => {
    await prisma.$connect();
    const lastUpdate = (
      await prisma.user.findFirst({
        where: { id },
        select: { usernameLastUpdated: true },
      })
    )?.usernameLastUpdated?.valueOf();
    if (
      !lastUpdate || // first username or ...
      lastUpdate <= Date.now() - DAYS_BETWEEN_UPDATE * 24 * 60 * 60 * 1000 // N days gone
    )
      await prisma.user.update({
        data: { username, usernameLastUpdated: new Date(Date.now()) },
        where: { id },
      });
  });
