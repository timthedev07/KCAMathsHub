import { TRPCError } from "@trpc/server";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const getExistingCategories = publicProcedure.query(async ({}) => {
  try {
    return await prisma.questionCategory.findMany();
  } catch (err: unknown) {
    console.log(err);
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
});
