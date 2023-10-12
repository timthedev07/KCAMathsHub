/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      `${process.env.S3_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com/`,
      "placehold.co",
    ],
  },
};

module.exports = nextConfig;
