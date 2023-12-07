import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { TRPCError } from "@trpc/server";
import { classifyKSCategory } from "../../../lib/classifyKSCategory";
import { getCurrYear } from "../../../lib/getCurrYear";

export const TITLE_LIMIT = [8, 128];
export const CONTENT_LIMIT = [50, 5000];

export const askQuestion = publicProcedure
  .input(
    z.object({
      title: z
        .string()
        .min(TITLE_LIMIT[0], "Title is not long enough")
        .max(TITLE_LIMIT[1], "Title too long"),
      content: z
        .string()
        .min(
          CONTENT_LIMIT[0],
          "Please write more than 50 characters as the question content"
        )
        .max(CONTENT_LIMIT[1], "Too many words for the content"),
      userId: z.string().min(1),
      attachmentIds: z.number().array(),
      anonymous: z.boolean(),
      categories: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      ),
    })
  )
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
            categories: { connect: categories },
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
