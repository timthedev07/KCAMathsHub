import { FC, PropsWithChildren } from "react";
import { viewPanelBase } from "..";

export const ProfileSubDisplay: FC<PropsWithChildren> = ({ children }) => {
  return <div className={`${viewPanelBase} flex-1 h-1/2`}>{children}</div>;
};
