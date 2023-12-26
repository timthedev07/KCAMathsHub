import { type FC } from "react";
import { BaseSelect } from "../BaseSelect";

interface SortSelectProps {
  setParam: (_: string, __: string) => void;
}

const options = [
  { value: "", displayName: "All" },
  { value: "answered", displayName: "Answered" },
  { value: "unanswered", displayName: "Unanswered" },
];

export const QStatusSelect: FC<SortSelectProps> = ({ setParam }) => {
  return (
    <BaseSelect
      dataset={options}
      defaultValue={options[0]}
      onChange={(v) => {
        setParam("a", v);
      }}
    />
  );
};
