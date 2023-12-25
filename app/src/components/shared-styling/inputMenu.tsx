import { Transition } from "@headlessui/react";
import type { FC, PropsWithChildren } from "react";

export const SharedTransition: FC<PropsWithChildren> = ({ children }) => (
  <Transition
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
  >
    {children}
  </Transition>
);

export const getEntryClassName = (
  disabled: boolean = false,
  extraClassName?: string
) =>
  `rounded-xl text-sm bg-neutral-100/[0.05] rounded-md border-slate-400/10 ${extraClassName} ${
    disabled ? "cursor-not-allowed" : ""
  }`;
