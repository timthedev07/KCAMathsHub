import { forwardRef, SVGProps } from "react";

export const ImageSVG = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className="icon flat-color"
        data-name="Flat Color"
        viewBox="0 0 24 24"
        {...props}
      >
        <rect
          width={20}
          height={18}
          x={2}
          y={3}
          rx={2}
          style={{
            fill: "#000",
          }}
        />
        <path
          d="m21.42 19-6.71-6.71a1 1 0 0 0-1.42 0L11 14.59l-1.29-1.3a1 1 0 0 0-1.42 0L2.58 19a1 1 0 0 0-.29.72 1 1 0 0 0 .31.72A2 2 0 0 0 4 21h16a2 2 0 0 0 1.4-.56 1 1 0 0 0 .31-.72 1 1 0 0 0-.29-.72Z"
          style={{
            fill: "#2ca9bc",
          }}
        />
        <circle
          cx={11}
          cy={9}
          r={1.5}
          data-name="secondary"
          style={{
            fill: "#2ca9bc",
          }}
        />
      </svg>
    );
  }
);

ImageSVG.displayName = "Image";
