import { Spinner } from "flowbite-react";
import type { FC } from "react";

interface LoadingSpinProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Component: FC<LoadingSpinProps> = ({ size = "md", className = "" }) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${className}`}
    >
      <Spinner size={size} />
    </div>
  );
};

export default Component;
