import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../db";
import { createError, createSuccessResponse } from "../../../trpc/createError";
import { publicProcedure } from "../../trpc";

export const deleteAnswer = publicProcedure
  .input(z.object({ aid: z.string() }))
  .mutation(async ({ input: { aid } }) => {
    try {
      await prisma.answer.delete({
        where: {
          id: aid,
          accepted: false,
          moderated: false,
        },
      });
      return createSuccessResponse("Answer deleted");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return createError("Answer cannot be deleted");
      } else {
        return createError("Unknown error", 500);
      }
    }
  });
