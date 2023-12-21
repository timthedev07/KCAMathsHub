import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../db";
import { createError, createSuccessResponse } from "../../../trpc/createError";
import { preprocessAttachmentsForEdit } from "../../helpers/preprocessAttachmentForEdit";
import { publicProcedure } from "../../trpc";

export const getAnswerForEdit = publicProcedure
  .input(z.object({ aid: z.string(), userId: z.string() }))
  .mutation(async ({ input: { aid, userId } }) => {
    try {
      const res = await prisma.answer.findUniqueOrThrow({
        where: { id: aid, answererId: userId },
        select: {
          anonymous: true,
          content: true,
          id: true,
          attachments: {
            select: {
              id: true,
              name: true,
              objKey: true,
              size: true,
            },
          },
          questionId: true,
          moderated: true,
          accepted: true,
        },
      });

      return createSuccessResponse("", {
        ...res,
        attachments: preprocessAttachmentsForEdit(res.attachments),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return createError(e.message);
      } else {
        return createError("Unknown error", 500);
      }
    }
  });
