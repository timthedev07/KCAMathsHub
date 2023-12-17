import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const addAttachments = publicProcedure
  .input(
    z.array(
      z.object({
        attachmentName: z.string(),
        objKey: z.string(),
        size: z.number().nonnegative(), // kb
        answerId: z.string().optional(),
        questionId: z.string().optional(),
      })
    )
  )
  .mutation(async ({ input: attachments }) => {
    const ids = [];
    for (const {
      objKey,
      attachmentName,
      answerId,
      questionId,
      size,
    } of attachments) {
      if (!!answerId && !!questionId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Only one of 'answerId' and 'questionId' of '${objKey} (${attachmentName})' should be provided to indicate the specified relation.`,
        });
      }
      const { id } = await prisma.imageAttachment.create({
        data: {
          size,
          objKey,
          name: attachmentName,
          answerId,
          questionId,
        },
      });
      ids.push(id);
    }
    return ids;
  });
