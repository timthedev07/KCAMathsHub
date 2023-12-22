import { Spinner } from "flowbite-react";
import { FC } from "react";

interface LoadingSpinProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const LoadingSpin: FC<LoadingSpinProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${className}`}
    >
      <Spinner size={size} />
    </div>
  );
};
