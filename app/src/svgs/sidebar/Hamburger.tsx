import { forwardRef, SVGProps } from "react";

export const Hamburger = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...props }, ref) => {
    return (
      <svg viewBox="0 0 32 32 " {...props}>
        <path d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4zm24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4zm0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4z" />
      </svg>
    );
  }
);

Hamburger.displayName = "Hamburger";
