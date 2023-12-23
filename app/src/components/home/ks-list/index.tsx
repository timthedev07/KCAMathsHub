import type { FC } from "react";
import { Item } from "./Item";

export const KSList: FC<{}> = () => {
  return (
    <ul className="flex flex-col">
      <Item ks="KS5" />
      <Item ks="KS4" />
      <Item ks="KS3" />
      <Item ks="Primary" />
    </ul>
  );
};
