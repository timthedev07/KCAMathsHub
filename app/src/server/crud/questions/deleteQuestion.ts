import { z } from "zod";
import { publicProcedure } from "../../trpc";
import prisma from "../../../db";
import { deleteAWSFile } from "../../../aws/deleteFile";

export const deleteQuestion = publicProcedure
  .input(
    z.object({
      quid: z.string(),
      uid: z.string(),
    })
  )
  .mutation(async ({ input: { quid, uid } }) => {
    let deleted;

    try {
      deleted = await prisma.question.delete({
        where: { id: quid, questionerId: uid },
        include: { attachments: { select: { objKey: true } } },
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    let count = 0;

    // deleting any attachments from s3
    for (const { objKey } of deleted.attachments) {
      if (await deleteAWSFile(objKey)) count++;
    }

    console.log(
      `Deletion count: ${count}. Total attachments count: ${deleted.attachments.length}`
    );

    return true;
  });
