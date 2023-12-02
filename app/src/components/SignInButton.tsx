"use client";
import { signIn, signOut } from "next-auth/react";
import { FC } from "react";
import { Button } from "./reusable/Button";

interface SignInButtonProps {
  signedIn: boolean;
}

export const SignInButton: FC<SignInButtonProps> = ({ signedIn }) => {
  return (
    <Button
      onClick={() => {
        if (signedIn) signOut();
        else signIn("google");
      }}
      color="blue"
      className="font-bold"
    >
      Sign {signedIn ? "out" : "in"}
    </Button>
  );
};
