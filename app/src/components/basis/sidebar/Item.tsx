import { FC } from "react";
import { SVGType } from "../../../svgs/type";
import Link from "next/link";

interface ItemProps {
  Icon: SVGType;
  text: string;
  action: string | Function;
}

export const Item: FC<ItemProps> = ({ Icon, text, action }) => {
  const base = (
    <li className="cursor-pointer transition duration-300 flex gap-3 items-end group rounded-md hover:bg-tertiary-accent-bg px-4 py-2">
      <Icon className="w-6 h-6 group-hover:text-white text-tertiary-accent-bg transition-all duration-300 " />
      <span className="font-semibold">{text}</span>
    </li>
  );

  if (typeof action === "string") return <Link href={action}>{base}</Link>;
  else {
    return <button onClick={() => action()}>{base}</button>;
  }
};
