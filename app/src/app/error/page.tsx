"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../components/reusable/Button";
import { NextPage } from "../../types/nextpage";

const ErrorPage: NextPage = () => {
  const { get } = useSearchParams();
  const { back, push } = useRouter();

  const err = get("err") || "Unknown error...";

  return (
    <div className="w-full h-[90vh] flex justify-center items-center flex-col gap-8">
      <h1 className="text-8xl text-red-400 font-bold">Blunder...</h1>
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
    </div>
  );
};

export default ErrorPage;
