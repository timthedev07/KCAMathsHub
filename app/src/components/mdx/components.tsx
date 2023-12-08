import { MDXRemote } from "next-mdx-remote/rsc";
import { ComponentProps } from "react";

const tableShared = "py-2 px-4 border border-slate-400/40";

export const mdxCustomComponents: ComponentProps<
  typeof MDXRemote
>["components"] = {
  table: ({ className: _, ...props }) => {
    return (
      <div className="rounded-lg overflow-hidden mx-auto border border-slate-400/40 min-w-[250px] max-w-[600px] w-11/12 md:w-10/12 lg:9/12 xl:8-12">
        <table
          className="border-hidden border-collapse w-full h-full border-spacing-0"
          {...props}
        ></table>
      </div>
    );
  },
  // tbody: ({ className: _, ...props }) => {
  //   return <tbody className="border-0" {...props}></tbody>;
  // },
  td: ({ className: _, ...props }) => {
    return <td className={`${tableShared}`} {...props}></td>;
  },
  tr: ({ ...props }) => {
    return <tr {...props}></tr>;
  },
  th: ({ className: _, ...props }) => {
    return <th className={`${tableShared} bg-emerald-700/90`} {...props}></th>;
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
};
