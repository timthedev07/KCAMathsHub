import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { Hamburger } from "../../../svgs/sidebar/Hamburger";
import { StudentStages } from "../../../types/StudentStage";
import { SignInButton } from "../../auth/SignInButton";
import { ConditionalProfilePic } from "./ConditionalProfilePic";
import { NavItem } from "./NavItem";

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
      <div className="flex items-center justify-start gap-6 px-8 h-full">
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
        <div className="flex xl:w-4/12 lg:5/12 w-8/12 md:justify-between justify-evenly">
          <Link href={{ pathname: "/" }}>
            <h2 className="md:block hidden text-lg font-semibold">
              KCAMathsHub
            </h2>
          </Link>
          {StudentStages.toReversed().map((each) => (
            <NavItem
              key={each}
              text={each}
              url={{ pathname: "/", query: { k: each } }}
            />
          ))}
        </div>
        <div className="ml-auto">
          {!!u ? (
            <ConditionalProfilePic user={u} />
          ) : (
            <SignInButton signedIn={false} />
          )}
        </div>
      </div>

      <div
        className={`transition-[width] ${transDuration} ${
          sidebarOpen
            ? "w-[calc(41.6667%+1px)] xmd:w-[calc(75%+1px)] lg:w-[calc(75%+1px)] xl:w-[calc(83.333333%+1px)]"
            : "w-full"
        } absolute bottom-0 right-0 border-b border-b-slate-600/20`}
      ></div>
    </nav>
  );
};
