import { Spinner } from "flowbite-react";
import { FC } from "react";

interface LoadingSpinProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const LoadingSpin: FC<LoadingSpinProps> = ({ size = "md" }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size={size} />
    </div>
  );
};
