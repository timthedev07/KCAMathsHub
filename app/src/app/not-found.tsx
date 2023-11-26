"use client";

import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound: NextPage = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-10 justify-center items-center pt-24 text-center">
      <h1 className="text-red-400 font-bold text-8xl">404</h1>
      <h4 className="text-red-200/80 text-lg font-semibold">Page not Found</h4>
      <div className="w-full flex justify-center items-center gap-10">
        <button
          onClick={() => {
            router.back();
          }}
        >
          Previous
        </button>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
