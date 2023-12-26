import { z } from "zod";
import prisma from "../../../db";
import { preprocessAttachmentsForEdit } from "../../helpers/preprocessAttachmentForEdit";
import { publicProcedure } from "../../trpc";

export const getAnswer = publicProcedure
  .input(z.object({ aid: z.string() }))
  .query(async ({ input: { aid } }) => {
    const a = await prisma.answer.findFirst({
      where: { id: aid },
      select: {
        accepted: true,
        anonymous: true,
        answerer: { select: { username: true, image: true } },
        approved: true,
        moderated: true,
        timestamp: true,
        attachments: { select: { name: true, size: true, objKey: true } },
        content: true,
        question: {
          select: {
            id: true,
            categories: { select: { name: true } },
            title: true,
          },
        },
      },
    });

    return a
      ? {
          ...a,
          attachments: preprocessAttachmentsForEdit(a?.attachments || []),
        }
      : null;
  });
