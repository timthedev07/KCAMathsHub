"use client";
import { Avatar } from "flowbite-react";
import { Session } from "next-auth";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, use } from "react";

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
      <div  
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="absolute left-0 top-0 w-[2400px] h-[10000px]">
      </div>
      <div className="fixed right-[4%] top-20 w-[250px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-5">
        <div className="flex flex-col items-center pb-10">
          <Avatar img={user.image || undefined} size="30px" className="mb-5" rounded/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.username.length > 20 ? "Star Kolya" : user.username}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user.roles}</span>
          <div className="flex mt-4 md:mt-6">
          <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-3"><a href="/user/profile">Profile</a></button>
          <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};
