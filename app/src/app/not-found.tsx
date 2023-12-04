"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../components/reusable/Button";
import { NextPage } from "../types/nextpage";

const NotFound: NextPage = () => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-black to-[#130F40] to-50% w-full h-[90vh] flex flex-col gap-10 justify-center items-center pt-24 text-center">
      <h1 className="text-red-400 font-bold text-8xl font-mono">404</h1>
      <h4 className="text-red-200/80 text-lg font-semibold">Page not Found</h4>
      <div className="w-full flex justify-center items-center gap-10">
        <Button
          onClick={() => {
            router.back();
          }}
          gradientDuoTone="purpleToBlue"
        >
          Previous
        </Button>
        <Link href="/" passHref>
          <Button gradientDuoTone="greenToBlue">Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
