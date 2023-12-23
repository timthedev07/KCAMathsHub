import Link from "next/link";
import type { FC } from "react";
import { StudentStageType } from "../../../types/StudentStage";

interface ItemProps {
  ks: StudentStageType;
}

export const Item: FC<ItemProps> = ({ ks }) => {
  return (
    <Link href={{ pathname: "/", query: { k: ks } }}>
      <li>{ks}</li>
    </Link>
  );
};
