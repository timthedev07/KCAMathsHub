"use client";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";

const ErrorPage: NextPage = () => {
  const { get } = useSearchParams();

  const err = get("err") || "Unknown error...";

  return (
    <div className="w-full h-[90vh] flex justify-center items-center flex-col">
      <h1 className="text-2xl text-red-600 font-bold">Blunder...</h1>
      <p className="text-red-600/70 font-medium">{err}</p>
    </div>
  );
};

export default ErrorPage;
