import { Listbox } from "@headlessui/react";
import type { FC } from "react";
import { Fragment, useState } from "react";
import {
  SharedTransition,
  getEntryClassName,
  getOptionClassName,
  getOptionsUIClassName,
} from "../shared-styling/inputMenu";

export interface BaseSelectProps {
  dataset: { value: string; displayName: string }[];
}

export const BaseSelect: FC<BaseSelectProps> = ({ dataset }) => {
  const completeDataset: typeof dataset = [
    { value: "", displayName: "All" },
    ...dataset,
  ];
  const [selected, setSelected] = useState(completeDataset[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
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
