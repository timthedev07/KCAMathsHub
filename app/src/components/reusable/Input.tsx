import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { LabelErrorWrapper } from "./WithLabelWrapper";
import { InputFieldBaseProps } from "../../types/InputFieldBaseProps";
import { inputBase } from "../../reusable-vars/Input";

interface InputProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    InputFieldBaseProps {
  error?: string;
}

export const Input: FC<InputProps> = ({
  className,
  containerClassName = "",
  label,
  error,
  ...props
}) => {
  return (
    <LabelErrorWrapper
      error={error}
      label={label}
      className={containerClassName}
    >
      <input
        className={`focus:ring-2 ${error} focus:outline-none w-1/2 ${inputBase} ${
          className || ""
        } border-slate-300/20 border`}
        {...props}
      />
    </LabelErrorWrapper>
  );
};
