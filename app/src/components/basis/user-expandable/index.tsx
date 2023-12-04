"use client";
import { Avatar } from "flowbite-react";
import { Session } from "next-auth";
import { Dispatch, FC, SetStateAction } from "react";
import { BadgesDisplay } from "../../user-profile/BadgesDisplay";
import { signOut } from "next-auth/react";
import { Button } from "../../reusable/Button";

interface UserExpandableProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  user: Session["user"];
}

export const UserExpandable: FC<UserExpandableProps> = ({
  setIsOpen,
  user,
}) => {
  return (
    <div>
      {/* in nextjs, use this instead of <img>
      https://nextjs.org/docs/app/building-your-application/optimizing/images
      */}
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="absolute left-0 top-0 w-[2400px] h-[10000px]"
      ></div>
      <div className="fixed right-4 top-20 max-w-[368px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-10 px-8">
        <div className="flex flex-col gap-2 items-center pb-10">
          <Avatar img={user.image || undefined} size="30px" rounded />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white font-mono">
            {user.username}
          </h5>
          <BadgesDisplay center roles={user.roles} />
          <div className="flex mt-4 md:mt-6 gap-4">
            <Button>
              <a href="/user/profile">Profile</a>
            </Button>
            <Button
              onClick={async () => {
                await signOut();
              }}
              color="yellow"
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
