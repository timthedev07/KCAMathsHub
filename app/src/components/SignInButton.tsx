"use client";
import { signIn, signOut } from "next-auth/react";
import { FC } from "react";

interface SignInButtonProps {
  signedIn: boolean;
}

export const SignInButton: FC<SignInButtonProps> = ({ signedIn }) => {
  return (
    <button
      onClick={() => {
        if (signedIn) signOut();
        else signIn("google");
      }}
      className="px-4 py-2 flex justify-center text-black items-center font-bold rounded-md bg-slate-300"
    >
      Sign {signedIn ? "out" : "in"}
    </button>
  );
};
