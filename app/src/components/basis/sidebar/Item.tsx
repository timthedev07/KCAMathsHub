import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import { SVGType } from "../../../svgs/type";

interface ItemProps {
  Icon: SVGType;
  text: string;
  action: string | Function;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Item: FC<ItemProps> = ({ Icon, text, action, setOpen }) => {
  const base = (
    <li className="cursor-pointer transition duration-300 flex gap-3 items-end group rounded-md hover:bg-tertiary-accent-bg px-4 py-2">
      <Icon className="w-6 h-6 group-hover:text-white text-tertiary-accent-bg transition-all duration-300 " />
      <span className="font-semibold">{text}</span>
    </li>
  );

  const actionWithClosing = async () => {
    setOpen(false);
    await (action as Function)();
  };

  if (typeof action === "string")
    return (
      <Link onClick={() => setOpen(false)} href={action}>
        {base}
      </Link>
    );
  else {
    return <button onClick={() => actionWithClosing()}>{base}</button>;
  }
};
