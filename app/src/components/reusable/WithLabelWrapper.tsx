import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface WithLabelWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: string;
}

export const LabelWrapper: FC<WithLabelWrapperProps> = ({
  children,
  className,
  label,
  ...props
}) => {
  return (
    <div {...props} className={`flex flex-col gap-2 ${className}`}>
      {label ? <label className="text-xl font-bold">{label}</label> : ""}
      {children}
    </div>
  );
};
