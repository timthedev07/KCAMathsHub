export const getUrl = (fname: string) => {
  return `https://${process.env.S3_CLOUDFRONT_DOMAIN}/${encodeURIComponent(
    fname
  )}`;
};
