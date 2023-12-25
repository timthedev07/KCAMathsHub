import { FC, PropsWithChildren } from "react";
import type { IconType } from "react-icons";

type ColorScheme = "blue" | "green" | "orange";

const styles: Record<ColorScheme, string> = {
  blue: "bg-sky-400/20 text-sky-500",
  green: "bg-emerald-400/20 text-emerald-500",
  orange: "bg-orange-400/20 text-orange-500",
};

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
          className={`rounded-xl w-12 h-12 p-3 flex justify-center items-center ${styles[colorScheme]}`}
        >
          <Icon className="w-full h-full" />
        </div>
        <span className="font-semibold text-xl">{heading}</span>
      </h2>
      <div className="px-4 text-white/70">{children}</div>
    </section>
  );
};
