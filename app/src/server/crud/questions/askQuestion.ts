import { TRPCError } from "@trpc/server";
import prisma from "../../../db";
import { classifyKSCategory } from "../../../lib/classifyKSCategory";
import { getCurrYear } from "../../../lib/getCurrYear";
import { AskSubmissionSchema } from "../../../schema/ask";
import { publicProcedure } from "../../trpc";

export const askQuestion = publicProcedure
  .input(AskSubmissionSchema)
  .mutation(
    async ({
      input: { attachmentIds, content, title, userId, anonymous, categories },
    }) => {
      const u = await prisma.user.findFirst({ where: { id: userId } });

      if (!u)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid user" });

      if (!u.joinedYear) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "At this stage, only students can ask questions.",
        });
      }

      const attachments = await prisma.imageAttachment.findMany({
        where: { id: { in: attachmentIds } },
      });

      if (attachmentIds.length !== attachments.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid attachments",
        });
      }

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
            category: classifyKSCategory(u.joinedDate, u.joinedYear),
            yearGroupAsked: getCurrYear(u.joinedDate, u.joinedYear),
            anonymous,
            timestamp: new Date(),
            categories: { connect: categories.map((name) => ({ name })) },
          },
        });
        finalId = askedQuestion.id;
      } catch (err: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err.message,
        });
      }

      return finalId;
    }
  );
