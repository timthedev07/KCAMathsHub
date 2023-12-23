import { Prisma } from "@prisma/client";
import prisma from "../../db";
import { preprocessAttachmentsForEdit } from "../helpers/preprocessAttachmentForEdit";

const userSelection = {
  username: true,
  image: true,
  id: true,
  joinedDate: true,
  joinedYear: true,
};
const attachmentSelection = { name: true, objKey: true, size: true };

const helperFind = async (where: Prisma.QuestionWhereUniqueInput) => {
  const q = await prisma.question.findUnique({
    where,
    include: {
      questioner: { select: userSelection },
      categories: true,
      answers: {
        select: {
          accepted: true,
          moderated: true,
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
