import { FC, PropsWithChildren } from "react";

export const StyledWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`border border-slate-400/40 rounded-lg p-4 bg-slate-300/[0.03] ${className}`}
    >
      {children}
    </div>
  );
};
