"use client";
import { signIn, signOut } from "next-auth/react";
import { FC } from "react";

interface SignInButtonProps {
  signedIn: boolean;
}

export const SignInButton: FC<SignInButtonProps> = ({ signedIn }) => {
  return (
    <div
      onClick={() => {
        if (signedIn) signOut();
        else signIn();
      }}
      className="font-bold md:text-sm md:min-w-auto transtion duration-200 text-md hover:bg-slate-400/10 border border-transparent hover:border-slate-400/20 rounded-lg cursor-pointer px-4 py-1.5"
    >
      Sign {signedIn ? "out" : "in"}
    </div>
  );
};
