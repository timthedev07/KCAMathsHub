import { forwardRef, SVGProps } from "react";

export const AccountSVG = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...props }, ref) => {
    return (
      <svg viewBox="0 0 24 24" ref={ref} {...props}>
        <path
          d="M21 20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 6 6 0 0 1 6-6h6a6 6 0 0 1 6 6Zm-9-8a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);

AccountSVG.displayName = "Account";
