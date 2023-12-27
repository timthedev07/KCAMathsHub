"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const sidebarItem = "border-l border-slate-400/40 pl-5 py-2";

export const ListDisplay: FC<{ slugs: string[] }> = ({ slugs }) => {
  const p = usePathname();
  const curr = p.split("/").at(-1)!;

  return (
    <>
      <Link href={`/docs/`} passHref>
        <li
          className={
            sidebarItem +
            ` ${curr === "docs" ? "font-medium text-cyan-400" : ""}`
          }
        >
          Welcome
        </li>
      </Link>

      {slugs.map((each) => (
        <Link href={`/docs/${each}`} passHref key={each}>
          <li
            className={
              sidebarItem +
              ` ${curr === each ? "font-medium text-cyan-500" : ""}`
            }
          >
            {(each.charAt(0).toUpperCase() + each.slice(1)).replaceAll(
              "-",
              " "
            )}
          </li>
        </Link>
      ))}
    </>
  );
};
