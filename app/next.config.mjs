const withMDX = require("@next/mdx")({
  options: { remarkPlugins: [], rehypePlugins: [] },
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
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

module.exports = withBundleAnalyzer(withMDX(nextConfig));
