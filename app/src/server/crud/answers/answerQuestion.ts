import prisma from "../../../db";
import { roleChecker } from "../../../lib/accessGuard";
import { AnswerSchema } from "../../../schema/answer";
import { createError, createSuccessResponse } from "../../../trpc/createError";
import { Role } from "../../../types/role";
import { publicProcedure } from "../../trpc";

export const answerQuestion = publicProcedure
  .input(AnswerSchema)
  .mutation(
    async ({ input: { attachmentIds, content, questionId, userId } }) => {
      let q;
      try {
        q = await prisma.question.findUnique({
          where: { id: questionId },
        });
      } catch {
        return createError("Invalid question");
      }

      if (!q) return createError("Invalid question");

      const answerer = await prisma.user.findUnique({
        where: { id: userId },
        include: { roles: { select: { name: true } } },
      });

      if (
        !answerer ||
        !roleChecker(answerer.roles.map(({ name }) => name) as Role[], [
          "answerer",
        ])
      ) {
        return createError("Unauthorized", 401);
      }

      const attachments = await prisma.imageAttachment.findMany({
        where: { id: { in: attachmentIds } },
      });

      if (attachmentIds.length !== attachments.length) {
        return createError("Invalid attachment(s)", 400);
      }

      try {
        const answer = await prisma.answer.create({
          data: {
            content,
            questionId,
            answererId: answerer.id,
            attachments: { connect: attachments },
          },
        });
        return createSuccessResponse("", answer);
      } catch (e) {
        console.log("Error creating answer:", e);
        return createError("Failed to create answer");
      }
    }
  );
