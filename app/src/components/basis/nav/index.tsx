import { FC } from "react";
import { HomeSVG } from "../../../svgs/sidebar/Home";

interface NavProps {
  className?: string;
  onHomeClick?: Function;
}

export const Nav: FC<NavProps> = ({ className, onHomeClick }) => {
  return (
    <nav
      className={`flex items-center justify-start gap-8 px-8 bg-primary-accent-bg py-4 ${
        className || ""
      }`}
    >
      <button
        onClick={() => {
          if (onHomeClick) onHomeClick();
        }}
        className="w-9 h-9 flex justify-center items-center bg-tertiary-accent-bg rounded-md"
      >
        <HomeSVG className="w-6 h-6 cursor-pointer" />
      </button>
    </nav>
  );
};
