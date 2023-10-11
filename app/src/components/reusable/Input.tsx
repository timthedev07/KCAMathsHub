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
      <input className={`${inputBase} ${className || ""}`} {...props} />
    </LabelWrapper>
  );
};
