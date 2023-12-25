import { Listbox } from "@headlessui/react";
import type { FC } from "react";
import { useState } from "react";
import { SharedTransition } from "../shared-styling/inputMenu";

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
      <Listbox.Button
        className={`rounded-xl text-sm bg-neutral-100/[0.05] rounded-md border-slate-400/10 w-full`}
      >
        {selected.displayName}
      </Listbox.Button>
      <SharedTransition>
        <Listbox.Options>
          {completeDataset.map((each) => (
            <Listbox.Option key={each.value} value={each}>
              {each.displayName}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </SharedTransition>
    </Listbox>
  );
};
