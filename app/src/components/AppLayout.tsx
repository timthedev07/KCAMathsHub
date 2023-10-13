"use client";

import { FC, ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-desktop overflow-hidden h-screen w-full">
      <nav className="row-start-1 row-end-2 col-span-full bg-primary-accent-bg sticky top-0">
        HEy
      </nav>
      <aside className="row-start-2 row-end-3 col-start-1 col-end-4 bg-tertiary-accent-bg overflow-y-auto z-10">
        {Array.from(Array(100).keys()).map((each) => {
          return <div key={each}>SCROLL ME</div>;
        })}
      </aside>
      <div className="row-start-2 row-end-3 col-span-full overflow-y-auto">
        <main>{children}</main>
        <footer className="bg-secondary-accent-bg h-96"></footer>
      </div>
    </div>
  );
};
