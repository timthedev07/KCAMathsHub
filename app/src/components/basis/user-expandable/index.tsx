"use client";
import { Session } from "next-auth";
import { Dispatch, FC, SetStateAction } from "react";
import { BadgesDisplay } from "../../user-profile/BadgesDisplay";
import { signOut } from "next-auth/react";
import { Button } from "../../reusable/Button";
import { ProfileImgDisplay } from "../../ProfileImgDisplay";

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
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="absolute left-0 top-0 w-full h-screen z-20"
      ></div>
      <div className="fixed right-4 top-20 shadow-2xl w-72 border rounded-lg shadow bg-[#12141a] border-gray-700/30 pt-10 px-8">
        <div className="flex flex-col gap-3 items-center pb-10">
          {/* <Avatar img={user.image || undefined} size="30px" rounded /> */}
          <ProfileImgDisplay src={user.image} className="w-20 h-20" />
          <h5 className="mb-1 text-lg  text-white/80 font-mono">
            {user.username}
          </h5>
          <BadgesDisplay center roles={user.roles} />
          <div className="flex mt-6 gap-4">
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
