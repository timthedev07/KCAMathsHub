import { FC } from "react";
import { BaseSelect } from "../BaseSelect";

interface SortSelectProps {
  setParam: (_: string, __?: string) => void;
  defaultValue?: string;
}

const options = [
  { value: "desc", displayName: "Latest" },
  { value: "asc", displayName: "Earliest" },
];

export const SortSelect: FC<SortSelectProps> = ({ setParam, defaultValue }) => {
  let d;
  const ind = options.findIndex((val) => val.value === defaultValue);
  if (ind >= 0) {
    d = options[ind];
  } else if (!!defaultValue) {
    setParam("s");
  }

  return (
    <BaseSelect
      dataset={options}
      defaultValue={d || options[0]}
      onChange={(v) => {
        setParam("s", v);
      }}
    />
  );
};
