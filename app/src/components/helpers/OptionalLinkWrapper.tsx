import Link from "next/link";
import { FC, PropsWithChildren } from "react";

export const OptionalLinkWrapper: FC<
  PropsWithChildren<{ hasLink: boolean; href: string }>
> = ({ children, hasLink, href }) => {
  return hasLink ? (
    <Link prefetch={false} href={href}>
      {children}
    </Link>
  ) : (
    children
  );
};
