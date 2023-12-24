import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { inputBase } from "../../reusable-vars/Input";
import { InputFieldBaseProps } from "../../types/InputFieldBaseProps";
import { LabelErrorWrapper } from "./WithLabelWrapper";

interface InputProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    InputFieldBaseProps {
  error?: string;
  widthClassName?: string;
}

export const Input: FC<InputProps> = ({
  className,
  containerClassName = "",
  label,
  error,
  widthClassName = "w-1/2",
  ...props
}) => {
  return (
    <LabelErrorWrapper
      error={error}
      label={label}
      className={containerClassName}
    >
      <input
        className={`focus:ring-2 ${error} focus:outline-none ${widthClassName} ${inputBase} ${
          className || ""
        } border-slate-400/10 border`}
        {...props}
      />
    </LabelErrorWrapper>
  );
};
