import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import { LabelWrapper } from "./WithLabelWrapper";
import { InputFieldBaseProps } from "../../types/InputFieldBaseProps";
import { inputBase } from "../../reusable-vars/Input";

interface TextAreaProps
  extends DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    InputFieldBaseProps {}

export const TextArea: FC<TextAreaProps> = ({
  containerClassName = "",
  className,
  label,
  ...props
}) => {
  return (
    <LabelWrapper label={label} className={containerClassName}>
      <textarea
        className={`${inputBase} ${className || ""}`}
        {...props}
      ></textarea>
    </LabelWrapper>
  );
};
