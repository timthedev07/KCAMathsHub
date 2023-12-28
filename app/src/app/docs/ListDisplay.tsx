"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { capitalize } from "../../lib/capitalize";

const sidebarItem = "border-l border-slate-400/40 pl-5 py-2 text-sm";

export const ListDisplay: FC<{
  slugs: { category: string; pages: string[] }[];
}> = ({ slugs }) => {
  const p = usePathname();
  const curr = p.split("/").at(-1)!;

  return slugs.map((categoryPages, ind) => (
    <section key={ind} className="mt-8">
      <h3 className="font-semibold text-lg mb-2">
        {capitalize(categoryPages.category)}
      </h3>
      <ul className="list-inside flex flex-col h-full">
        {ind === 0 && (
          <Link href={`/docs/`} passHref>
            <li
              className={
                sidebarItem +
                ` ${
                  curr === "docs"
                    ? "font-medium text-cyan-400"
                    : "text-white/80"
                }`
              }
            >
              Welcome
            </li>
          </Link>
        )}

        {categoryPages.pages.map((each) => (
          <Link href={`/docs/${each}`} passHref key={each}>
            <li
              className={
                sidebarItem +
                ` ${
                  curr === each ? "font-medium text-cyan-500" : "text-white/80"
                }`
              }
            >
              {capitalize(each).replaceAll("-", " ")}
            </li>
          </Link>
        ))}
      </ul>
    </section>
  ));
};
