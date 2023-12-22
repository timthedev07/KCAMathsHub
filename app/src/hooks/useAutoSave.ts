"use client";

import equals from "fast-deep-equal";
import { useEffect, useRef, useState } from "react";

interface AutoSaveOptions<T> {
  key: string;
  data: T;
  delay?: number;
}

type SaveStateType = "saving" | "saved" | "waiting";

export const useAutoSave = <T extends string | Object>({
  data,
  key,
  delay = 200,
}: AutoSaveOptions<T>) => {
  const prevData = useRef(data);
  const [saveState, setSaveState] = useState<SaveStateType>("saved");

  useEffect(() => {
    if (saveState === "saved" && !equals(prevData.current, data)) {
      setSaveState("waiting");
    }
    prevData.current = data;
  }, [data, saveState]);

  const initFromAutoSaveStorage = () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    return JSON.parse(stored) as T;
  };

  const dataHasChanged = saveState === "waiting";

  useEffect(() => {
    if (dataHasChanged) {
      const t = setTimeout(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem(key, JSON.stringify(prevData.current));
        console.log("updating");
        setSaveState("saved");
      }, delay);

      return () => {
        clearTimeout(t);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, dataHasChanged, key]);

  const clearStorage = () => {
    localStorage.removeItem(key);
  };

  return { saveState, clearStorage, initFromAutoSaveStorage };
};
