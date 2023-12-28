import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const hrClassName = "border-0 h-[1px] bg-slate-400/20";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ className = "", ...props }) => {
      return (
        <div>
          <h1 className={`${className} mb-2 text-4xl font-bold`} {...props} />
          <hr className={hrClassName + " mt-4"} />
        </div>
      );
    },
    h2: ({ className = "", ...props }) => {
      return (
        <div className="mt-16">
          <h2
            className={`${className} text-3xl font-semibold text-white/90`}
            {...props}
          />
          <hr className={hrClassName + " mt-2"} />
        </div>
      );
    },
    h3: ({ className = "", ...props }) => {
      return (
        <h3
          className={`${className} text-2xl font-semibold text-white/80 mt-12`}
          {...props}
        />
      );
    },
    h4: ({ className = "", ...props }) => {
      return (
        <h4
          className={`${className} text-xl font-semibold text-white/80`}
          {...props}
        />
      );
    },
    h5: ({ className = "", ...props }) => {
      return (
        <h5
          className={`${className} text-lg font-semibold text-white/80`}
          {...props}
        />
      );
    },
    h6: ({ className = "", ...props }) => {
      return (
        <h6
          className={`${className} text-lg font-semibold text-white/80`}
          {...props}
        />
      );
    },
    a: ({ className = "", href = "", ref: _, ...props }) => {
      return (
        <Link
          href={href}
          className={`${className} text-blue-500 underline underline-offset-[3px]`}
          {...props}
        />
      );
    },
    ul: ({ className = "", ...props }) => {
      return <ul className={`${className} list-disc list-inside`} {...props} />;
    },
    ol: ({ className = "", ...props }) => {
      return <ol className={`${className}`} {...props} />;
    },
    p: ({ className = "", ...props }) => {
      return <p className={`${className} text-white/70 mt-8`} {...props} />;
    },
    li: ({ className = "", ...props }) => {
      return (
        <li className={`${className} text-white/70 my-2 pl-4`} {...props} />
      );
    },
    strong: ({ className = "", ...props }) => {
      return <strong className={`${className}`} {...props} />;
    },
    em: ({ className = "", ...props }) => {
      return <em className={`${className}`} {...props} />;
    },
    hr: ({ className = "", ...props }) => {
      return <hr className={`${className} ${hrClassName}`} {...props} />;
    },
  };
}
