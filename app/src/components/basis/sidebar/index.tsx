import { FC } from "react";

interface SidebarProps {
  open: boolean;
  bg: string;
  transDuration: string;
}

export const SideBar: FC<SidebarProps> = ({ open, bg, transDuration }) => {
  return (
    <aside
      className={`transition ${transDuration} ${bg} ${
        open
          ? "translate-x-0 ease-out opacity-100"
          : "-translate-x-full ease-in opacity-0"
      } px-8 py-8 overflow-hidden row-start-2 row-end-3 col-start-1 col-end-3 overflow-y-auto z-10 scrollbar-in-light-bg`}
    >
      <ul
        className={`transition ${transDuration} ${
          open ? "blur-none" : "blur-sm"
        }`}
      >
        {Array.from(Array(10).keys()).map((each) => {
          return <li key={each}>SCROLL ME</li>;
        })}
      </ul>
    </aside>
  );
};
