"use client";
import { FC } from "react";
import { LoadingSpin } from "./LoadingSpin";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: FC<LoadingOverlayProps> = ({ isLoading }) => {
  return (
    <div
      className={`transition justify-center items-center p-0 m-0 duration-300 w-full h-screen top-0 left-0 fixed bg-black/80 ${
        isLoading ? "z-20 opacity-100 flex" : "-z-20 opacity-0 none"
      }`}
    >
      <LoadingSpin size="xl" />
    </div>
  );
};
