import { type FC } from "react";
import { BaseSelect } from "../BaseSelect";

interface QStatusSelectProps {
  setParam: (_: string, __?: string) => void;
  defaultValue?: string;
}

const options = [
  { value: "", displayName: "All" },
  { value: "answered", displayName: "Answered" },
  { value: "unanswered", displayName: "Unanswered" },
];

export const QStatusSelect: FC<QStatusSelectProps> = ({
  setParam,
  defaultValue,
}) => {
  let d;
  const ind = options.findIndex((val) => val.value === defaultValue);
  if (ind >= 0) {
    d = options[ind];
  } else if (!!defaultValue) {
    setParam("a");
  }
  return (
    <BaseSelect
      dataset={options}
      defaultValue={d || options[0]}
      onChange={(v) => {
        setParam("a", v);
      }}
    />
  );
};
