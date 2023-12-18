import { Prisma } from "@prisma/client";
import { getUrl } from "../../aws/urlFormatter";
import prisma from "../../db";

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
    attachments: attachments.map(({ objKey, ...k }) => {
      return {
        ...k,
        url: getUrl(objKey),
        objKey,
      };
    }),
  };
};

export const getQ = async (quid: string) => {
  return await helperFind({ id: quid });
};

export const getQByAnswer = async (aid: string) => {
  return await helperFind({ answer: { some: { id: aid } }, id: undefined });
};
