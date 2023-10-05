import { z } from "zod";
import { publicProcedure } from "../trpc";
import prisma from "../../db";
import { TRPCError } from "@trpc/server";

export const addAttachments = publicProcedure
  .input(
    z.array(
      z.object({
        attachmentName: z.string().optional(),
        url: z.string(),
        answerId: z.string().optional(),
        questionId: z.string().optional(),
      })
    )
  )
  .mutation(async ({ input: attachments }) => {
    for (const { url, attachmentName, answerId, questionId } of attachments) {
      if (!!answerId && !!questionId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Only one of 'answerId' and 'questionId' of '${url} (${attachmentName})' should be provided to indicate the specified relation.`,
        });
      }
      await prisma.imageAttachment.create({
        data: {
          imgUrl: url,
          name: attachmentName,
          answerId,
          questionId,
        },
      });
    }
    return true;
  });
