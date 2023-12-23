import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { FC } from "react";

interface NavItemProps {
  url: Url;
  text: string;
}

export const NavItem: FC<NavItemProps> = ({ text, url }) => {
  return (
    <li className="flex justify-center items-center text-center uppercase transition duration-200 text-white/60 hover:text-white/90">
      <Link href={url}>{text}</Link>
    </li>
  );
};
