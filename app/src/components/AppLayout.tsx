"use client";

import { FC, ReactNode, useState } from "react";
import { Footer } from "./basis/footer";
import { Nav } from "./basis/nav";
import { SideBar } from "./basis/sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const barsBG = "bg-primary-bg";
const barTransDuration = "duration-300";

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-12 grid-rows-desktop overflow-hidden overflow-x-scroll h-screen w-full">
      <Nav
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
        setOpen={setSidebarOpen}
      />
      <div className="min-w-[570px] overflow-x-auto row-start-2 row-end-3 col-span-full overflow-y-auto">
        <main className="min-h-[90vh]">{children}</main>
        <Footer />
      </div>
    </div>
  );
};
