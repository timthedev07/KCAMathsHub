import { FC, PropsWithChildren } from "react";

export const StyledWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`max-w-[80vw] border border-slate-300/20 rounded-xl p-4 bg-slate-300/[0.03] ${className}`}
    >
      {children}
    </div>
  );
};
