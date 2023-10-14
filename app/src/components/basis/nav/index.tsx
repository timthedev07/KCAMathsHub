import { FC } from "react";
import { HomeSVG } from "../../../svgs/sidebar/Home";

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
          className="w-9 h-9 flex justify-center items-center bg-tertiary-accent-bg rounded-md"
        >
          <HomeSVG className="w-6 h-6 cursor-pointer" />
        </button>
      </div>

      <div
        className={`transition-[width] ${transDuration} ${
          sidebarOpen ? "w-5/6" : "w-full"
        } absolute bottom-0 right-0 border-b-2 border-b-slate-600/50`}
      ></div>
    </nav>
  );
};
