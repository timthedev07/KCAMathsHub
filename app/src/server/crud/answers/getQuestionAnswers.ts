import { z } from "zod";
import { getUrl } from "../../../aws/urlFormatter";
import { ANSWER_PAGE_SIZE } from "../../../constants/pagination";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const getQuestionAnswers = publicProcedure
  .input(z.object({ quid: z.string(), pageNum: z.number().positive() }))
  .mutation(async ({ input: { quid, pageNum } }) => {
    const res = await prisma.answer.findMany({
      where: { questionId: quid },
      take: ANSWER_PAGE_SIZE,
      skip: ANSWER_PAGE_SIZE * (pageNum - 1),
      include: {
        answerer: { select: { username: true, image: true } },
        attachments: { select: { name: true, objKey: true, size: true } },
        moderations: {
          select: {
            approval: true,
            moderationComment: true,
            moderator: {
              select: {
                username: true,
              },
            },
            anonymous: true,
          },
        },
      },
    });

    return res.map((answer) => {
      const { attachments, ...rest } = answer;
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
    });
  });
