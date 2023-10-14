import { FC } from "react";
import { HomeSVG } from "../../../svgs/sidebar/Home";
import { Hamburger } from "../../../svgs/sidebar/Hamburger";

interface NavProps {
  className?: string;
  onHomeClick?: Function;
  bg: string;
  sidebarOpen: boolean;
  transDuration: string;
}

export const Nav: FC<NavProps> = ({
  className,
  bg,
  onHomeClick,
  sidebarOpen,
  transDuration,
}) => {
  return (
    <nav className={`${bg} py-4 ${className || ""} relative`}>
      <div className="flex items-center justify-start gap-8 px-8">
        <button
          onClick={() => {
            if (onHomeClick) onHomeClick();
          }}
          className="w-9 h-9 flex justify-center group items-center bg-tertiary-accent-bg rounded-md"
        >
          <Hamburger
            className={`${
              sidebarOpen ? "rotate-180" : ""
            } transition duration-300 fill-neutral-200 group-hover:fill-white w-5 h-5 cursor-pointer`}
          />
        </button>
      </div>

      <div
        className={`transition-[width] ${transDuration} ${
          sidebarOpen
            ? "w-[calc(58.333333%+2px)] xmd:w-[calc(75%+2px)] lg:w-[calc(83.333333%+2px)]"
            : "w-full"
        } absolute bottom-0 right-0 border-b-2 border-b-slate-600/50`}
      ></div>
    </nav>
  );
};
