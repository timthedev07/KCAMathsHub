import { deleteAttachment } from "../shared/deleteAttachment";

export const deleteMultipleFromAWS = async <
  T extends { id: number; objKey: string }
>(
  attachmentIds: number[],
  attachments: T[]
) => {
  for (const att of attachmentIds) {
    const x = attachments.find((val) => val.id === att);
    if (x) await deleteAttachment(x.objKey);
  }
};
