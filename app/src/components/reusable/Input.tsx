import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { LabelWrapper } from "./WithLabelWrapper";
import { InputFieldBaseProps } from "../../types/InputFieldBaseProps";
import { inputBase } from "../../reusable-vars/Input";

interface InputProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    InputFieldBaseProps {}

export const Input: FC<InputProps> = ({
  className,
  containerClassName = "",
  label,
  ...props
}) => {
  return (
    <LabelWrapper label={label} className={containerClassName}>
      <input
        className={`focus:ring-2 focus:outline-none w-1/2 ${inputBase} ${
          className || ""
        } border-slate-300/20 border`}
        {...props}
      />
    </LabelWrapper>
  );
};
