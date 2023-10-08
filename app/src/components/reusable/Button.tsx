import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "orange" | "emerald" | "cyan" | "red";
}

export const Button: FC<ButtonProps> = ({
  color = "emerald",
  className: _,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`px-3 py-2 rounded-md bg-${color}-600 text-white font-bold`}
    ></button>
  );
};
