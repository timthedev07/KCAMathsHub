import prisma from "../../db";
import { getUrl } from "../../aws/urlFormatter";

const userSelection = { username: true, image: true, id: true };
const attachmentSelection = { name: true, objKey: true, size: true };

export const getQ = async (quid: string) => {
  const q = await prisma.question.findUnique({
    where: { id: quid },
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
