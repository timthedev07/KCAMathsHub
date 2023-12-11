import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ComponentProps } from "react";
import { pageURLs } from "../../lib/pageURLGen";

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
  td: ({ className: _, ...props }) => {
    return <td className={`${tableShared}`} {...props}></td>;
  },
  tr: ({ ...props }) => {
    return <tr {...props}></tr>;
  },
  th: ({ className: _, ...props }) => {
    return <th className={`${tableShared} bg-emerald-700/90`} {...props}></th>;
  },
  h1: ({ className: _, ...props }) => {
    return <h1 className="text-2xl font-bold text-white" {...props}></h1>;
  },
  h2: ({ className: _, ...props }) => {
    return <h2 className="text-xl font-semibold text-white/90" {...props}></h2>;
  },
  h3: ({ className: _, ...props }) => {
    return (
      <h3
        className="text-lg font-semibold text-white/70 underline"
        {...props}
      ></h3>
    );
  },
  h4: ({ className: _, ...props }) => {
    return (
      <h4
        className="text-base font-medium text-white/70 underline"
        {...props}
      ></h4>
    );
  },
  h5: ({ className: _, ...props }) => {
    return (
      <h5
        className="text-base font-medium text-white/70 underline"
        {...props}
      ></h5>
    );
  },
  h6: ({ className: _, ...props }) => {
    return (
      <h6
        className="text-base font-medium text-white/70 underline"
        {...props}
      ></h6>
    );
  },
  hr: ({ className: _, ...props }) => {
    return <hr className="h-[1px] border-0 bg-slate-400/20 my-8" {...props} />;
  },
  a: ({ ref: _, href, className: __, ...props }) => {
    return (
      <Link
        className="text-cyan-300/80 hover:text-cyan-300 transition duration-100"
        href={href || pageURLs.notFound()}
        {...props}
      ></Link>
    );
  },
  em: ({ className: _, ...props }) => {
    return <em {...props}></em>;
  },
  i: ({ className: _, ...props }) => {
    return <i {...props}></i>;
  },
  strong: ({ className: _, ...props }) => {
    return <strong className="text-white" {...props}></strong>;
  },
  ul: ({ className: _, ...props }) => {
    return <ul className="list-disc list-inside pl-[3px]" {...props}></ul>;
  },
  ol: ({ className: _, ...props }) => {
    return <ol className="list-decimal list-inside" {...props}></ol>;
  },
  li: ({ className: _, ...props }) => {
    return <li {...props} className="pl-3 text-white/80"></li>;
  },
  u: ({ className: _, ...props }) => {
    return <u {...props}></u>;
  },
  blockquote: () => {
    return <></>;
  },
  p: ({ ...props }) => {
    return <p {...props} className="my-4 text-white/70"></p>;
  },
};
