import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const hrClassName = "border-0 h-[1px] bg-slate-400/20";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ className = "", ...props }) => {
      return (
        <>
          <h1 className={`${className} mb-2 text-4xl font-bold`} {...props} />
          <hr className={hrClassName} />
        </>
      );
    },
    h2: ({ className = "", ...props }) => {
      return (
        <h2
          className={`${className} text-3xl font-semibold text-white/80`}
          {...props}
        />
      );
    },
    h3: ({ className = "", ...props }) => {
      return (
        <h3
          className={`${className} text-2xl font-semibold text-white/[0.75]`}
          {...props}
        />
      );
    },
    h4: ({ className = "", ...props }) => {
      return (
        <h4
          className={`${className} text-xl font-semibold text-white/[0.75]`}
          {...props}
        />
      );
    },
    h5: ({ className = "", ...props }) => {
      return (
        <h5
          className={`${className} text-lg font-semibold text-white/[0.75]`}
          {...props}
        />
      );
    },
    h6: ({ className = "", ...props }) => {
      return (
        <h6
          className={`${className} text-lg font-semibold text-white/[0.75]`}
          {...props}
        />
      );
    },
    a: ({ className = "", href = "", ref: _, ...props }) => {
      return <Link href={href} className={`${className}`} {...props} />;
    },
    ul: ({ className = "", ...props }) => {
      return <ul className={`${className}`} {...props} />;
    },
    ol: ({ className = "", ...props }) => {
      return <ol className={`${className}`} {...props} />;
    },
    p: ({ className = "", ...props }) => {
      return <p className={`${className} text-white/70`} {...props} />;
    },
    li: ({ className = "", ...props }) => {
      return <li className={`${className} text-white/70`} {...props} />;
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
