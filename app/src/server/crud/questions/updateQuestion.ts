import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { TRPCError } from "@trpc/server";
import { AskSubmissionSchema } from "../../../schema/ask";
import { Prisma } from "@prisma/client";

export const updateQuestion = publicProcedure
  .input(
    z.object({
      quid: z.string(),
      updateData: AskSubmissionSchema.partial({
        userId: true,
      }),
    })
  )
  .mutation(
    async ({
      input: {
        quid,
        updateData: { anonymous, attachmentIds, content, title, categories },
      },
    }) => {
      const attachments = await prisma.imageAttachment.findMany({
        where: { id: { in: attachmentIds } },
      });

      if (attachmentIds.length !== attachments.length) {
        new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid attachments",
        });
      }

      try {
        await prisma.question.update({
          where: { id: quid },
          data: {
            content,
            title,
            attachments: {
              connect: attachments,
            },
            anonymous,
            timestamp: new Date(),
            categories: { connect: categories.map((name) => ({ name })) },
          },
        });
        return true;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({ code: "BAD_REQUEST", message: e.message });
        } else {
          console.log(e);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unknown error",
          });
        }
      }
    }
  );
