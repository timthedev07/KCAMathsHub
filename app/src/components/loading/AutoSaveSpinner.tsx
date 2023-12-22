import { FC } from "react";
import { TbReload } from "react-icons/tb";

interface AutoSaveSpinnerProps {}

export const AutoSaveSpinner: FC<AutoSaveSpinnerProps> = ({}) => {
  return (
    <div className="w-full h-full justify-center items-center">
      <TbReload className="w-6 h-6 animate-[spin_600ms_linear_infinite] text-green-500/70 font-bold" />
    </div>
  );
};
