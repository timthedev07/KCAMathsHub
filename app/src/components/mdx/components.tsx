import { MDXRemote } from "next-mdx-remote/rsc";
import { ComponentProps } from "react";

export const mdxCustomComponents: ComponentProps<
  typeof MDXRemote
>["components"] = {
  table: () => {
    return <></>;
  },
  h1: () => {
    return <></>;
  },
  h2: () => {
    return <></>;
  },
  h3: () => {
    return <></>;
  },
  h4: () => {
    return <></>;
  },
  h5: () => {
    return <></>;
  },
  h6: () => {
    return <></>;
  },
  hr: () => {
    return <></>;
  },
  a: () => {
    return <></>;
  },
  em: () => {
    return <></>;
  },
  i: () => {
    return <></>;
  },
  strong: () => {
    return <></>;
  },
  ul: () => {
    return <></>;
  },
  ol: () => {
    return <></>;
  },
  li: () => {
    return <></>;
  },
  u: () => {
    return <></>;
  },
  blockquote: () => {
    return <></>;
  },
  td: () => {
    return <></>;
  },
  tr: () => {
    return <></>;
  },
  th: () => {
    return <></>;
  },
};
