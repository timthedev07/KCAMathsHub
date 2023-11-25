import { Dispatch, FC, SetStateAction } from "react";
import { Item } from "./Item";
import { HomeSVG } from "../../../svgs/sidebar/Home";
import { AccountSVG } from "../../../svgs/sidebar/Account";
import { signOut } from "next-auth/react";
import { LogoutSVG } from "../../../svgs/sidebar/Logout";

interface SidebarProps {
  open: boolean;
  bg: string;
  transDuration: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SideBar: FC<SidebarProps> = ({
  open,
  bg,
  transDuration,
  setOpen,
}) => {
  return (
    <>
      <aside
        className={`transition ${transDuration} ${bg} ${
          open
            ? "translate-x-0 ease-out opacity-100"
            : "-translate-x-full ease-in opacity-0"
        } px-5 py-8 overflow-hidden row-start-2 row-end-3 col-start-1 lg:col-end-3 xmd:col-end-4 col-end-6 overflow-y-auto z-20 border-r-2 border-r-slate-600/50`}
      >
        <ul
          className={`transition ${transDuration} ${
            open ? "blur-none" : "blur-sm"
          } flex flex-col gap-4`}
        >
          <Item action="/" text="Home" Icon={HomeSVG} />
          <Item action="/account" text="Account" Icon={AccountSVG} />
          <hr className="opacity-50 bg-slate-600 border-slate-600" />
          <Item
            action={async () => {
              await signOut();
            }}
            text="Log out"
            Icon={LogoutSVG}
          />
        </ul>
      </aside>
      <div
        className={`z-10 bg-black/60 transition-opacity duration-300 w-screen h-screen absolute top-0 left-0 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setOpen(false);
        }}
      ></div>
    </>
  );
};
