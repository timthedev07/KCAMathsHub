import { Upload } from "@aws-sdk/lib-storage";
import { createAWSS3Client } from "../../../aws/client";
import { randomUUID } from "crypto";
import { S3Client } from "@aws-sdk/client-s3";
import { getUrl } from "../../../aws/urlFormatter";
import { ImgUrlsType } from "../../../types/upload";
import sharp from "sharp";

const IMG_QUALITY_THRESHOLD = 1500;

const placeholders = [
  "https://placehold.co/600x400@2x.png?font=montserrat",
  "https://placehold.co/800@3x.png?font=montserrat",
  "https://placehold.co/1000x500@3x.png?font=montserrat",
];

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

  // fname is the uuid file name; name is Attachment_1, Attachment_2, etc.
  const imgUrls: ImgUrlsType = [];

  if (process.env.NODE_ENV === "production") {
    const awsS3Client = createAWSS3Client();

    let a = 1;

    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file_${i}`)?.valueOf()! as unknown as File;

      if (file.type.startsWith("image/")) {
        const t = file.name.split(".");
        const extension = t[t.length - 1];

        const buffer = Buffer.from(await file.arrayBuffer());

        // use sharp
        const img = sharp(buffer);
        const metadata = await img.metadata();
        const w = metadata.width;
        const h = metadata.height;

        // downsizing logic
        if (h && w && w * h > IMG_QUALITY_THRESHOLD ** 2) {
          let newW, newH;
          if (w > h) {
            // horizontal
            newW = IMG_QUALITY_THRESHOLD;
            newH = Math.floor((newW / w) * h);
          } else {
            newH = IMG_QUALITY_THRESHOLD;
            newW = Math.floor((newH / h) * w);
          }
          img.resize({ width: newW, height: newH });
        }

        const newBuffer = await img.toBuffer();
        const fname = randomUUID() + "." + extension;

        try {
          await uploadFile(awsS3Client, fname, newBuffer);
          imgUrls.push({ url: getUrl(fname), name: `Attachment_${a}` });
          a++;
        } catch (err) {
          console.log(err);
        }
      }
    }
  } else {
    for (let i = 0; i < fileCount; i++) {
      const d = placeholders[Math.floor(Math.random() * placeholders.length)];
      imgUrls.push({
        name: d.split("/")[1].split("@")[0],
        url: d,
      });
    }
  }

  return Response.json({ imgUrls }, { status: 201 });
};

export { POST };
