import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";

interface WithLabelWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: ReactNode;
  error?: string;
  labelFontSize?: string;
  labelFontWeight?: string;
}

export const LabelErrorWrapper: FC<WithLabelWrapperProps> = ({
  children,
  className,
  label,
  error,
  labelFontSize = "text-lg",
  labelFontWeight = "font-bold",
  ...props
}) => {
  return (
    <div {...props} className={`flex flex-col gap-2 ${className}`}>
      {label ? (
        <label className={`${labelFontSize} ${labelFontWeight}`}>{label}</label>
      ) : null}
      {children}
      {error ? <span className="text-sm text-red-500/90">{error}</span> : null}
    </div>
  );
};
