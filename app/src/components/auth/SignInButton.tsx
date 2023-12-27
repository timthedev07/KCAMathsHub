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
      className="font-bold"
    >
      Sign {signedIn ? "out" : "in"}
    </div>
  );
};
