import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { getUrl } from "../../../aws/urlFormatter";
import { ANSWER_PAGE_SIZE } from "../../../constants/pagination";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const getQuestionAnswers = publicProcedure
  .input(z.object({ quid: z.string(), pageNum: z.number().positive() }))
  .query(async ({ input: { quid, pageNum } }) => {
    const S = await prisma.answer.count({ where: { questionId: quid } });
    const totalPages = Math.ceil(S / ANSWER_PAGE_SIZE);
    const lastPageSize = S % ANSWER_PAGE_SIZE;

    const res = await prisma.answer.findMany({
      where: { questionId: quid },
      take: ANSWER_PAGE_SIZE,
      skip: ANSWER_PAGE_SIZE * (pageNum - 1),
      include: {
        answerer: { select: { username: true, image: true } },
        attachments: { select: { name: true, objKey: true, size: true } },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    const answers = (
      await Promise.all(
        res.map(async (answer) => {
          const { attachments, content, ...rest } = answer;
          return {
            ...rest,
            content: await serialize(
              content,
              {
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  format: "md",
                },
              },
              false
            ),
            attachments: attachments.map(({ objKey, ...k }) => {
              return {
                ...k,
                url: getUrl(objKey),
                objKey,
              };
            }),
          };
        })
      )
    )
      .sort((a, b) => {
        const x = a.accepted;
        const y = b.accepted;
        return x === y ? 0 : x ? -1 : 1;
      })
      .sort((a, b) => {
        const x = a.moderated;
        const y = b.moderated;
        return x === y ? 0 : x ? -1 : 1;
      });

    return {
      answers,
      totalPages,
      lastPageSize,
    };
  });
