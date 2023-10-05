export const getUrl = (fname: string) => {
  return `https://${process.env.S3_BUCKET_NAME}.s3-${
    process.env.AWS_REGION
  }.amazonaws.com/${encodeURIComponent(fname)}`;
};
