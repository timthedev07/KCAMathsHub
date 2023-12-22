import prisma from "../../../db";
import { roleChecker } from "../../../lib/accessGuard";
import { handlePrismaError } from "../../../lib/handlePrismaError";
import { AnswerSubmissionSchema } from "../../../schema/answer";
import { createError, createSuccessResponse } from "../../../trpc/createError";
import { Role } from "../../../types/role";
import { deleteMultipleFromAWS } from "../../helpers/deleteMultipleFromAWS";
import { publicProcedure } from "../../trpc";

export const answerQuestion = publicProcedure
  .input(AnswerSubmissionSchema)
  .mutation(
    async ({
      input: { attachmentIds, content, questionId, userId, anonymous },
    }) => {
      let q;

      const attachments = await prisma.imageAttachment.findMany({
        where: { id: { in: attachmentIds } },
      });

      if (attachmentIds.length !== attachments.length) {
        await deleteMultipleFromAWS(attachmentIds, attachments);
        return createError("Invalid attachment(s)", 400);
      }

      try {
        q = await prisma.question.findUnique({
          where: { id: questionId },
        });
      } catch {
        await deleteMultipleFromAWS(attachmentIds, attachments);
        return createError("Invalid question");
      }

      if (!q) {
        await deleteMultipleFromAWS(attachmentIds, attachments);
        return createError("Invalid question");
      }

      const answerer = await prisma.user.findUnique({
        where: { id: userId },
        include: { roles: { select: { name: true } } },
      });

      if (
        !answerer ||
        (!roleChecker(answerer.roles.map(({ name }) => name) as Role[], [
          "answerer",
        ]) &&
          answerer.id !== q.questionerId)
      ) {
        await deleteMultipleFromAWS(attachmentIds, attachments);
        return createError("Unauthorized", 401);
      }

      try {
        const answer = await prisma.answer.create({
          data: {
            content,
            questionId,
            answererId: answerer.id,
            attachments: { connect: attachments },
            anonymous,
          },
        });
        return createSuccessResponse("", answer);
      } catch (e) {
        await deleteMultipleFromAWS(attachmentIds, attachments);
        return handlePrismaError(
          e,
          "Failed to post answer",
          "Failed to post answer"
        );
      }
    }
  );
