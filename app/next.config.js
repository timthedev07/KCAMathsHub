/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      `https://${process.env.S3_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com/`,
    ],
  },
};

module.exports = nextConfig;
