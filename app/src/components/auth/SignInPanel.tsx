"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { HOST } from "../../lib/hostAddr";
import { GoogleSVG } from "../../svgs/Google";
import { LogoSVG } from "../helpers/Logo";

interface SignInPanelProps {
  r?: string | null; // from /user/signin/[r]
}

export const SignInPanel: FC<SignInPanelProps> = ({ r }) => {
  return (
    <div className="w-10/12 md:w-[356px] px-12 min-h-[456px] shadow-lg bg-neutral-900 rounded-lg flex flex-col justify-evenly items-center gap-8 py-8">
      <div className="rounded-full bg-neutral-950 shadow-xl overflow-hidden flex justify-center items-center w-24 h-24">
        <LogoSVG className="w-9/12 h-9/12 mb-2" />
      </div>
      <h1 className="font-bold text-xl text-center">
        Login with school account
      </h1>
      {r && (
        <span className="text-sm text-center text-white/80">
          Join with a 50+ credit head start!
        </span>
      )}
      <button
        className="flex rounded-full bg-neutral-600/30 border border-slate-500/30 pl-2 pr-4 items-center"
        onClick={async () => {
          if (r)
            await signIn("google", {
              callbackUrl: `${HOST}/api/accept-referral?r=${r}`,
            });
          else await signIn("google");
        }}
      >
        <GoogleSVG className="w-10 h-10" /> Sign in with Google
      </button>
      <hr className="w-9/12 border-0 h-[1px] bg-neutral-300/20" />
      <span className="text-xs text-neutral-100/40 leading-loose">
        By logging in, you agree with our{" "}
        <Link className="underline" href="/terms-and-conditions">
          terms and conditions
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/privacy-policies">
          privacy policies
        </Link>
        .
      </span>
    </div>
  );
};
