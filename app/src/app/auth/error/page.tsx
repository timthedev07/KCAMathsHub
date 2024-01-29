"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 23.6"
    style={{
      overflow: "visible",
    }}
    {...props}
  >
    <path
      d="M13.5 17.6v6l8.5-6z"
      style={{
        fill: "#bf1c1c",
      }}
    />
    <path
      d="m13.5 23.6-3.5-7L32 0 13.5 17.6z"
      style={{
        fill: "#d72828",
      }}
    />
    <path
      d="m24 23.6-10.5-6L32 0zM10 16.6l-10-2L32 0z"
      style={{
        fill: "#ff3939",
      }}
    />
  </svg>
);

const getErrMsg = (error?: string | null) => {
  switch (error) {
    case "Configuration": {
      return "Server error, please contact the developer.";
    }
    case "AccessDenied": {
      return "You can only sign in with your school account (e.g. john.doe@kcpupils.org)";
    }
    case "Verification": {
      return "Session timed out, please sign in again.";
    }
    default: {
      return "Unknown error, please contact the developer.";
    }
  }
};

const ErrorPage: FC = () => {
  const { get } = useSearchParams();
  const { back } = useRouter();
  return (
    <div className="w-full h-[90vh]  flex items-center flex-col gap-8 pt-24">
      <SvgComponent className="w-52" />
      <h1 className="text-center text-white text-5xl font-bold mt-4">
        Problem signing in...
      </h1>
      <p className="text-center text-white/80">{getErrMsg(get("error"))}</p>
      <button
        className="px-5 py-1.5 rounded-lg bg-sky-600 font-medium text-white/90"
        onClick={back}
      >
        Back
      </button>
    </div>
  );
};

export default ErrorPage;
