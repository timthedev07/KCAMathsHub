import { deleteAWSFile } from "../../aws/deleteFile";
import prisma from "../../db";

export const deleteAttachment = async (objKey: string) => {
  try {
    await prisma.imageAttachment.delete({ where: { objKey } });
    return await deleteAWSFile(objKey);
  } catch (err) {
    console.log(err);
    return false;
  }
};
