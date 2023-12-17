"use client";

import { MouseEvent, MutableRefObject, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  action: Function
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent<T, MouseEvent>) {
      if (ref.current && !ref.current.contains(event.target as any)) {
        action();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside as any);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, [ref]);
};
