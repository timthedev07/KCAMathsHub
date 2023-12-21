import { Prisma } from "@prisma/client";
import prisma from "../../db";
import { preprocessAttachmentsForEdit } from "../helpers/preprocessAttachmentForEdit";

const userSelection = { username: true, image: true, id: true };
const attachmentSelection = { name: true, objKey: true, size: true };

const helperFind = async (where: Prisma.QuestionWhereUniqueInput) => {
  const q = await prisma.question.findUnique({
    where,
    include: {
      questioner: { select: userSelection },
      categories: true,
      answer: {
        select: {
          answerer: { select: userSelection },
          content: true,
          accepted: true,
          attachments: { select: attachmentSelection },
          moderated: true,
          moderations: {
            select: {
              moderator: { select: userSelection },
              approval: true,
              timestamp: true,
              moderationComment: true,
            },
          },
        },
      },
      attachments: { select: attachmentSelection },
    },
  });
  // do not expose data of anonymous users
  if (q && q.anonymous) {
    q.questioner = null;
  }

  if (!q) {
    return null;
  }

  // transforming the attachment objKey to urls
  const { attachments, ...rest } = q;

  return {
    ...rest,
    attachments: preprocessAttachmentsForEdit(attachments),
  };
};

export const getQ = async (quid: string) => {
  return await helperFind({ id: quid });
};
