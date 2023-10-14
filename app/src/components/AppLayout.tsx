"use client";

import { FC, ReactNode, useState } from "react";
import { Nav } from "./basis/nav";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-12 grid-rows-desktop overflow-hidden h-screen w-full">
      <Nav
        onHomeClick={() => setSidebarOpen((prev) => !prev)}
        className={`row-start-1 row-end-2 col-span-full sticky top-0`}
      />
      <aside
        className={`transition duration-300 ${
          sidebarOpen
            ? "translate-x-0 ease-out opacity-100"
            : "-translate-x-full ease-in opacity-0"
        } px-8 py-12 overflow-hidden row-start-2 row-end-3 col-start-1 col-end-3 bg-primary-accent-bg overflow-y-auto z-10 scrollbar-in-light-bg`}
      >
        <ul
          className={`transition duration-300 ${
            sidebarOpen ? "blur-none" : "blur-sm"
          }`}
        >
          {Array.from(Array(10).keys()).map((each) => {
            return <li key={each}>SCROLL ME</li>;
          })}
        </ul>
      </aside>
      <div className="row-start-2 row-end-3 col-span-full overflow-y-auto">
        <main>{children}</main>
        <footer className="bg-secondary-accent-bg h-96"></footer>
      </div>
    </div>
  );
};
