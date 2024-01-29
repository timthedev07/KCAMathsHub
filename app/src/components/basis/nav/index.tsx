"use session";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { TbPencilQuestion } from "react-icons/tb";
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
}

export const Nav: FC<NavProps> = ({
  className,
  bg,
  onHomeClick,
  sidebarOpen,
  transDuration,
}) => {
  const { data: session } = useSession();

  const u = session?.user;

  return (
    <nav className={`${bg} ${className || ""} min-w-[370px] relative z-20`}>
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
        <div className="flex xl:w-4/12 lg:w-5/12 w-6/12 md:justify-start gap-12 justify-evenly">
          <Link href={{ pathname: "/" }}>
            <h2 className="md:block hidden text-lg font-semibold">
              KCAMathsHub
            </h2>
          </Link>
          {StudentStages.slice()
            .reverse()
            .map((each) => (
              <NavItem
                key={each}
                text={each}
                url={{ pathname: "/", query: { k: each } }}
              />
            ))}
        </div>
        <div className="ml-auto flex items-center gap-16">
          {!!u && (
            <Link
              href="/questions/ask"
              className="font-medium gap-2 items-center hidden md:flex"
            >
              Ask Question <TbPencilQuestion className="w-7 h-7" />
            </Link>
          )}
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
