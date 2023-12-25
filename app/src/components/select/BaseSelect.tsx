"use client";
import { Listbox } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
import {
  SharedTransition,
  getEntryClassName,
  getOptionClassName,
  getOptionsUIClassName,
} from "../shared-styling/inputMenu";

type V = { value: string; displayName: string };

export interface BaseSelectProps {
  dataset: V[];
  onChange?: (_: string) => void;
  defaultValue?: V;
  resetStateOnRouteChange?: () => V;
}

export const BaseSelect: FC<BaseSelectProps> = ({
  dataset,
  onChange,
  defaultValue,
  resetStateOnRouteChange,
}) => {
  const completeDataset: typeof dataset = [
    { value: "", displayName: "All" },
    ...dataset,
  ];
  const [selected, setSelected] = useState(defaultValue || completeDataset[0]);
  const searchParams = useSearchParams();
  const k = searchParams.get("k");

  useEffect(() => {
    if (resetStateOnRouteChange) {
      setSelected(resetStateOnRouteChange());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k]);

  return (
    <Listbox
      value={selected}
      onChange={(v) => {
        if (onChange) onChange(v.value);
        setSelected(v);
      }}
    >
      <Listbox.Button className={getEntryClassName()}>
        {selected.displayName}
      </Listbox.Button>
      <SharedTransition>
        <Listbox.Options className={getOptionsUIClassName()}>
          {completeDataset.map((each) => (
            <Listbox.Option as={Fragment} key={each.value} value={each}>
              {({ active, selected }) => (
                <li className={getOptionClassName(active || selected)}>
                  {each.displayName}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </SharedTransition>
    </Listbox>
  );
};
