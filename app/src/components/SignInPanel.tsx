"use client";

import { signIn } from "next-auth/react";
import { FC } from "react";
import { OAuthButton } from "react-auth-provider-buttons";
import { HOST } from "../lib/hostAddr";

interface SignInPanelProps {
  r?: string | null; // from /account/signin/[r]
}

export const SignInPanel: FC<SignInPanelProps> = ({ r }) => {
  return (
    <div>
      <OAuthButton
        provider="google"
        onClick={async () => {
          console.log("r", r);
          if (r)
            await signIn("google", {
              callbackUrl: `${HOST}/account/signin/success=true&r=${r}`,
            });
          else await signIn("google");
        }}
      />
    </div>
  );
};
