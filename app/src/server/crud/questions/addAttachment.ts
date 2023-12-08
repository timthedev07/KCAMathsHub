import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { TRPCError } from "@trpc/server";

export const addAttachments = publicProcedure
  .input(
    z.array(
      z.object({
        attachmentName: z.string(),
        url: z.string(),
        size: z.number().nonnegative(),
        answerId: z.string().optional(),
        questionId: z.string().optional(),
      })
    )
  )
  .mutation(async ({ input: attachments }) => {
    const ids = [];
    console.log("Attachments received at the mutation:", attachments);
    for (const {
      url,
      attachmentName,
      answerId,
      questionId,
      size,
    } of attachments) {
      if (!!answerId && !!questionId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Only one of 'answerId' and 'questionId' of '${url} (${attachmentName})' should be provided to indicate the specified relation.`,
        });
      }
      const { id } = await prisma.imageAttachment.create({
        data: {
          size,
          imgUrl: url,
          name: attachmentName,
          answerId,
          questionId,
        },
      });
      ids.push(id);
    }
    return ids;
  });
