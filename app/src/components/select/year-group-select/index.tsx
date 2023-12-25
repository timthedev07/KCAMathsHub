import type { FC } from "react";
import { BaseSelect } from "../BaseSelect";
import { getYearGroupsByK } from "./getDataSet";

interface YGSelectProps {
  k?: string;
  setParam: (_: string, __: string) => void;
}

export const YGSelect: FC<YGSelectProps> = ({ k, setParam }) => {
  const dataset = getYearGroupsByK(k).map((each) => ({
    value: String(each),
    displayName: `Year ${each}`,
  }));

  return (
    <BaseSelect
      dataset={dataset}
      onChange={(v) => {
        setParam("y", v);
      }}
    />
  );
};
