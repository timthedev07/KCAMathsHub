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
        else signIn("google");
      }}
      className="font-bold transtion duration-100 hover:bg-sky-500/30 rounded-lg cursor-pointer px-3 py-1"
    >
      Sign {signedIn ? "out" : "in"}
    </div>
  );
};
