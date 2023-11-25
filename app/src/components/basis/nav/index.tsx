import { FC } from "react";
import { Hamburger } from "../../../svgs/sidebar/Hamburger";
import { SignInButton } from "../../SignInButton";
import { ConditionalProfilePic } from "./ConditionalProfilePic";
import { Session } from "next-auth";

interface NavProps {
  className?: string;
  onHomeClick?: Function;
  bg: string;
  sidebarOpen: boolean;
  transDuration: string;
  session: Session | null;
}

export const Nav: FC<NavProps> = ({
  className,
  bg,
  onHomeClick,
  sidebarOpen,
  transDuration,
  session,
}) => {
  const u = session?.user;
  return (
    <nav className={`${bg} ${className || ""} relative z-20`}>
      <div className="flex items-center justify-start gap-8 px-8 h-full">
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
        <div className="ml-auto">
          {u!! ? (
            <ConditionalProfilePic user={u} />
          ) : (
            <SignInButton signedIn={false} />
          )}
        </div>
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
