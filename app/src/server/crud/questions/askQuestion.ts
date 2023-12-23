import prisma from "../../../db";
import { roleChecker } from "../../../lib/accessGuard";
import { classifyKSCategory } from "../../../lib/classifyKSCategory";
import { getCurrYear } from "../../../lib/getCurrYear";
import { handlePrismaError } from "../../../lib/handlePrismaError";
import { AskSubmissionSchema } from "../../../schema/ask";
import { createError, createSuccessResponse } from "../../../trpc/createError";
import { publicProcedure } from "../../trpc";

export const askQuestion = publicProcedure
  .input(AskSubmissionSchema)
  .mutation(
    async ({
      input: { attachmentIds, content, title, userId, anonymous, categories },
    }) => {
      const u = await prisma.user.findFirst({
        where: { id: userId },
        include: { roles: { select: { name: true } } },
      });

      if (
        !u ||
        !roleChecker(u.roles.map((each) => each.name) as any, ["inquirer"])
      )
        return createError("Unauthorized", 401);

      const attachments = await prisma.imageAttachment.findMany({
        where: { id: { in: attachmentIds } },
      });

      let finalId;

      // insert question
      try {
        const askedQuestion = await prisma.question.create({
          data: {
            content,
            title,
            attachments: {
              connect: attachments,
            },
            questioner: { connect: { id: userId } },
            category: u.joinedYear
              ? classifyKSCategory(u.joinedDate, u.joinedYear)
              : null,
            yearGroupAsked: u.joinedYear
              ? getCurrYear(u.joinedDate, u.joinedYear)
              : null,
            anonymous,
            timestamp: new Date(),
            categories: { connect: categories.map((name) => ({ name })) },
          },
        });
        finalId = askedQuestion.id;
        return createSuccessResponse("", finalId);
      } catch (err: any) {
        return handlePrismaError(err);
      }
    }
  );
