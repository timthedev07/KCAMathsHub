"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

interface UserExpandableProps {}

export const UserExpandable: FC<UserExpandableProps> = ({}) => {
  const { data } = useSession();

  const user = data?.user!; // we are sure that data?.user has to be nonnull

  return (
    <div>
      {/* in nextjs, use this instead of <img>
      https://nextjs.org/docs/app/building-your-application/optimizing/images
      */}
      <Image src={user.image || ""} alt="" />
    </div>
  );
};
