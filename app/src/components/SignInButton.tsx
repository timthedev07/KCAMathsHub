"use client";
import { Button } from "flowbite-react";
import { signIn, signOut } from "next-auth/react";
import { FC } from "react";

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
