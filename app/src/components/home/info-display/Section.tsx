import { FC, PropsWithChildren } from "react";
import type { IconType } from "react-icons";
import { ColorScheme, styles } from "./styles";

interface SectionProps {
  icon: IconType;
  heading: string;
  colorScheme: ColorScheme;
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  heading,
  icon: Icon,
  children,
  colorScheme,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex gap-4 items-center">
        <div
          className={`rounded-xl w-10 h-10 p-2.5 flex justify-center items-center ${styles[colorScheme]}`}
        >
          <Icon className="w-full h-full" />
        </div>
        <span className="font-semibold text-lg">{heading}</span>
      </h2>
      <div className="px-4 text-white/70 text-[0.8rem]">{children}</div>
    </section>
  );
};
