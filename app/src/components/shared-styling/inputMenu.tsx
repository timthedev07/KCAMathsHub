import { Transition } from "@headlessui/react";
import type { FC, PropsWithChildren } from "react";
import { inputBase } from "../../reusable-vars/Input";

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
  extraClassName = ""
) =>
  `rounded-xl text-left text-sm ${inputBase} border border-slate-400/10 ${extraClassName} ${
    disabled ? "cursor-not-allowed" : ""
  }`;
export const getOptionsUIClassName = (extraClassName = "w-full") =>
  `absolute rounded-lg border border-slate-400/10 bg-[#1a1e26] overflow-hidden max-h-96 overflow-y-auto min-w-[250px] ${extraClassName}`;

export const getOptionClassName = (active: boolean) =>
  `p-3 text-sm hover:bg-blue-600/30 hover:text-white hover:font-semibold cursor-pointer transition duration-200 ${
    active ? "text-white font-semibold bg-blue-600/30" : "text-white/80"
  }`;
