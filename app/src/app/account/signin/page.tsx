"use client";

import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { OAuthButton } from "react-auth-provider-buttons";

const SignIn: NextPage = () => {
  return (
    <>
      <OAuthButton
        provider="google"
        onClick={() => {
          signIn("google");
        }}
      />
    </>
  );
};

export default SignIn;
