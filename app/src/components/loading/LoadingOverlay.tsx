"use client";
import { FC } from "react";
import { LoadingSpin } from "./loading-spin";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay: FC<LoadingOverlayProps> = ({
  isLoading,
  message,
}) => {
  return (
    <div
      className={`transition justify-center items-center p-0 m-0 duration-300 w-full h-screen top-0 left-0 fixed bg-black/80 ${
        isLoading ? "z-20 opacity-100 flex flex-col" : "-z-20 opacity-0 none"
      }`}
    >
      <div className="h-32">
        <LoadingSpin size="xl" />
      </div>
      {message ? (
        <span className="mt-6 font-medium text-white/70 text-center">
          {message}
        </span>
      ) : null}
    </div>
  );
};
