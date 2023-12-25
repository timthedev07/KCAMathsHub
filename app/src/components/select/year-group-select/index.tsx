import { FC } from "react";
import { BaseSelect } from "../BaseSelect";
import { getYearGroupsByK } from "./getDataSet";

interface YGSelectProps {
  k?: string;
}

export const YGSelect: FC<YGSelectProps> = ({ k }) => {
  const dataset = getYearGroupsByK(k).map((each) => ({
    value: String(each),
    displayName: `Year ${each}`,
  }));

  return <BaseSelect dataset={dataset} />;
};
