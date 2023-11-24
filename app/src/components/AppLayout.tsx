"use client";

import { FC, ReactNode, useState } from "react";
import { Nav } from "./basis/nav";
import { SideBar } from "./basis/sidebar";
import { Session } from "next-auth";
import { Footer } from "./basis/footer";

interface AppLayoutProps {
  children: ReactNode;
  session: Session | null;
}

const barsBG = "bg-primary-accent-bg";
const barTransDuration = "duration-300";

export const AppLayout: FC<AppLayoutProps> = ({ children, session }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-12 grid-rows-desktop overflow-hidden h-screen w-full">
      <Nav
        session={session}
        transDuration={barTransDuration}
        sidebarOpen={sidebarOpen}
        bg={barsBG}
        onHomeClick={() => setSidebarOpen((prev) => !prev)}
        className={`row-start-1 row-end-2 col-span-full sticky top-0`}
      />
      <SideBar
        transDuration={barTransDuration}
        bg={barsBG}
        open={sidebarOpen}
      />
      <div className="row-start-2 row-end-3 col-span-full overflow-y-auto">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};
