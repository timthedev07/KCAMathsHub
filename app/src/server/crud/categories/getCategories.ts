import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { TRPCError } from "@trpc/server";

export const getExistingCategories = publicProcedure.query(async ({}) => {
  try {
    return await prisma.questionCategory.findMany();
  } catch (err: unknown) {
    console.log(err);
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
});
