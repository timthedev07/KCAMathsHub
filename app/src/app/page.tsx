"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="p-64">
      <button
        onClick={() => {
          signIn("google");
        }}
        className="px-4 py-2 flex justify-center text-black items-center font-bold rounded-md bg-slate-300"
      >
        SIGN IN
      </button>
    </div>
  );
}
