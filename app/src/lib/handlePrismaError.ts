import { Prisma } from "@prisma/client";
import { createError } from "../trpc/createError";

export const handlePrismaError = (e: unknown, message?: string, log = true) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError)
    return createError(message ? message : e.message);
  if (log) console.log(e);
  return createError("Unknown error", 500);
};
