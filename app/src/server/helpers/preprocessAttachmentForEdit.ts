import { getUrl } from "../../aws/urlFormatter";

type Base = {
  objKey: string;
  size: number;
  name: string;
};

export const preprocessAttachmentsForEdit = <T extends Base>(
  attachments: T[]
) => {
  return attachments.map(({ objKey, ...k }) => {
    return {
      ...k,
      url: getUrl(objKey),
      objKey,
    };
  });
};
