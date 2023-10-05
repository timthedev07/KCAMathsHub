import { Upload } from "@aws-sdk/lib-storage";
import { createAWSS3Client } from "../../../aws/client";
import { randomUUID } from "crypto";
import { S3Client } from "@aws-sdk/client-s3";
import { getUrl } from "../../../aws/urlFormatter";
import { ImgUrlsType } from "../../../types/upload";

const uploadFile = async (s3Client: S3Client, Key: string, Body: Buffer) => {
  return new Promise(async function (resolve, reject) {
    try {
      const parallelUploads3 = new Upload({
        client: s3Client,
        params: { Bucket: process.env.S3_BUCKET_NAME, Key, Body },
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      });
      await parallelUploads3.done();
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

const POST = async (request: Request) => {
  const formData = await request.formData();
  const fileCount = parseInt(
    formData.get("file_count")?.valueOf() as unknown as string
  );

  if (fileCount < 1)
    return Response.json({ message: "No files provided" }, { status: 400 });

  const awsS3Client = createAWSS3Client();

  // fname is the uuid file name; name is Attachment_1, Attachment_2, etc.
  const imgUrls: ImgUrlsType = [];

  let a = 1;

  for (let i = 0; i < fileCount; i++) {
    const file = formData.get(`file_${i}`)?.valueOf()! as unknown as File;

    if (file.type.startsWith("image/")) {
      const t = file.name.split(".");
      const extension = t[t.length - 1];

      const buffer = Buffer.from(await file.arrayBuffer());
      const fname = randomUUID() + "." + extension;
      try {
        await uploadFile(awsS3Client, fname, buffer);
        imgUrls.push({ url: getUrl(fname), name: `Attachment_${a}` });
        a++;
      } catch (err) {
        console.log(err);
      }
    }
  }

  return Response.json({ imgUrls }, { status: 201 });
};

export { POST };
