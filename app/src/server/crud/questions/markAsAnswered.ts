import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const markAsAnswered = publicProcedure
  .input(z.string())
  .mutation(async ({ input: quid }) => {
    try {
      await prisma.question.update({
        where: { id: quid },
        data: { answered: true },
      });
      return true;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return err.message;
      } else {
        return "Unknown error";
      }
    }
  });
