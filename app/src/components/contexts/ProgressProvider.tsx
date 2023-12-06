// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { FC, PropsWithChildren } from "react";

export const PageProgressBarProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#0ea5e9"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
