import prisma from "../../../db";
import { handlePrismaError } from "../../../lib/handlePrismaError";
import { ModerationSubmissionSchema } from "../../../schema/moderation";
import { createError, createSuccessResponse } from "../../../trpc/createError";
import { publicProcedure } from "../../trpc";

export const moderate = publicProcedure
  .input(ModerationSubmissionSchema)
  .mutation(
    async ({
      input: { anonymous, answerId, approval, moderationComment, moderatorId },
    }) => {
      let u;
      try {
        u = await prisma.user.findUniqueOrThrow({
          where: { id: moderatorId, roles: { some: { name: "moderator" } } },
          include: { moderations: { select: { answerId: true } } },
        });
      } catch (e) {
        return handlePrismaError(e);
      }

      if (u.moderations.some((val) => val.answerId === answerId)) {
        return createError("You have already moderated the answer");
      }

      const q = await prisma.question.findFirst({
        where: { answers: { some: { id: answerId } } },
        include: {
          answers: { where: { id: answerId }, select: { timestamp: true } },
        },
      });

      if (!q) return createError("Invalid answer");

      let dateAsked, answeredWithinADay;

      if (q.boosted) {
        dateAsked = q.timestamp;
        answeredWithinADay =
          dateAsked.valueOf() + 24 * 3600 * 1000 >=
          q.answers[0].timestamp.valueOf();
      }

      const answererUpdate = approval
        ? {
            answerer: {
              update: {
                credits: {
                  increment: q.boosted ? (answeredWithinADay ? 70 : 40) : 40,
                },
              },
            },
          }
        : {};

      try {
        await prisma.answer.update({
          where: { id: answerId },
          data: {
            moderated: true,
            approved: approval ? true : undefined,
            ...answererUpdate,
          },
        });
      } catch (e) {
        return handlePrismaError(e);
      }

      try {
        await prisma.moderation.create({
          data: {
            anonymous,
            answer: { connect: { id: answerId } },
            approval,
            moderationComment,
            moderator: { connect: { id: moderatorId } },
          },
        });

        await prisma.user.update({
          where: { id: moderatorId },
          data: { credits: { increment: 50 } },
        });
        return createSuccessResponse("Answer moderated");
      } catch (e) {
        return handlePrismaError(e);
      }
    }
  );
