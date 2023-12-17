import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface WithLabelWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: string;
  error?: string;
}

export const LabelErrorWrapper: FC<WithLabelWrapperProps> = ({
  children,
  className,
  label,
  error,
  ...props
}) => {
  return (
    <div {...props} className={`flex flex-col gap-2 ${className}`}>
      {label ? <label className="text-lg font-bold">{label}</label> : null}
      {children}
      {error ? <span className="text-sm text-red-500/90">{error}</span> : null}
    </div>
  );
};
