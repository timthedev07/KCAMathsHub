import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createAWSS3Client } from "./client";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";

export const deleteAWSFile = async (objKey: string) => {
  const s3 = createAWSS3Client();
  const cf = new CloudFrontClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // delete from s3
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: objKey,
      })
    );
  } catch (e) {
    console.log("Unable to delete file with objKey", objKey + ":", e);
    return false;
  }

  // invalidate cloudfront cache
  await cf.send(
    new CreateInvalidationCommand({
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: objKey,
        Paths: { Quantity: 1, Items: [`/${objKey}`] },
      },
    })
  );

  return true;
};
