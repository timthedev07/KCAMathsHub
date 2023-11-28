import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export type ButtonColor =
  | "purple-blue"
  | "cyan-blue"
  | "green-blue"
  | "purple-pink"
  | "pink-orange";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color: ButtonColor;
  variant: "solid" | "outlined";
}

export const Button: FC<ButtonProps> = ({ ...props }) => {
  return <button {...props} className=""></button>;
};
