import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button: FC<ButtonProps> = ({ className: _, ...props }) => {
  return (
    <button
      {...props}
      className="px-3 py-2 rounded-md bg-emerald-600 text-white font-bold"
    ></button>
  );
};
