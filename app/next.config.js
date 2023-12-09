/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      `${process.env.S3_CLOUDFRONT_DOMAIN}`,
      "placehold.co",
      "lh3.googleusercontent.com",
    ].map((each) => {
      return { hostname: each };
    }),
  },
};

module.exports = nextConfig;
