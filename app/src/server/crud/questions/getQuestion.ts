import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";

const userSelection = { username: true, image: true, id: true };
const attachmentSelection = { name: true, imgUrl: true };

export const getQuestion = publicProcedure
  .input(
    z.object({
      quid: z.string(),
    })
  )
  .query(async ({ input: { quid } }) => {
    const q = await prisma.question.findUnique({
      where: { id: quid },
      include: {
        questioner: { select: userSelection },
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
    return q;
  });
