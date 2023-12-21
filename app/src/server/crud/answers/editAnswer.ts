import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../db";
import { AnswerSubmissionSchema } from "../../../schema/answer";
import { createError, createSuccessResponse } from "../../../trpc/createError";
import { publicProcedure } from "../../trpc";

export const editAnswer = publicProcedure
  .input(AnswerSubmissionSchema.merge(z.object({ aid: z.string() })))
  .mutation(
    async ({
      input: { aid, anonymous, attachmentIds, content, questionId, userId },
    }) => {
      const attachments = await prisma.imageAttachment.findMany({
        where: { id: { in: attachmentIds } },
      });

      try {
        await prisma.answer.update({
          where: { id: aid, questionId, answererId: userId },
          data: {
            content,
            editedAt: new Date(),
            anonymous: anonymous,
            attachments: {
              connect: attachments,
            },
          },
        });
        return createSuccessResponse("Answer updated");
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          return createError(e.message);
        }
        console.log(e);
        return createError("Unknown error", 500);
      }
    }
  );
