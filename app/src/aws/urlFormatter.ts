import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

export const getUrl = (fname: string) => {
  return getSignedUrl({
    url: `https://${process.env.S3_CLOUDFRONT_DOMAIN}/${encodeURIComponent(
      fname
    )}`,
    privateKey: process.env.CLOUDFRONT_PRIVATE_KEY,
    keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
    dateLessThan: new Date(Date.now() + 1000 * 3600 * 24).toDateString(),
  });
};
