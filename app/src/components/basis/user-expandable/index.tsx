"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Dispatch, FC, SetStateAction } from "react";
import { Coin } from "../../helpers/Coin";
import { ProfileImgDisplay } from "../../image/ProfileImgDisplay";
import { Button } from "../../reusable/Button";
import { BadgesDisplay } from "../../user-profile/BadgesDisplay";

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
      <div className="fixed z-30 right-4 top-20 shadow-2xl w-72 border rounded-lg shadow bg-[#12141a] border-gray-700/30 pt-10 px-8">
        <div className="flex flex-col gap-3 items-center pb-10">
          {/* <Avatar img={user.image || undefined} size="30px" rounded /> */}
          <ProfileImgDisplay src={user.image} className="w-20 h-20" />
          <h5 className="mb-1 text-lg  text-white/80 font-mono">
            {user.username}
          </h5>
          <div className="flex gap-2 text-white/70 items-center mb-2 text">
            <Coin width={24} height={24} />
            {user.credits}
          </div>
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
