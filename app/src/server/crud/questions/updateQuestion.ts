import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../../db";
import { AskSubmissionSchema } from "../../../schema/ask";
import { publicProcedure } from "../../trpc";

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
            edited: true,
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
