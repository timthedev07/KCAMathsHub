import analyzer from "@next/bundle-analyzer";
import mdx from "@next/mdx";
import { default as rehypeAutolinkHeadings } from "rehype-autolink-headings";
import { default as rehypeSlug } from "rehype-slug";
import { default as emoji } from "remark-emoji";
import { default as remarkGfm } from "remark-gfm";

const withMDX = mdx({
  options: {
    remarkPlugins: [remarkGfm, emoji],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
  extension: /\.mdx$/,
});
const withBundleAnalyzer = analyzer({
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

export default withBundleAnalyzer(withMDX(nextConfig));
