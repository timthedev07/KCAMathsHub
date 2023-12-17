import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Dispatch, FC, SetStateAction } from "react";
import { AccountSVG } from "../../../svgs/sidebar/Account";
import { AskSVG } from "../../../svgs/sidebar/Ask";
import { HomeSVG } from "../../../svgs/sidebar/Home";
import { JoinSVG } from "../../../svgs/sidebar/Join";
import { LoginSVG } from "../../../svgs/sidebar/Login";
import { LogoutSVG } from "../../../svgs/sidebar/Logout";
import { Item } from "./Item";

interface SidebarProps {
  open: boolean;
  bg: string;
  transDuration: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
}

const SidebarSep = () => {
  return <hr className="opacity-50 bg-slate-600 border-slate-600" />;
};

export const SideBar: FC<SidebarProps> = ({
  open,
  bg,
  transDuration,
  setOpen,
  session,
}) => {
  const loggedIn = !!session?.user;
  return (
    <>
      <aside
        className={`transition ${transDuration} ${bg} ${
          open
            ? "translate-x-0 ease-out opacity-100"
            : "-translate-x-full ease-in opacity-0"
        } px-5 py-8 overflow-hidden row-start-2 row-end-3 col-start-1 xl:col-end-3 lg:col-end-4 xmd:col-end-4 col-end-8 overflow-y-auto z-20 border-r border-r-slate-600/20`}
      >
        <ul
          className={`transition ${transDuration} ${
            open ? "blur-none" : "blur-sm"
          } flex flex-col gap-4`}
        >
          <Item setOpen={setOpen} action="/" text="Home" Icon={HomeSVG} />
          <Item
            setOpen={setOpen}
            action="/user/profile"
            text="Account"
            Icon={AccountSVG}
          />
          <Item
            setOpen={setOpen}
            action="/questions/ask"
            text="Ask question"
            Icon={AskSVG}
          />
          <Item
            setOpen={setOpen}
            action="https://forms.gle/BdoFRQmFPEbjunpb9"
            text="Join our team"
            Icon={JoinSVG}
          />
          <SidebarSep />
          <Item
            setOpen={setOpen}
            action={async () => {
              if (loggedIn) {
                await signOut();
              } else {
                await signIn();
              }
            }}
            text={loggedIn ? "Sign out" : "Sign in"}
            Icon={loggedIn ? LogoutSVG : LoginSVG}
          />
        </ul>
      </aside>
      <div
        className={`z-10 bg-black/80 transition-opacity duration-300 w-full h-screen absolute top-0 left-0 ${
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
