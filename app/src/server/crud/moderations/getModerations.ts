import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import prisma from "../../../db";
import { publicProcedure } from "../../trpc";

export const getModerations = publicProcedure
  .input(z.object({ aid: z.string() }))
  .query(async ({ input: { aid } }) => {
    try {
      const res = await prisma.moderation.findMany({
        where: {
          answerId: aid,
        },
        orderBy: { timestamp: "desc" },
        select: {
          id: true,
          timestamp: true,
          approval: true,
          moderationComment: true,
          moderator: {
            select: {
              username: true,
              image: true,
            },
          },
          anonymous: true,
        },
      });

      return Promise.all(
        res.map(async (each) => ({
          ...each,
          moderationComment: each.moderationComment
            ? await serialize(
                each.moderationComment,
                {
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    format: "md",
                  },
                },
                false
              )
            : null,
        }))
      );
    } catch (e) {
      return [];
    }
  });
