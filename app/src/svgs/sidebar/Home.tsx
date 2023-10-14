import { forwardRef, SVGProps } from "react";

export const HomeSVG = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...props }, ref) => {
    return (
      <svg viewBox="0 0 24 24" ref={ref} {...props}>
        <path d="M12 3s-6.186 5.34-9.643 8.232A1.041 1.041 0 0 0 2 12a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 .98.98 0 0 0-.383-.768C18.184 8.34 12 3 12 3z" />
      </svg>
    );
  }
);

HomeSVG.displayName = "Home";
