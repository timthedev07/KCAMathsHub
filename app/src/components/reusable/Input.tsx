import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
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

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName = "",
      label,
      error,
      widthClassName = "w-full md:w-1/2",
      ...props
    },
    ref
  ) => {
    return (
      <LabelErrorWrapper
        error={error}
        label={label}
        className={containerClassName}
      >
        <input
          ref={ref}
          className={`focus:ring-2 focus:ring-[#3262e8] ${error} focus:outline-none ${widthClassName} ${inputBase} ${
            className || ""
          } border-slate-400/10 border`}
          {...props}
        />
      </LabelErrorWrapper>
    );
  }
);
