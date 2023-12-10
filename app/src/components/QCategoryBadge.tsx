import { FC } from "react";
import { RxCross2 } from "react-icons/rx";

interface QCategoryBadgeProps {
  name: string;
  ind: number;
  onDelete?: Function;
}

const colors = [
  "bg-amber-600/80",
  "bg-lime-600/80",
  "bg-cyan-600/80",
  "bg-indigo-600/80",
  "bg-rose-600/80",
];

const hoverColors = [
  "hover:bg-amber-600/70",
  "hover:bg-lime-600/70",
  "hover:bg-cyan-600/70",
  "hover:bg-indigo-600/70",
  "hover:bg-rose-600/70",
];

export const QCategoryBadge: FC<QCategoryBadgeProps> = ({
  name,
  ind,
  onDelete,
}) => {
  return !onDelete ? (
    <span
      className={`rounded-lg text-xs text-white/80 px-3 font-semibold flex justify-center items-center h-6 ${
        colors[ind % colors.length]
      }`}
    >
      {name}
    </span>
  ) : (
    <span
      onClick={() => {
        onDelete();
      }}
      className={`transition duration-200 cursor-pointer ${
        hoverColors[ind & colors.length]
      } rounded-lg text-xs text-white/80 px-3 gap-2 font-semibold flex justify-center items-center h-7 ${
        colors[ind % colors.length]
      }`}
    >
      {name}
      <RxCross2 className="w-4 h-4" />
    </span>
  );
};
