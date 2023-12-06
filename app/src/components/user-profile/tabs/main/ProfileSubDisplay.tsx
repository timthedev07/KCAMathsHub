import { FC, PropsWithChildren } from "react";
import { viewPanelBase } from "..";

export const ProfileSubDisplay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={`${viewPanelBase} overflow-hidden overflow-y-scroll lg:flex-1 w-full h-[486px] lg:h-1/2`}
    >
      {children}
    </div>
  );
};
