import type { FC } from "react";
import { BaseSelect } from "../BaseSelect";
import { getYearGroupsByK } from "./getDataSet";

interface YGSelectProps {
  k?: string;
  setParam: (_: string, __: string) => void;
  defaultValue?: string;
}

const convert = (year: number | string) => ({
  value: String(year),
  displayName: `Year ${year}`,
});

export const YGSelect: FC<YGSelectProps> = ({
  k,
  setParam,
  defaultValue: defaultValue_,
}) => {
  const dataset = getYearGroupsByK(k).map(convert);
  const completeDataset = [{ value: "", displayName: "All" }, ...dataset];
  const defaultValue = defaultValue_ ? convert(defaultValue_) : undefined;

  return (
    <BaseSelect
      resetStateOnRouteChange={() => ({ value: "", displayName: "All" })}
      dataset={completeDataset}
      defaultValue={defaultValue}
      onChange={(v) => {
        setParam("y", v);
      }}
    />
  );
};
