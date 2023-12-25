import type { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingSpinProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap: Record<Required<LoadingSpinProps>["size"], string> = {
  xl: "w-16 h-16",
  lg: "w-12 h-12",
  md: "w-8 h-8",
  sm: "w-6 h-6",
};

const Component: FC<LoadingSpinProps> = ({ size = "md", className = "" }) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${className}`}
    >
      <AiOutlineLoading
        className={`${sizeMap[size]} text-blue-600/80 animate-spin`}
      />
    </div>
  );
};

export default Component;
