import { Prisma } from "@prisma/client";
import { createError } from "../trpc/createError";

export const handlePrismaError = (
  e: unknown,
  message?: string,
  unknownErrMessage: string = "Unknown error",
  log = true
) => {
  if (log && message) console.log(e);
  if (e instanceof Prisma.PrismaClientKnownRequestError)
    return createError(message ? message : e.message);
  if (log) console.log(e);
  return createError(unknownErrMessage, 500);
};
