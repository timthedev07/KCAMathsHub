"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { Button } from "../../components/reusable/Button";

interface ContentProps {}

export const Content: FC<ContentProps> = ({}) => {
  const { get } = useSearchParams();
  const { back, push } = useRouter();

  const err = get("err") || "Unknown error...";
  return (
    <>
      <p className="text-red-400/80 font-medium">{err}</p>
      <div className="flex justify-between w-full max-w-[300px]">
        <Button
          onClick={() => {
            back();
          }}
        >
          Go back
        </Button>
        <Button
          onClick={() => {
            push("/");
          }}
        >
          Home
        </Button>
      </div>
    </>
  );
};
