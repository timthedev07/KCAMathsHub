import Image from "next/image";
import { FC } from "react";
import coinSrc from "../../../public/coin.svg";

export const Coin: FC<{ height: number; width: number }> = (props) => {
  return <Image alt="coin" src={coinSrc} {...props} />;
};
