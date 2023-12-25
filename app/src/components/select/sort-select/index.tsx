import { FC } from "react";
import { BaseSelect } from "../BaseSelect";

interface SortSelectProps {
  setParam: (_: string, __: string) => void;
}

const options = [
  { value: "desc", displayName: "Latest" },
  { value: "asc", displayName: "Earliest" },
];

export const SortSelect: FC<SortSelectProps> = ({ setParam }) => {
  return (
    <BaseSelect
      dataset={options}
      defaultValue={options[0]}
      onChange={(v) => {
        setParam("s", v);
      }}
    />
  );
};
