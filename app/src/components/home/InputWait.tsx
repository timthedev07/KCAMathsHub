import { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface InputWaitProps {
  className?: string;
}

export const InputWait: FC<InputWaitProps> = ({ className }) => {
  return (
    <AiOutlineLoading
      className={
        "animate-[spin_0.6s_ease-in-out_infinite] text-cyan-500 " + className
      }
    />
  );
};
