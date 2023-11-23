"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";

interface UserExpandableProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  user: Session["user"];
}

export const UserExpandable: FC<UserExpandableProps> = ({
  isOpen,
  setIsOpen,
  user,
}) => {
  return (
    <div>
      {/* in nextjs, use this instead of <img>
      https://nextjs.org/docs/app/building-your-application/optimizing/images
      */}
      <Image src={user.image || ""} alt="" width={32} height={32} />
    </div>
  );
};
