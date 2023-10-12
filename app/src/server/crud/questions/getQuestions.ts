import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { StudentStages } from "../../../types/StudentStage.d";
import { TRPCError } from "@trpc/server";

export const getQuestions = publicProcedure
  .input(
    z.object({
      category: z.enum(StudentStages).optional(), // undefined => all
      limit: z.number().max(50).min(10).optional().default(20),
      pageNum: z.number().min(1).optional().default(1),
      sortBy: z.enum(["timestamp"]).optional().default("timestamp"),
      order: z.enum(["asc", "desc"]).optional().default("desc"),
    })
  )
  .query(async ({ input: { category, limit, pageNum, sortBy, order } }) => {
    try {
      return await prisma.question.findMany({
        skip: limit * (pageNum - 1),
        take: limit,
        where: {
          category,
        },
        orderBy: {
          [sortBy]: order,
        },
      });
    } catch (err: any) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: err?.message || "Unknown error.",
      });
    }
  });
