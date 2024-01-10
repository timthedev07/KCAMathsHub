import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { createAWSS3Client } from "../../../aws/client";
import { ImgUrlsType } from "../../../types/upload";

// for dev purposes
function randNum(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const IMG_QUALITY_THRESHOLD = 1300;

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

        let ratio = 1;

        // downsizing logic
        if (h && w && w * h > IMG_QUALITY_THRESHOLD ** 2) {
          let newW, newH;
          if (w > h) {
            // horizontal
            newW = IMG_QUALITY_THRESHOLD;
            ratio = newW / w;
            newH = Math.floor(ratio * h);
          } else {
            newH = IMG_QUALITY_THRESHOLD;
            ratio = newH / h;
            newW = Math.floor(ratio * w);
          }
          img.resize({ width: newW, height: newH });
        }

        img.jpeg({ quality: 95, force: true });
        const { data, info } = await img.toBuffer({ resolveWithObject: true });
        const fname = randomUUID() + "." + extension;

        const fSize = Math.round((info.size / 1000) * 100) / 100; // file size in kb

        try {
          await uploadFile(awsS3Client, fname, data);
          imgUrls.push({
            objKey: fname,
            name: `Attachment ${a}.${extension}`,
            size: fSize,
          });
          a++;
        } catch (err) {
          console.log(err);
        }
      }
    }
  } else {
    for (let i = 0; i < fileCount; i++) {
      const [a, b] = [randNum(500, 1500), randNum(500, 1500)];

      imgUrls.push({
        name: `Attachment ${i}` + ".png",
        objKey: "example.png",
        size: Math.round(((a * b * 24) / 8 / 1000000) * 100) / 100,
      });
    }
  }

  return Response.json({ imgUrls }, { status: 201 });
};

export { POST };
