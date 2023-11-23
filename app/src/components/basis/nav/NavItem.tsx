import Link from "next/link";
import { FC } from "react";

interface NavItemProps {
  url: string;
  text: string;
}

export const NavItem: FC<NavItemProps> = ({ text, url }) => {
  return (
    <li className="flex justify-center items-center text-center">
      <Link href={url}>{text}</Link>
    </li>
  );
};
