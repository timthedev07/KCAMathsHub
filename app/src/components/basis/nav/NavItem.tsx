"use client";

import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { searchParamsEntriesToObj } from "../../../lib/searchParamsEntriesToObj";

interface NavItemProps {
  url: Url;
  text: string;
}

export const NavItem: FC<NavItemProps> = ({ text, url }) => {
  const { entries } = useSearchParams();

  const _ = searchParamsEntriesToObj(entries());
  let v = _;
  if ("y" in _) {
    const { y: __, ...rest } = _;
    v = rest;
  }

  return (
    <li className="hidden md:flex justify-center items-center text-center uppercase transition duration-200 text-white/60 hover:text-white/90">
      <Link
        href={
          typeof url === "string"
            ? url
            : {
                ...url,
                query: {
                  ...v,
                  ...(typeof url.query === "string" ? {} : url.query),
                },
              }
        }
      >
        {text}
      </Link>
    </li>
  );
};
