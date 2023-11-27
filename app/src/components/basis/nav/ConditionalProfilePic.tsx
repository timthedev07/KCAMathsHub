import { Session } from "next-auth";
import { FC, useState } from "react";
import { UserExpandable } from "../user-expandable";
import Image from "next/image";

interface ConditionalProfilePicProps {
  user: Session["user"];
}

export const ConditionalProfilePic: FC<ConditionalProfilePicProps> = ({
  user,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center">
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="cursor-pointer h-12 w-12 rounded-full transition duration-200 bg-opacity-30 hover:bg-opacity-60 bg-slate-500 flex justify-center items-center"
      >
        <div className="relative w-10 h-10">
          <Image
            fill
            src={user.image || ""}
            className="rounded-full select-none"
            alt="profile image"
          />
        </div>
      </div>
      {isOpen && (
        <UserExpandable user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};
