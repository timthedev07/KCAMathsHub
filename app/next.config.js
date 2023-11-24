/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      `${process.env.S3_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com/`,
      "placehold.co",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
